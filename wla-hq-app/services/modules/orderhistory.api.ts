import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const OrderHistoryApis = {
  OrderHistoryListing: ApiPrefix + 'order/order-history',
};

export const OrderHistoryApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'orderhistory/api',
  endpoints: build => ({
    fetchOrderHistory: build.query({
      query: () => {
        return {
          url: OrderHistoryApis.OrderHistoryListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
  }),
});

export const { useLazyFetchOrderHistoryQuery, useFetchOrderHistoryQuery } =
  OrderHistoryApi;
