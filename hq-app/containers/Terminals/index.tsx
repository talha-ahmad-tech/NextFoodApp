import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
// import { useLazyFetchTerminalsQuery } from 'services/modules/terminals.api';

import type { GridReadyEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
import { useFetchTerminalsQuery } from 'services/modules/terminals.api';
import { PaginatedComponent } from '@fridayfood/shared/components';
import { PAGINATION } from '@/utils/helper';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';

const Terminals = () => {
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

  const { data, isSuccess, isFetching } = useFetchTerminalsQuery(config);
  useEffect(() => {
    onGridReady(grid);
    if (data?.items?.length) {
      setRecord({ rowData: data?.items, totalCount: data?.totalCount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, grid?.api, isFetching, isSuccess]);

  // const onRowSelect = (event: RowSelectedEvent) => {
  //   const { id } = event?.data;
  //   router.push(`/settings/terminals/${id}`);
  // };

  const onGridReady = (params: GridReadyEvent) => {
    setGrid(params);
    if (isSuccess) {
      grid?.api?.hideOverlay();
    }
    if (isFetching) {
      params?.api?.showLoadingOverlay();
    }
  };

  // const [fetchKits] = useLazyFetchTerminalsQuery();

  return (
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
      columnDefs={columnDefs}
      onGridReady={onGridReady}
      title="Terminals"
    />
  );
};

export default withPermissions(Terminals, {
  permissionName: PERMISSIONS.VIEW_TERMINAL,
});
