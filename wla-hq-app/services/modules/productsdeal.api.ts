import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';
const ApiPrefix = '/api/services/app/';

export const ProductsDealApis = {
  ModifiersListing: ApiPrefix + 'VendorGroup/GetTree',
};

export const productsdealApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'productsdeal/api',
  endpoints: build => ({
    fetchModifiers: build.query({
      query: () => {
        return {
          url: ProductsDealApis.ModifiersListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    fetchProductsDeal: build.query({
      query: () => {
        return {
          url: '',
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
  }),
});

export const { useFetchModifiersQuery, useLazyFetchProductsDealQuery } =
  productsdealApi;
