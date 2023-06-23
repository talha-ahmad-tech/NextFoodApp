import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import {
  useFetchStoresQuery,
  useFetchProductWithCategoryQuery,
  useFetchStoreProductDetailsQuery,
  useAssignProductsMutation,
} from 'services/modules/stores.api';
import type { GridReadyEvent } from 'ag-grid-community';
import { useEffect, useState, useRef } from 'react';
import PaginatedComponent from '@fridayfood/shared/components/PaginatedComponent';
import { GetProductsByCategory, PAGINATION } from '@/utils/helper';
import ModalCustom from '@fridayfood/ui-toolkit/src/Modal';
import { alertService } from '@fridayfood/shared/components/Alert';
import Tree from '@fridayfood/shared/components/Tree';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import QRGenerator from 'components/QRGenerator';
import FileImporter from 'components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';

const Store = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [show, setShow] = useState(false);
  const [showQRGenerator, setShowQR] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<
    {
      parent: boolean;
      name: string;
      items: {
        id: string | number;
        name: string;
      }[];
    }[]
  >([]);
  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });
  const [record, setRecord] = useState({
    rowData: [],
    totalCount: 0,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});
  const [storeId, setStoreId] = useState<string>('');
  const { data, isSuccess, isFetching } = useFetchStoresQuery(config);
  const {
    data: productsByStore,
    isSuccess: storeProductSuccess,
    refetch,
  } = useFetchStoreProductDetailsQuery(selectedId, {
    skip: selectedId === '',
  });
  const { data: treeResponse, isSuccess: isTreeDataSuccess } =
    useFetchProductWithCategoryQuery(
      {},
      {
        skip: selectedId === '',
      },
    );

  useEffect(() => {
    if (storeProductSuccess && isTreeDataSuccess && productsByStore) {
      setTreeData(
        GetProductsByCategory(treeResponse ?? [], productsByStore ?? []),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeProductSuccess, isTreeDataSuccess, productsByStore, selectedId]);

  const [assingProducts, { isLoading: onPostProductsLoading }] =
    useAssignProductsMutation();

  const onRowSelect = (id: string) => {
    router.push(`/storemanagement/stores/${id}`);
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGrid(params);
    if (isSuccess) {
      grid?.api?.hideOverlay();
    }
    if (isFetching) {
      params?.api?.showLoadingOverlay();
    }
  };
  useEffect(() => {
    onGridReady(grid);
    if (data?.items?.length) {
      setRecord({ rowData: data?.items, totalCount: data?.totalCount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, grid?.api, isFetching, isSuccess]);

  const onAssignProduct = (
    id: string,
    name: string,
    setShow: (props: boolean) => void,
  ) => {
    setSelectedId(id);
    setSelectedName(name);
    setShow(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childRef: React.MutableRefObject<undefined> | any = useRef();

  const handleSave = async () => {
    const event = childRef?.current?.permissions()?.permissions;
    const products = event
      ?.flatMap((category: { items?: [] }) => category.items)
      .filter((item: { checked: boolean }) => item.checked)
      .map((item: { id: string | number; name: string }) => ({
        productId: item.id,
        productName: item.name,
        storeId: selectedId,
        storeName: selectedName,
      }));

    assingProducts({ id: selectedId, body: products })
      .then(() => {
        refetch();
        setShow(false);
        alertService.success('Products Updated');
      })
      .catch(() => {
        alertService.error('Error');
        setShow(false);
      });
  };

  const generateQR = (id: string) => {
    setStoreId(id);
    setShowQR(true);
  };

  const processArray = (
    arr: {
      parent: boolean;
      name: string;
      items: {
        id: string | number;
        name: string;
      }[];
    }[],
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return arr.map((parentObj: any) => {
      let checked = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items = parentObj.items.map((childObj: any) => {
        if (!childObj.checked) {
          checked = false;
        }
        return childObj;
      });
      return { ...parentObj, items, checked, parent: true };
    });
  };

  const updatedTreeData = processArray(treeData);

  const getSelectedProdCount = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedProd: any = updatedTreeData?.flatMap(
      (category: { items?: [] }) => category.items,
    );

    return `${
      selectedProd?.filter(
        (prod: { checked: boolean }) => prod?.checked === true,
      )?.length
    } / ${selectedProd?.length}`;
  };

  return (
    <>
      <FileImporter
        type={LOADER_TYPE.INVENTORY_ADJSUTMETN as keyof typeof LOADER_TYPE}
      />
      <GeneralListing
        importOptionRequired={true}
        paginatedComponent={
          <PaginatedComponent
            currentPage={config.page}
            totalCount={record?.totalCount}
            pageSize={config.size}
            onPageChange={(page: number) => setConfig({ ...config, page })}
          />
        }
        rowSelection="single"
        rowData={record?.rowData}
        columnDefs={columnDefs(
          (id: string, name: string) => onAssignProduct(id, name, setShow),
          (id: string) => onRowSelect(id),
          (id: string) => generateQR(id),
        )}
        onGridReady={onGridReady}
        title="Store"
        btnTitle="Add Store"
        onBtnClick={() => router.push('/storemanagement/stores/add')}
      />
      {show && (
        <ModalCustom
          show={show}
          close={() => {
            setShow(false);
          }}
          handleSave={handleSave}
          customBodyClass="custom-height-moda-body"
          customOkHeading="Save"
          modalWidth="medium-modal"
          title={`Assigned Products (${getSelectedProdCount()})`}
          saveButtonType="button"
          isLoading={onPostProductsLoading}
        >
          <Tree
            ref={childRef}
            searchPlaceholder="Search Category"
            tree={updatedTreeData}
            simpleTree={true}
            nameToShow="name"
          />
        </ModalCustom>
      )}

      <QRGenerator
        open={showQRGenerator}
        onClose={() => {
          setStoreId('');
          setShowQR(false);
        }}
        data={storeId}
      />
    </>
  );
};

export default withPermissions(Store, {
  permissionName: PERMISSIONS.VIEW_STORE,
});
