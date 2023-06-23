import { ADD_UPDATE_PACKAGINGMATERIAL } from '@/containers/Packagingmaterial/types';
import { alertService } from '@fridayfood/shared/components';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const PackagingmaterialApis = {
  CreateUpdateListIngredient: ApiPrefix + 'ingredient',
  DeleteIngredient: (id: number) => ApiPrefix + `ingredient/${id}`,
  IngredientDetails: (id: number) => ApiPrefix + `ingredient/${id}/by-id`,
};
export const packagingmaterialApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'packagingmaterial/api',
  endpoints: build => ({
    fetchPackagingMaterial: build.query({
      query: () => {
        return {
          url:
            PackagingmaterialApis.CreateUpdateListIngredient + '?ProductType=2',
          method: 'GET',
        };
      },
    }),
    createUpdatePackagingMaterial: build.mutation({
      query: (params: ADD_UPDATE_PACKAGINGMATERIAL) => {
        const method = params?.id ? 'put' : 'post';
        return {
          url: PackagingmaterialApis.CreateUpdateListIngredient,
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
  useLazyFetchPackagingMaterialQuery,
  useCreateUpdatePackagingMaterialMutation,
} = packagingmaterialApi;
