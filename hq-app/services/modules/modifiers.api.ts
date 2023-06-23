import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
import { alertService } from '@fridayfood/shared/components';
import { PAGINATION } from '@/utils/helper';
const ApiPrefix = '/api/app/';

export interface Post {
  body: object;
}

export const ModifierApis = {
  ModifierListing: ApiPrefix + `modifier?PageIndex=1&PageSize=${PAGINATION}`,
  ModifierDetails: (id: number) => ApiPrefix + `modifier/${id}/by-id`,
  ModifierSequenceNo: ApiPrefix + 'modifier',
  ModifierCreateUpdate: ApiPrefix + 'modifier',
};

export const modifiersApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'modifiers/api',
  endpoints: build => ({
    fetchModifiers: build.query({
      query: () => {
        return {
          url: ModifierApis.ModifierListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    fetchModifiersDetails: build.query({
      query: (id: number) => {
        return {
          url: ModifierApis.ModifierDetails(id),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    CreateUpdateModifier: build.mutation({
      query: body => ({
        url: ModifierApis.ModifierCreateUpdate,
        method: body?.id ? 'PUT' : 'POST',
        body,
      }),
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
  useFetchModifiersDetailsQuery,
  useFetchModifiersQuery,
  useCreateUpdateModifierMutation,
} = modifiersApi;
