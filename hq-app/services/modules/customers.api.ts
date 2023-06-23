import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore, baseQueryOrder } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const CustomerApis = {
  KitDetails: ApiPrefix + 'KITService/GetById',
  CreateKit: ApiPrefix + 'KITService/Create',
  UpdateKit: ApiPrefix + 'KITService/Update',
  KitTaxGroup: ApiPrefix + 'ProductService/GetTaxGroup',
  KitItemGroup: ApiPrefix + 'ItemGroupService/Get',
  KitSequenceNo: ApiPrefix + 'KITService/GetNumberSeries',
  CustomerListing: ({ page, size }: { page: number; size: number }) =>
    ApiPrefix + `customer?PageIndex=${page}&PageSize=${size}`,
  CustomerDetails: (id: number) => ApiPrefix + `customer/${id}`,
  orderByCustomer: (id: number) => ApiPrefix + `order/by-customer/${id}`,
};

export const customersApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'customers/api',
  endpoints: build => ({
    fetchCustomers: build.query({
      query: (config: { page: number; size: number }) => {
        return {
          url: CustomerApis.CustomerListing(config),
          method: 'GET',
        };
      },
    }),
    orderByCustomer: build.query({
      query: (id: number) => {
        return {
          url: CustomerApis.orderByCustomer(id),
          method: 'GET',
        };
      },
    }),
  }),
});

export const orderBycustomersApi = createApi({
  baseQuery: baseQueryOrder,
  reducerPath: 'orderByCustomers/api',
  endpoints: build => ({
    orderByCustomer: build.query({
      query: (id: number) => {
        return {
          url: CustomerApis.orderByCustomer(id),
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useFetchCustomersQuery } = customersApi;
export const { useOrderByCustomerQuery } = orderBycustomersApi;
