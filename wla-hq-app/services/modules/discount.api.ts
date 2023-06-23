import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';

export const discountApi = {
  DiscountList: 'discount',
  DiscountDetails: (id: number) => `discount/show/${id}`,
  DiscountUpdate: (id: number) => `discount/update/${id}`,
  DiscountCreate: 'discount/store',
  stores: '/get-all-stores',
  products: '/get-all-products',
  itemGroups: '/get-all-item-groups',
};

export const discountCodeApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'discount/api',
  endpoints: build => ({
    fetchDiscount: build.query<any, any>({
      query: () => {
        return {
          url: discountApi.DiscountList,
          method: 'GET',
        };
      },
    }),

    fetchDiscountDetails: build.query<any, any>({
      query: id => {
        return {
          url: discountApi.DiscountDetails(id),
          method: 'GET',
        };
      },
    }),

    createDiscount: build.mutation<any, any>({
      query: (params: any) => {
        return {
          url: discountApi.DiscountCreate,
          method: 'POST',
          body: params,
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),

    updateDiscount: build.mutation<any, any>({
      query: (params: any) => {
        return {
          url: discountApi.DiscountUpdate(params?.id),
          method: 'PUT',
          body: params,
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
  }),
});

export const {
  useCreateDiscountMutation,
  useFetchDiscountDetailsQuery,
  useFetchDiscountQuery,
  useUpdateDiscountMutation,
} = discountCodeApi;
