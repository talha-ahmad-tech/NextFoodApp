import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryOrder } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const OrderHistoryApis = {
  OrderHistoryListing: ApiPrefix + `order/order-history`,
  OrderHistoryStat: ApiPrefix + `order`,
  OrderStatus: (id: number) => ApiPrefix + `order/order-status/${id}`,
};

export const OrderHistoryApi = createApi({
  baseQuery: baseQueryOrder,
  reducerPath: 'orderhistory/api',
  endpoints: build => ({
    fetchOrderHistory: build.query({
      query: (config: {
        PageIndex: number;
        PageSize: number;
        StartDate?: string;
        EndDate?: string;
        PresetId?: string;
      }) => {
        return {
          url: OrderHistoryApis.OrderHistoryListing,
          method: 'GET',
          params: config,
        };
      },
    }),
    fetchOrderStatus: build.query({
      query: (id: number) => {
        return {
          url: OrderHistoryApis.OrderStatus(id),
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useLazyFetchOrderHistoryQuery,
  useFetchOrderHistoryQuery,
  useFetchOrderStatusQuery,
} = OrderHistoryApi;
