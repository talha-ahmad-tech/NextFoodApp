import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
import { TAX_DETAILS } from '@/containers/Tax/types';
import { alertService } from '@fridayfood/shared/components';
const ApiPrefix = '/api/app/';

export interface Post {
  body: object;
}

export const taxApis = {
  taxListing: ({ page, size }: { page: number; size: number }) =>
    ApiPrefix + `tax?PageIndex=${page}&PageSize=${size}`,
  taxDetails: (id: number) => ApiPrefix + `tax/${id}/by-id`,
  CreatUpdateTax: ApiPrefix + 'tax',
  TaxGroup: ApiPrefix + 'ProductService/GetTaxGroup',
  SequenceNo: ApiPrefix + 'number-series/number-series-code?Name=tax',
  Stores: ApiPrefix + 'store/lookup',
  Clusters: ApiPrefix + 'cluster/lookup',
  ItemGroup: ApiPrefix + 'item-group/lookup',
  Products: ApiPrefix + 'products/product-dropdown-list',
};

export const taxApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'tax/api',
  endpoints: build => ({
    fetchTax: build.query({
      query: (config: { page: number; size: number }) => {
        return {
          url: taxApis.taxListing(config),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    fetchTaxById: build.query({
      query: id => {
        return {
          url: taxApis.taxDetails(id),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    CreateUpdateTax: build.mutation({
      query: (body: TAX_DETAILS) => ({
        url: taxApis.CreatUpdateTax,
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
  useLazyFetchTaxQuery,
  useFetchTaxQuery,
  useFetchTaxByIdQuery,
  useCreateUpdateTaxMutation,
} = taxApi;
