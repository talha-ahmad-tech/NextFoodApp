import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuerySetup } from '../baseQuery';
const ApiPrefix = 'api/app/';
export const discountApi = {
  DiscountList: (config: { page: number; size: number }) => {
    return ApiPrefix + `discount?PageIndex=1&PageSize=40`;
  },
  DiscountDetails: (id: number) => ApiPrefix + `discount/${id}/by-id`,
  DiscountUpdate: ApiPrefix + `discount`,
  DiscountCreate: ApiPrefix + 'discount',
  stores: '/' + ApiPrefix + 'store/lookup',
  products: '/' + ApiPrefix + 'products/lookup',
  itemGroups: '/' + ApiPrefix + 'item-group/lookup',
  category: '/' + ApiPrefix + 'category/lookup',
  region: '/' + ApiPrefix + 'region/lookup',
  cluster: '/' + ApiPrefix + 'cluster/lookup',
};

export const discountCodeApi = createApi({
  baseQuery: baseQuerySetup,
  reducerPath: 'discount/api',
  endpoints: build => ({
    fetchDiscount: build.query<any, any>({
      query: (config: { page: number; size: number }) => {
        return {
          url: discountApi.DiscountList(config),
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
          url: discountApi.DiscountUpdate,
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
