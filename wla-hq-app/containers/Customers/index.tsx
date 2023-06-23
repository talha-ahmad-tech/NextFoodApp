import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import { useFetchCustomersQuery } from 'services/modules/customers.api';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { useEffect, useState } from 'react';
const Customers = () => {
  const router = useRouter();

  const { data, isSuccess, isFetching } = useFetchCustomersQuery({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rowData, setRowData] = useState<any>([]);
  useEffect(() => {
    onGridReady(grid);
    if (data?.data?.length) {
      setRowData(data?.data);
    }
  }, [data, grid?.api, isFetching, isSuccess]);

  const onRowSelect = (event: RowSelectedEvent) => {
    const id = event?.data.id;
    router.push(`/customersmanagement/customers/${id}`);
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
      columnDefs={columnDefs}
      rowData={rowData}
      onGridReady={onGridReady}
      onRowSelected={onRowSelect}
      rowSelection="multiple"
      title="Customers"
    />
  );
};

export default Customers;
