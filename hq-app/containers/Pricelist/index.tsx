import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useFetchPriceListQuery } from 'services/modules/pricelist.api';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import Pagination from '@fridayfood/shared/components/PaginatedComponent';
import { PAGINATION } from '@/utils/helper';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import FileImporter from 'components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';

const Pricelist = () => {
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
  const { data, isSuccess, isFetching } = useFetchPriceListQuery(config);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});
  const onRowSelect = (event: RowSelectedEvent) => {
    const { id } = event?.data;
    router.push(`/settings/pricelist/${id}`);
  };
  useEffect(() => {
    onGridReady(grid);
    if (data?.items?.length) {
      setRecord({ rowData: data?.items, totalCount: data?.totalCount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, grid?.api, isFetching, isSuccess]);
  const onGridReady = (params: GridReadyEvent) => {
    setGrid(params);
    if (isSuccess) {
      grid?.api?.hideOverlay();
    }
    if (isFetching) {
      params?.api?.showLoadingOverlay();
    }
  };

  return (
    <>
      <FileImporter type={LOADER_TYPE.PRICE_LIST as keyof typeof LOADER_TYPE} />
      <GeneralListing
        importOptionRequired={true}
        paginatedComponent={
          <Pagination
            currentPage={config.page}
            totalCount={record?.totalCount}
            pageSize={config.size}
            onPageChange={(page: number) => setConfig({ ...config, page })}
          />
        }
        rowSelection="multiple"
        rowData={record?.rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        onRowSelected={onRowSelect}
        title="Sales Price List"
        btnTitle={'Add Price List'}
        onBtnClick={() => router.push('/settings/pricelist/add')}
      />
    </>
  );
};

export default withPermissions(Pricelist, {
  permissionName: PERMISSIONS.VIEW_SALES_PRICE_LIST,
});
