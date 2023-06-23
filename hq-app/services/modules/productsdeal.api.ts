import { PRODUCTS_DEAL_DETAILS } from '@/containers/Productsdeal/types';
import { alertService } from '@fridayfood/shared/components';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQueryProduct } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const ProductsDealApis = {
  CreateUpdateListModifier: (page: number) =>
    ApiPrefix + `modifier?PageIndex=${page}&PageSize=100`,
  CreateUpdateListDeal: ApiPrefix + 'deal',
  DeleteDeal: (id: number) => ApiPrefix + `deal/${id}`,
  DealDetails: (id: number) => ApiPrefix + `deal/${id}/by-id`,
};
export const productsdealApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'productsdeal/api',
  endpoints: build => ({
    fetchDeal: build.query({
      query: () => {
        return {
          url: ProductsDealApis.CreateUpdateListDeal,
          method: 'GET',
        };
      },
    }),
    createUpdateDealList: build.mutation({
      query: (params: PRODUCTS_DEAL_DETAILS) => {
        const method = params?.id ? 'put' : 'post';
        return {
          url: ProductsDealApis.CreateUpdateListDeal,
          method,
          body: params,
          // params: AgGridFitlersUtils(params.request)
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse(baseQueryReturnValue: any) {
        alertService.error(baseQueryReturnValue?.data.error.message, {
          keepAfterRouteChange: true,
          autoClose: true,
        });
      },
    }),
    fetchDealsModifiers: build.query({
      query: (page: number) => {
        return {
          url: ProductsDealApis.CreateUpdateListModifier(page),
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useLazyFetchDealQuery,
  useCreateUpdateDealListMutation,
  useFetchDealsModifiersQuery,
} = productsdealApi;
