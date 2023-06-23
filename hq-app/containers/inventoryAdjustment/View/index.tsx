import React, { useEffect, useState } from 'react';
import GeneralView from '@fridayfood/shared/components/GeneralView';
import { useRouter } from 'next/router';
import { linesDefView, tabsConfiguration } from '../config';
import { INVENTORY_ADJUSTMENT_NEW_DETAILS } from '../types';
import { GeneralListing, setQueryParams } from '@fridayfood/shared/components';
import Pagination from '@fridayfood/shared/components/PaginatedComponent';
import FilterHeader from '@/containers/CustomFilters/Filters/CustomFilters';
import { useInventoryLinesQuery } from 'services/modules/inventoryAdjustment.api';

import { PAGINATION } from '@/utils/helper';
import useUtils from '@/containers/CustomFilters/Filters/useUtils';
import type { GridReadyEvent } from 'ag-grid-community';
import { Loader } from '@fridayfood/ui-toolkit';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import { PERMISSIONS } from '@/utils/permissions';
const InventoryAdjustmentView = ({
  inventoryAdjustmentDetails,
  data: componentData,
}: {
  inventoryAdjustmentDetails: INVENTORY_ADJUSTMENT_NEW_DETAILS;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}) => {
  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });
  const router = useRouter();
  const { id: inventoryId = 0 } = router?.query || 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});

  const [activeTab, setActiveTab] = useState('general');

  const { getPreferenceUtil, filters, setFilters, filtersQuery } = useUtils();

  setQueryParams('tabs', 'inventoryadjustmentline');
  useEffect(() => {
    getPreferenceUtil();
  }, []);

  const [payload, setPayload] = useState<{
    filter: boolean;
    clearFilter: boolean;
    lines: object;
    deals: object;
    PresetId?: string;
    params?: boolean;
  }>({
    filter: false,
    clearFilter: false,
    lines: {},
    deals: {},
    PresetId: '',
    params: false,
  });

  const handleReset = () => {
    setPayload({
      ...payload,
      clearFilter: true,
      lines: {},
      PresetId: '',
      params: true,
    });
    setFilters({ ...filters, userPreferences: [], FilterQuery: {} });
  };

  const handleApply = async (data: { value?: string }) => {
    setPayload({
      ...payload,
      clearFilter: false,
      PresetId: data?.value,
      params: false,
    });
  };

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
    PresetId: payload?.PresetId ?? filters?.PresetId,
    InventoryAdjustmentId: inventoryId,
    ...filterQuery(
      Boolean(
        filters?.userPreferences?.length &&
          Object.keys(filtersQuery).length &&
          filtersQuery?.FilterQuery,
      ),
    ),
  };
  const { data, isLoading, isFetching, isSuccess } =
    useInventoryLinesQuery(queryPayload);
  const customData = {
    ...inventoryAdjustmentDetails,
    activeTab,
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

  const tabsData = tabsConfiguration(customData ?? {});

  const onEdit = () => {
    router.push(
      `/inventorymanagement/inventoryAdjustment/edit/${inventoryAdjustmentDetails?.id}`,
    );
  };

  return (
    <>
      <>{isFetching || isLoading ? <Loader /> : null}</>
      <GeneralView
        loading={false}
        headerData={tabsData}
        showToggle
        filterLines={
          <>
            <GeneralListing
              rowData={data?.items}
              importOptionRequired={true}
              paginatedComponent={
                <Pagination
                  currentPage={config?.page}
                  totalCount={data?.totalCount}
                  pageSize={config?.size}
                  onPageChange={(page: number) =>
                    setConfig({ ...config, page })
                  }
                />
              }
              customizedFilter={
                <FilterHeader
                  clearFilter={false}
                  data={componentData?.component ?? {}}
                  handleApply={handleApply}
                  handleReset={handleReset}
                  type="inventoryadjustmentline"
                  setPayload={setPayload}
                  payload={payload}
                />
              }
              rowSelection="multiple"
              columnDefs={linesDefView}
              onGridReady={onGridReady}
            />
          </>
        }
        isTabHeaderShow={true}
        title={inventoryAdjustmentDetails.name ?? 'Inventory Adjustment'}
        getActiveTab={(tab: { id: string }) => setActiveTab(tab.id)}
        id={inventoryAdjustmentDetails?.code}
        onClick={onEdit}
      />
    </>
  );
};

export default withPermissions(InventoryAdjustmentView, {
  permissionName: PERMISSIONS.VIEW_INVENTORY_ADJUSTMNET,
});
