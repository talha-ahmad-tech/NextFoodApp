import { columnDefsForFinishedProducts } from '../config';
import { useRouter } from 'next/router';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { AgGrid, PaginatedComponent } from '@fridayfood/shared/components';
import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import useUtils from '@/containers/CustomFilters/Filters/useUtils';

import {
  useFilterListingQuery,
  useLazyFilterListingQuery,
} from 'services/modules/products.api';
import { Loader } from '@fridayfood/ui-toolkit';
import { PAGINATION } from '@/utils/helper';

const ProductFinishedProductsListing = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { payload }: any,
  ref: Ref<unknown> | undefined,
) => {
  const {
    getPreferenceUtil,
    filters,
    filtersQuery,
    setFiltersQuery,
    setFilters,
  } = useUtils();

  const router = useRouter();

  useEffect(() => {
    getPreferenceUtil();
    setFilters({ ...filters, userPreferences: [] });
  }, []);

  const rest = { ...router?.query } || {};
  delete rest.Name;
  const categoryFilter = JSON.stringify({
    ...rest,
  });

  useEffect(() => {
    if (
      Object?.keys(rest)?.length &&
      !Object?.keys(filtersQuery?.FilterQuer ?? {})?.length
    ) {
      setFiltersQuery({ FilterQuery: categoryFilter });
    } else {
      setFiltersQuery({ ...filtersQuery });
    }
  }, [categoryFilter]);

  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});

  const [refetchList] = useLazyFilterListingQuery();

  const queryPayload = {
    PageIndex: config.page,
    PageSize: PAGINATION,
    PresetId: payload?.finishedPresetId ?? filters?.PresetId,
    type: 'finishedproduct',
    ...(Object?.keys(filtersQuery?.FilterQuery ?? {})?.length &&
      filtersQuery?.FilterQuery !== '{}' && {
        ...filtersQuery,
      }),
  };

  const { data, isSuccess, isFetching, isLoading } =
    useFilterListingQuery(queryPayload);

  useImperativeHandle(ref, () => ({
    refetch: async () => {
      await refetchList({
        PageIndex: 1,
        PageSize: PAGINATION,
        type: 'finishedproduct',
      });
    },
  }));

  const onRowSelect = (event: RowSelectedEvent) => {
    const { id } = event?.data;
    router.push(`${router.pathname}/${id}`);
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

export default forwardRef(ProductFinishedProductsListing);
