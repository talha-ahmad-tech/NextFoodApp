import { forwardRef, useEffect, useState } from 'react';

import type { GridReadyEvent } from 'ag-grid-community';
import { AgGrid, PaginatedComponent } from '@fridayfood/shared/components';
import { columnDefsForAll } from '../config';
import { useInventoryListngQuery } from 'services/modules/onHandInventory.api';
import { PAGINATION } from '@/utils/helper';
import useUtils from '@/containers/CustomFilters/Filters/useUtils';
import { Loader } from '@fridayfood/ui-toolkit';

const All = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { payload }: any,
) => {
  const {
    getPreferenceUtil,
    filters,
    setFilters,
    filtersQuery,
    setFiltersQuery,
  } = useUtils();

  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});

  useEffect(() => {
    getPreferenceUtil();
    setFiltersQuery({ filtersQuery: {} });
    setFilters({ ...filters, userPreferences: [] });
  }, []);

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
    PresetId: payload?.allPresetId ?? filters?.PresetId,
    type: 'allonhand',
    ...filterQuery(
      Boolean(
        filters?.userPreferences?.length &&
          Object.keys(filtersQuery).length &&
          filtersQuery?.FilterQuery,
      ),
    ),
  };

  const { data, isSuccess, isFetching, isLoading } =
    useInventoryListngQuery(queryPayload);

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
          columnDefs={columnDefsForAll}
          importOptionRequired={true}
          rowData={data?.items}
          notImportAble={true}
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

export default forwardRef(All);
