import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
// import { useLazyFetchKitsQuery } from 'services/modules/customers.api';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { useState } from 'react';
import { useFetchCustomersQuery } from 'services/modules/customers.api';
import { PaginatedComponent } from '@fridayfood/shared/components';
import { PAGINATION } from '@/utils/helper';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
const Customers = () => {
  const router = useRouter();
  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});
  const { data, isSuccess, isFetching, isLoading } =
    useFetchCustomersQuery(config);

  const onRowSelect = (event: RowSelectedEvent) => {
    const id = event?.data.id;
    router.push(`/customersmanagement/customers/${id}`);
  };
  const onGridReady = (params: GridReadyEvent) => {
    setGrid(params);
    if (isSuccess) {
      grid?.api?.hideOverlay();
    }

    if (isFetching || isLoading) {
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
      title="Customer"
    />
  );
};

export default withPermissions(Customers, {
  permissionName: PERMISSIONS.VIEW_CUSTOMER,
});
