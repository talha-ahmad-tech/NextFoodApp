import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useFetchCategoryQuery } from 'services/modules/categories.api';

import type { GridReadyEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import PaginatedComponent from '@fridayfood/shared/components/PaginatedComponent';
import { PAGINATION } from '@/utils/helper';
import { ImportExportProvider } from '@fridayfood/shared/components/Context/ImportExportContext';
import FileImporter from '../../components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
// import useUtils from '../CustomFilters/Filters/useUtils';

const Categories = () => {
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
  // const { handleChange } = useUtils();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});
  // const { setFiltersQuery, setFilters, filtersQuery } = useUtils();
  const { data, isSuccess, isFetching } = useFetchCategoryQuery(config);
  useEffect(() => {
    onGridReady(grid);
    if (data?.items?.length) {
      setRecord({ rowData: data?.items, totalCount: data?.totalCount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, grid?.api, isFetching, isSuccess]);

  const onRowSelect = (id: string) => {
    router.push(`/menumanagement/categories/${id}`);
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

  const onGetProducts = (cate: string, name?: string) => {
    router.push(
      `/menumanagement/products/finishedproduct?CategoryId=${cate}&Name=${name}`,
    );
  };

  return (
    <>
      <ImportExportProvider>
        <FileImporter type={LOADER_TYPE.CATEGORY as keyof typeof LOADER_TYPE} />
        <GeneralListing
          paginatedComponent={
            <PaginatedComponent
              currentPage={config.page}
              totalCount={record?.totalCount}
              pageSize={config.size}
              onPageChange={(page: number) => setConfig({ ...config, page })}
            />
          }
          rowSelection="multiple"
          rowData={record?.rowData}
          columnDefs={columnDefs(onGetProducts, onRowSelect)}
          // onRowSelected={onRowSelect}
          onGridReady={onGridReady}
          title="Categories"
          btnTitle={'Add Category'}
          onBtnClick={() => router.push('/menumanagement/categories/add')}
          importOptionRequired={true}
        />
      </ImportExportProvider>
    </>
  );
};

export default withPermissions(Categories, {
  permissionName: PERMISSIONS.VIEW_CATEGORY,
});
