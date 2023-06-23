import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useFetchSuppliersQuery } from 'services/modules/suppliers.api';
import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import { PAGINATION } from '@/utils/helper';
import PaginatedComponent from '@fridayfood/shared/components/PaginatedComponent';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
import FileImporter from 'components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';

const Suppliers = () => {
  const router = useRouter();
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
  const { data, isSuccess, isFetching } = useFetchSuppliersQuery(config);

  const onRowSelect = (event: RowSelectedEvent) => {
    const { id = 0 } = event.data;
    router.push(`/inventorymanagement/suppliers/${id}`);
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
  }, [data, grid?.api, isFetching, isSuccess]);

  return (
    <>
      <FileImporter type={LOADER_TYPE.SUPLIERS as keyof typeof LOADER_TYPE} />
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
        rowData={record?.rowData}
        columnDefs={columnDefs}
        rowSelection="single"
        onGridReady={onGridReady}
        onRowSelected={onRowSelect}
        title="Suppliers"
        btnTitle={'Add Supplier'}
        onBtnClick={() => router.push('/inventorymanagement/suppliers/add')}
      />
    </>
  );
};

export default withPermissions(Suppliers, {
  permissionName: PERMISSIONS.VIEW_SUPPLIER,
});
