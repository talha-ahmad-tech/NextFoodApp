import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryOrder } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const ProductMixReportApis = {
  storeLookup: ApiPrefix + 'store/lookup',
  productLookup: ApiPrefix + 'products/lookup',
  productMixReportListing: ApiPrefix + `reporting/product-mix-report`,
};

export const ProductMixReportApi = createApi({
  baseQuery: baseQueryOrder,
  reducerPath: 'productMixReport/api',
  endpoints: build => ({
    fetchProductMixReport: build.query({
      query: (config: {
        StoreIds?: string | undefined;
        ProductIds?: string | undefined;
        StartDate?: string;
        EndDate?: string;
      }) => {
        return {
          url: ProductMixReportApis.productMixReportListing,
          method: 'GET',
          params: config,
        };
      },
    }),
  }),
});

export const {
  useLazyFetchProductMixReportQuery,
  useFetchProductMixReportQuery,
} = ProductMixReportApi;
