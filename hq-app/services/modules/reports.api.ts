import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryOrder } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const ReportsApis = {
  widgetData: ApiPrefix + 'reporting/widget-card',
  salesTrends: (StoreIds?: string) => {
    return StoreIds?.length
      ? ApiPrefix + `reporting/sales-trends` + StoreIds
      : ApiPrefix + `reporting/sales-trends`;
  },

  salesByOrderType: (StoreIds?: string) => {
    return StoreIds?.length
      ? ApiPrefix + `reporting/sales-by-order-type` + StoreIds
      : ApiPrefix + `reporting/sales-by-order-type`;
  },

  salesByOrderStores: (StoreIds?: string) => {
    return StoreIds?.length
      ? ApiPrefix + `reporting/sales-by-stores`
      : ApiPrefix + `reporting/sales-by-stores`;
  },

  salesHourly: (StoreIds?: string) => {
    return StoreIds?.length
      ? ApiPrefix + `reporting/hourly-sales-report` + StoreIds
      : ApiPrefix + `reporting/hourly-sales-report`;
  },

  salesByOrderSource: (StoreIds?: string) => {
    return StoreIds?.length
      ? ApiPrefix + `reporting/sales-by-source` + StoreIds
      : ApiPrefix + `reporting/sales-by-order-source`;
  },
};

export const reportsApi = createApi({
  baseQuery: baseQueryOrder,
  reducerPath: 'reports/api',
  endpoints: build => ({
    fetchWidgetData: build.query({
      query: params => {
        return {
          url: ReportsApis.widgetData,
          method: 'GET',
          params,
        };
      },
    }),

    fetchsalesTrends: build.query({
      query: params => {
        return {
          url: `${ReportsApis.salesTrends()}`,
          method: 'GET',
          params: params,
        };
      },
    }),

    fetchSalesByOrderType: build.query({
      query: params => {
        return {
          url: `${ReportsApis.salesByOrderType()}`,
          method: 'GET',
          params: params,
        };
      },
    }),

    fetchSalesByStores: build.query({
      query: params => {
        return {
          url: `${ReportsApis.salesByOrderStores()}`,
          method: 'GET',
          params: params,
        };
      },
    }),

    fetchHourlySales: build.query({
      query: params => {
        return {
          url: `${ReportsApis.salesHourly()}`,
          method: 'GET',
          params: params,
        };
      },
    }),

    fetchSalesBySource: build.query({
      query: params => {
        return {
          url: `${ReportsApis.salesByOrderSource()}`,
          method: 'GET',
          params: params,
        };
      },
    }),
  }),
});

export const {
  useFetchWidgetDataQuery,
  useFetchsalesTrendsQuery,

  useFetchSalesByOrderTypeQuery,
  useFetchSalesByStoresQuery,
  useFetchSalesBySourceQuery,
  useFetchHourlySalesQuery,
} = reportsApi;
