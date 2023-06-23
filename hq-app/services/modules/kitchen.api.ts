import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
import { alertService } from '@fridayfood/shared/components/Alert';
import { PAGINATION } from '@/utils/helper';
const ApiPrefix = '/api/app/';

export const KitchenApis = {
  KitchenList: ApiPrefix + `kitchen-printer?PageIndex=1&PageSize=${PAGINATION}`,
  KitchenCreate: ApiPrefix + 'kitchen-printer',
  kitchenDetails: (id: number) => ApiPrefix + `kitchen-printer/${id}`,
  KitchenUpdate: ApiPrefix + 'kitchen-printer',
  categoryLookup: ApiPrefix + 'category/lookup',
  itemGroupLookup: ApiPrefix + 'item-group/lookup',
};

export const kitchenApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'kitchenPrinter/api',
  endpoints: build => ({
    fetchKitchens: build.query({
      query: () => {
        return {
          url: KitchenApis.KitchenList,
          method: 'GET',
        };
      },
    }),

    fetchKitchenDetails: build.query({
      query: id => {
        return {
          url: KitchenApis.kitchenDetails(id),
          method: 'GET',
        };
      },
    }),

    createKitchen: build.mutation({
      query: params => {
        return {
          url: KitchenApis.KitchenCreate,
          method: 'POST',
          body: params,
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

    updateKitchen: build.mutation({
      query: params => {
        return {
          url: KitchenApis.KitchenUpdate,
          method: 'PUT',
          body: params,
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
  useUpdateKitchenMutation,
  useCreateKitchenMutation,
  useFetchKitchenDetailsQuery,
  useFetchKitchensQuery,
} = kitchenApi;
