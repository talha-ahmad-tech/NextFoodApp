import { columnDefsForIngredients } from '../config';
import { useRouter } from 'next/router';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { AgGrid, PaginatedComponent } from '@fridayfood/shared/components';
import {
  useFilterListingQuery,
  useLazyFilterListingQuery,
} from 'services/modules/products.api';

import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react';
import useUtils from '@/containers/CustomFilters/Filters/useUtils';
import { Loader } from '@fridayfood/ui-toolkit';
import { PAGINATION } from '@/utils/helper';

const ProductIngredientsListing = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any,
  ref?: Ref<unknown> | undefined,
) => {
  useEffect(() => {
    getPreferenceUtil();
    setFiltersQuery({ filtersQuery: {} });
    setFilters({ ...filters, userPreferences: [] });
  }, []);
  const {
    getPreferenceUtil,
    filters,
    filtersQuery,
    setFiltersQuery,
    setFilters,
  } = useUtils();

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
    PresetId: props?.payload?.ingredientPresetId ?? filters?.PresetId,
    type: 'ingredients',
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

  const [refetchList] = useLazyFilterListingQuery();

  useImperativeHandle(ref, () => ({
    refetch: async () => {
      await refetchList({
        PageIndex: 1,
        PageSize: PAGINATION,
        type: 'ingredients',
      });
    },
  }));

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
          columnDefs={columnDefsForIngredients}
          rowData={data?.items?.length ? data?.items : []}
          onRowSelected={onRowSelect}
          onGridReady={onGridReady}
          rowSelection="multiple"
          customDropDown={false}
          noWrapper={true}
          paginatedComponent={
            <PaginatedComponent
              currentPage={config.page}
              totalCount={data?.totalCount ? data?.totalCount : 0}
              pageSize={config.size}
              onPageChange={(page: number) => setConfig({ ...config, page })}
            />
          }
        />
      )}
    </>
  );
};

export default forwardRef(ProductIngredientsListing);
