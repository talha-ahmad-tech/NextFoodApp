import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useFetchNumberSeriesQuery } from 'services/modules/numberSeries.api';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { PaginatedComponent } from '@fridayfood/shared/components';
import { useEffect, useState } from 'react';
import { PAGINATION } from '@/utils/helper';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const NumberSeries = () => {
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
  const { data, isSuccess, isFetching } = useFetchNumberSeriesQuery(config);

  useEffect(() => {
    onGridReady(grid);

    if (data?.items?.length) {
      setRecord({ rowData: data?.items, totalCount: data?.totalCount });
    }
  }, [data, grid?.api, isFetching, isSuccess]);

  const onRowSelect = (event: RowSelectedEvent) => {
    const { id } = event?.data;
    router.push(`/settings/numberseries/${id}`);
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

  return (
    <GeneralListing
      paginatedComponent={
        <PaginatedComponent
          currentPage={config.page}
          totalCount={data?.totalCount}
          pageSize={config.size}
          onPageChange={(page: number) => setConfig({ ...config, page })}
        />
      }
      rowSelection="multiple"
      rowData={data?.items ?? []}
      columnDefs={columnDefs}
      onRowSelected={onRowSelect}
      onGridReady={onGridReady}
      title="Number Sequence"
    />
  );
};

export default withPermissions(NumberSeries, {
  permissionName: PERMISSIONS.VIEW_NUMBER_SERIES,
});
