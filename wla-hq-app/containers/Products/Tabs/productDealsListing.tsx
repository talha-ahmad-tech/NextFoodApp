import { columnDefsForFinishedProducts } from '../config';
import { useRouter } from 'next/router';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { AgGrid, PaginatedComponent } from '@fridayfood/shared/components';
import { useFetchDealsQuery } from '../../../services/modules/products.api';
import React, { useEffect, useState } from 'react';

const ProductDealsListing = () => {
  const router = useRouter();

  const { data, isSuccess, isFetching } = useFetchDealsQuery({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rowData, setRowData] = useState<any>([]);
  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 0,
    size: 0,
  });
  const [totalCount, setTotalCount] = useState();
  useEffect(() => {
    onGridReady(grid);
    if (data?.pagination?.data?.length) {
      setRowData(data?.pagination?.data);
      setTotalCount(data?.pagination?.total);
      setConfig({
        page: data?.pagination?.currentPage,
        size: data?.pagination?.perPage,
      });
    }
  }, [data, grid?.api, isFetching, isSuccess]);
  const onRowSelect = (event: RowSelectedEvent) => {
    const id = event?.data.id;
    router.push(`${router.pathname}/${id}`);
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
    <AgGrid
      columnDefs={columnDefsForFinishedProducts}
      rowData={rowData}
      onGridReady={onGridReady}
      onRowSelected={onRowSelect}
      rowSelection="multiple"
      customDropDown={false}
      noWrapper={true}
      paginatedComponent={
        <PaginatedComponent
          currentPage={config.page}
          totalCount={totalCount ? totalCount : 15}
          pageSize={config.size}
          onPageChange={(page: number) => setConfig({ ...config, page })}
        />
      }
    />
  );
};

export default ProductDealsListing;
