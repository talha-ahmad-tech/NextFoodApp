import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
import { UOM_DETAILS } from '@/containers/Uom/types';
import { alertService } from '@fridayfood/shared/components';
// import { PAGINATION } from '@/utils/helper';
const ApiPrefix = '/api/app/';
export interface Post {
  body: object;
}

export const UomApis = {
  ListUOM: ApiPrefix + 'uom?PageIndex=1&PageSize=20',
  LookUp: ApiPrefix + 'uom/lookup',
  // ListUOM: ApiPrefix + `uom?PageIndex=1&PageSize=${PAGINATION}`,
  DeleteUOM: (id: number) => ApiPrefix + `uom/${id}`,
  CreateUpdateUOM: ApiPrefix + 'uom',
  UOMDetails: (id: number | string | string[] | undefined) =>
    ApiPrefix + `uom/${id}/by-id`,
};

export const uomApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'uom/api',
  endpoints: build => ({
    fetchUOM: build.query({
      query: () => {
        return {
          url: UomApis.ListUOM,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    fetchUOMDetails: build.query({
      query: (id: number | string) => {
        return {
          url: UomApis.UOMDetails(id),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    CreateUpdateUOM: build.mutation({
      query: (params: UOM_DETAILS) => {
        const method = params?.id ? 'put' : 'post';
        return {
          url: UomApis.CreateUpdateUOM,
          method,
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
  useFetchUOMDetailsQuery,
  useFetchUOMQuery,
  useCreateUpdateUOMMutation,
} = uomApi;
