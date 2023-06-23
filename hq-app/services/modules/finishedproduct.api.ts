import { FINISHEDPRODUCT_DETAILS } from '@/containers/Finishedproduct/types';
import { alertService } from '@fridayfood/shared/components';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { baseQueryProduct } from '../baseQuery';
import { PAGINATION } from '@/utils/helper';
const ApiPrefix = '/api/app/';

export const FinishedproductApis = {
  CreateUpdateListFinishedProductModifier: (page: number) =>
    ApiPrefix + `modifier?PageIndex=${page}&PageSize=100`,
  CreateUpdateListFinishedProduct: ApiPrefix + 'products',
  CreateUpdateListModifier: ApiPrefix + 'products',
  DeleteFinishedProduct: (id: number) => ApiPrefix + `products/${id}`,

  FinishedProductDetails: (id: number) => ApiPrefix + `products/${id}/by-id`,
  finishedProducts: ({ page, PresetId }: { page: number; PresetId?: string }) =>
    PresetId
      ? ApiPrefix +
        `products?PageIndex=${page}&PageSize=${PAGINATION}&PresetId=${PresetId}`
      : ApiPrefix + `products?PageIndex=${page}&PageSize=${PAGINATION}`,
};
export const finishedproductApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'finishedproducts/api',
  endpoints: build => ({
    fetchModifiers: build.query({
      query: (page: number) => {
        return {
          url: FinishedproductApis.CreateUpdateListFinishedProductModifier(
            page,
          ),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),

    fetchFinishedProduct: build.query({
      query: (config: { page: number; PresetId?: string }) => {
        return {
          url: FinishedproductApis.finishedProducts(config),
          method: 'GET',
        };
      },
    }),
    createUpdateFinishedProductList: build.mutation({
      query: (params: FINISHEDPRODUCT_DETAILS) => {
        const method = params?.id ? 'put' : 'post';
        return {
          url: FinishedproductApis.CreateUpdateListFinishedProduct,
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
  }),
});

export const {
  useFetchFinishedProductQuery,
  useLazyFetchFinishedProductQuery,
  useCreateUpdateFinishedProductListMutation,
  useFetchModifiersQuery,
  useLazyFetchModifiersQuery,
} = finishedproductApi;
