// import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from '../config';
import type { GridReadyEvent } from 'ag-grid-community';
import { AgGrid, PaginatedComponent } from '@fridayfood/shared/components';
import { useInventoryListngQuery } from 'services/modules/onHandInventory.api';
import { forwardRef, useEffect, useState } from 'react';
import { PAGINATION } from '@/utils/helper';
import useUtils from '@/containers/CustomFilters/Filters/useUtils';
import { Loader } from '@fridayfood/ui-toolkit';
const Ingredients = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { payload }: any,
) => {
  const { getPreferenceUtil, filters, filtersQuery } = useUtils();

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
    PresetId: payload?.ingredientPresetId ?? filters?.PresetId,
    type: 'ingredientsinventory',
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
          importOptionRequired={true}
          notImportAble={true}
          columnDefs={columnDefs}
          rowData={data?.items}
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

export default forwardRef(Ingredients);
