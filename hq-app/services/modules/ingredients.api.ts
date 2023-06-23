import { ADD_UPDATE_INGREDIENTS } from '@/containers/Ingredients/types';
import { ADD_UPDATE_PACKAGINGMATERIAL } from '@/containers/Packagingmaterial/types';
import { alertService } from '@fridayfood/shared/components';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const IngredientsApis = {
  CreateUpdateListIngredient: ApiPrefix + 'ingredient',
  DeleteIngredient: (id: number) => ApiPrefix + `ingredient/${id}`,
  IngredientDetails: (id: number) => ApiPrefix + `ingredient/${id}/by-id`,
  uploadIngredents: ApiPrefix + 'ingredient/from-excel',
  buldUploadIngredents: ApiPrefix + 'ingredient/bulk',
};
export const ingredientsApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'ingredients/api',
  endpoints: build => ({
    fetchIngredients: build.query({
      query: () => {
        return {
          url: IngredientsApis.CreateUpdateListIngredient + '?ProductType=1',
          method: 'GET',
        };
      },
    }),
    uploadIngredients: build.mutation({
      query: body => {
        return {
          url: IngredientsApis.uploadIngredents,
          body,
          method: 'POST',
        };
      },
    }),
    bulkUploadIngredients: build.mutation({
      query: body => {
        return {
          url: IngredientsApis.buldUploadIngredents,
          body,
          method: 'POST',
        };
      },
    }),
    createUpdateIngredientList: build.mutation({
      query: (
        params: ADD_UPDATE_INGREDIENTS | ADD_UPDATE_PACKAGINGMATERIAL,
      ) => {
        const method = params?.id ? 'put' : 'post';
        return {
          url: IngredientsApis.CreateUpdateListIngredient,
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
  useLazyFetchIngredientsQuery,
  useCreateUpdateIngredientListMutation,
  useBulkUploadIngredientsMutation,
  useUploadIngredientsMutation,
} = ingredientsApi;
