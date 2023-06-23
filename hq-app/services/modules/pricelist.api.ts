import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const PriceListApis = {
  GetPriceList: ({ page, size }: { page: number; size: number }) =>
    ApiPrefix + `price-list?PageIndex=${page}&PageSize=${size}`,
  CreateUpdateListPriceList: ApiPrefix + 'price-list',
  DeletePriceList: (id: number) => ApiPrefix + `price-list/${id}`,
  PriceListDetails: (id: number) => ApiPrefix + `price-list/${id}/by-id`,
  getStore: ApiPrefix + 'store/lookup',
  cluster: ApiPrefix + 'cluster',
  product: ApiPrefix + 'products',
};

export const pricelistApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'pricelist/api',
  endpoints: build => ({
    fetchPriceList: build.query({
      query: (config: { page: number; size: number }) => {
        return {
          url: PriceListApis.GetPriceList(config),
          method: 'GET',
        };
      },
    }),
    createUpdatePriceList: build.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (params?: any) => {
        const method = params?.id ? 'put' : 'post';
        return {
          url: PriceListApis.CreateUpdateListPriceList,
          method,
          body: params,
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
  }),
});

export const {
  useLazyFetchPriceListQuery,
  useFetchPriceListQuery,
  useCreateUpdatePriceListMutation,
} = pricelistApi;
