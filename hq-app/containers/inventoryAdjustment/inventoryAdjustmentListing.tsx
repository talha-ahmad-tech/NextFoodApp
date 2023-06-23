import { useState } from 'react';
import GeneralListing from '@fridayfood/shared/components/GeneralListing';
import { columnDefs } from './config';
import { useRouter } from 'next/router';
import Pagination from '@fridayfood/shared/components/PaginatedComponent';

import { useInventoryAdjustmentListingQuery } from 'services/modules/inventoryAdjustment.api';

import type {
  GridReadyEvent,
  // GridReadyEvent,
  RowSelectedEvent,
  // IGetRowsParams,
} from 'ag-grid-community';
import React from 'react';
import { PAGINATION } from '@/utils/helper';
import { useInventoryAdjustment } from './Add/InventoryAdjustmentLines/useInventoryAdjustment';
import FilterHeader from '../CustomFilters/Filters/CustomFilters';
import FileImporter from '../../components/ImportExportFiles/FileImporter';
import { LOADER_TYPE } from '@/utils/constants';
import { Loader } from '@fridayfood/ui-toolkit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InventoryAdjustmentListing = (props: any) => {
  const router = useRouter();
  const { filters, setFilters, filtersQuery } = useInventoryAdjustment();
  const [config, setConfig] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: PAGINATION,
  });

  const [payload, setPayload] = useState<{
    filter: boolean;
    clearFilter: boolean;
    PresetId?: string;
    start?: string;
    end?: string;
    params?: boolean;
  }>({
    filter: false,
    clearFilter: false,
    PresetId: '',
    start: '',
    end: '',
    params: false,
  });

  const handleApply = async (data: { value?: string }) => {
    setPayload({
      ...payload,
      clearFilter: false,
      PresetId: data?.value,
      params: false,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grid, setGrid] = useState<any>({});

  const queryPayload = {
    PageIndex: config.page,
    PageSize: PAGINATION,
    PresetId: props?.payload?.dealsPresetId ?? filters?.PresetId,
    ...(Boolean(
      filters?.userPreferences?.length &&
        Object.keys(filtersQuery).length &&
        filtersQuery?.FilterQuery,
    ) && { FilterQuery: filtersQuery?.FilterQuery }),
  };

  const { data, isSuccess, isFetching, isLoading } =
    useInventoryAdjustmentListingQuery(queryPayload);

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

  const handleReset = () => {
    setPayload({
      ...payload,
      clearFilter: true,
      PresetId: '',
      params: true,
    });
    setFilters({ ...filters, userPreferences: [], FilterQuery: {} });
  };

  return (
    <>
      <>{isLoading || isFetching ? <Loader /> : null}</>
      <FileImporter
        type={LOADER_TYPE.INVENTORY_ADJSUTMETN as keyof typeof LOADER_TYPE}
      />
      <GeneralListing
        rowData={data?.items}
        importOptionRequired={true}
        paginatedComponent={
          <Pagination
            currentPage={config.page}
            totalCount={data?.totalCount}
            pageSize={config.size}
            onPageChange={(page: number) => setConfig({ ...config, page })}
          />
        }
        customizedFilter={
          <FilterHeader
            clearFilter={payload?.clearFilter}
            data={props?.data?.component ?? {}}
            handleApply={handleApply}
            handleReset={handleReset}
            type={props?.type}
            handleDate={(values: {
              start: string;
              end: string;
              filter: boolean;
            }) => {
              setPayload({
                ...payload,
                start: values?.start,
                end: values?.end,
                filter: values?.filter,
              });
            }}
            setPayload={setPayload}
            payload={payload}
          />
        }
        rowSelection="multiple"
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        onRowSelected={onRowSelect}
        title="Inventory Adjustment"
        btnTitle={'Add inventory Adjustment'}
        onBtnClick={() =>
          router.push('/inventorymanagement/inventoryAdjustment/add')
        }
      />
    </>
  );
};

export default InventoryAdjustmentListing;
