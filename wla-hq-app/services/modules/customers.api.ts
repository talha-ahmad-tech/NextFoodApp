import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';

export const CustomerApis = {
  CustomerListing: '/customer/listing',
  customerView: '/customer',
  CustomerOrderHisotry: '/get-orders-by-customer-id',
  CustomerAddress: '/get-address-by-customer-id',
  CustomerPointHisotry: '/get-customer-points-history',
};

export const customersApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'customers/api',
  endpoints: build => ({
    fetchCustomers: build.query({
      query: () => {
        return {
          url: CustomerApis.CustomerListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
  }),
});

export const { useFetchCustomersQuery, useLazyFetchCustomersQuery } =
  customersApi;
