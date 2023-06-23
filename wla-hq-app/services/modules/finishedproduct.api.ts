import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';
const ApiPrefix = '/api/services/app/';

export const FinishedproductApis = {
  ModifiersListing: ApiPrefix + 'VendorGroup/GetTree',
};

export const finishedproductApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'Finishedproduct/api',
  endpoints: build => ({
    fetchModifiers: build.query({
      query: () => {
        return {
          url: FinishedproductApis.ModifiersListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    finishedproduct: build.query({
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

export const { useLazyFinishedproductQuery } = finishedproductApi;
