// import { useRouter } from 'next/router';

import type { GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { columnDefs } from './config';
import { GeneralListing, alertService } from '@fridayfood/shared/components';
import {
  useFetchOrderHistoryQuery,
  useLazyFetchOrderHistoryQuery,
} from 'services/modules/orderhistory.api';
import PaginatedComponent from '@fridayfood/shared/components/PaginatedComponent';
import FilterHeader from '../CustomFilters/Filters/CustomFilters';
import { Loader } from '@fridayfood/ui-toolkit';
import { useEffect, useState } from 'react';
import { PAGINATION } from '@/utils/helper';
import { PERMISSIONS } from '@/utils/permissions';
import withPermissions from '@fridayfood/shared/components/withPermissions';
import useUtils from '../CustomFilters/Filters/useUtils';
import { useRouter } from 'next/router';

const OrderHistory = (props?: {
  data?: { component?: { name?: string; metaData: [] } };
  type?: string;
}) => {
  const router = useRouter();
  const rest = { ...router?.query } || {};
  delete rest.Name;
  const categoryFilter = JSON.stringify({
    ...rest,
  });
  const { filtersQuery, setFiltersQuery } = useUtils();

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
    PageIndex: number;
    PageSize: number;
  }>({
    PageIndex: 1,
    PageSize: PAGINATION,
  });

  const [payload, setPayload] = useState<{
    clearFilter: boolean;
    PresetId?: string;
    start?: string;
    end?: string;
    params?: boolean;
  }>({
    clearFilter: false,
    PresetId: '',
    start: '',
    end: '',
    params: false,
  });

  const handleReset = () => {
    setPayload({
      ...payload,
      clearFilter: true,
      PresetId: '',
      params: true,
    });
  };

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
  const [fetchOrderHistory] = useLazyFetchOrderHistoryQuery();
  const { data, isSuccess, isFetching, isLoading } = useFetchOrderHistoryQuery(
    {
      PageIndex: config.PageIndex,
      PageSize: config.PageSize,
      StartDate: payload?.start,
      EndDate: payload?.end,
      ...(payload?.PresetId && { PresetId: payload?.PresetId }),
      ...(Object?.keys(filtersQuery?.FilterQuery ?? {})?.length &&
        filtersQuery?.FilterQuery !== '{}' && {
          ...filtersQuery,
        }),
    },
    { skip: payload.start === '' },
  );

  const onRowSelect = (event: RowSelectedEvent) => {
    const { orderId = 0 } = event.data;
    router.push(`/reports/salesreports/orderhistory/${orderId}`);
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
      <>{isLoading || isFetching ? <Loader /> : null}</>
      <GeneralListing
        customizedFilter={
          <FilterHeader
            clearFilter={payload?.clearFilter}
            data={props?.data?.component ?? {}}
            handleApply={handleApply}
            handleReset={handleReset}
            type={props?.type}
            handleDate={(values: { start: string; end: string }) => {
              setPayload({
                ...payload,
                start: values?.start,
                end: values?.end,
              });
            }}
            setPayload={setPayload}
            payload={payload}
          />
        }
        paginatedComponent={
          <PaginatedComponent
            currentPage={config.PageIndex}
            totalCount={data?.totalCount}
            pageSize={config.PageSize}
            siblingCount={4}
            onPageChange={(page: number) =>
              setConfig({ ...config, PageIndex: page })
            }
          />
        }
        refreshButton={true}
        refreshClick={() => {
          fetchOrderHistory(config);
          alertService.success('Refreshing', {
            keepAfterRouteChange: true,
            autoClose: true,
          });
        }}
        importOptionRequired={false}
        rowSelection="multiple"
        rowData={data?.items}
        columnDefs={columnDefs}
        onRowSelected={onRowSelect}
        onGridReady={onGridReady}
        title="Order History Report"
      />
    </>
  );
};

export default withPermissions(OrderHistory, {
  permissionName: PERMISSIONS.VIEW_SALE_ORDER_HISTORY_REPORT,
});
