import { columnDefsForFinishedProducts } from '../config';
import { useRouter } from 'next/router';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { AgGrid, PaginatedComponent } from '@fridayfood/shared/components';
import { useFilterListingQuery } from 'services/modules/products.api';
import React, { forwardRef, useEffect, useState } from 'react';

import useUtils from '@/containers/CustomFilters/Filters/useUtils';
import { Loader } from '@fridayfood/ui-toolkit';
import { PAGINATION } from '@/utils/helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductDealsListing = (props?: any) => {
  const router = useRouter();

  const {
    getPreferenceUtil,
    filters,
    filtersQuery,
    setFiltersQuery,
    setFilters,
  } = useUtils();

  useEffect(() => {
    getPreferenceUtil();
    setFiltersQuery({ FilterQuery: {} });
    setFilters({ ...filters, userPreferences: [] });
  }, []);

  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});

  const filterQuery = (exists: boolean) => {
    if (exists) {
      return {
        ...filtersQuery,
      };
    } else null;
  };

  const queryPayload = {
    PageIndex: config.page,
    PageSize: PAGINATION,
    PresetId: props?.payload?.dealsPresetId ?? filters?.PresetId,
    type: 'deals',
    ...filterQuery(
      Boolean(
        filters?.userPreferences?.length &&
          Object.keys(filtersQuery).length &&
          filtersQuery?.FilterQuery,
      ),
    ),
  };

  const { data, isSuccess, isFetching, isLoading } =
    useFilterListingQuery(queryPayload);

  const onGridReady = (params: GridReadyEvent) => {
    setGrid(params);
    if (isSuccess) {
      grid?.api?.hideOverlay();
    }
    if (isFetching || isLoading) {
      params?.api?.showLoadingOverlay();
    }
  };
  const onRowSelect = (event: RowSelectedEvent) => {
    const { id } = event?.data;
    router.push(`${router.pathname}/${id}`);
  };

  return (
    <>
      {isFetching || isLoading ? (
        <Loader />
      ) : (
        <AgGrid
          columnDefs={columnDefsForFinishedProducts}
          rowData={data?.items}
          onRowSelected={onRowSelect}
          onGridReady={onGridReady}
          rowSelection="multiple"
          customDropDown={false}
          noWrapper={true}
          paginatedComponent={
            <PaginatedComponent
              currentPage={config.page}
              totalCount={data?.totalCount}
              pageSize={config.size}
              onPageChange={(page: number) => setConfig({ ...config, page })}
            />
          }
        />
      )}
    </>
  );
};

export default forwardRef(ProductDealsListing);
