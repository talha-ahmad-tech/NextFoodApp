import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryOrder } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const CategoryMixReportApis = {
  categoryMixReportListing: ApiPrefix + `reporting/category-mix-report`,
  productLookup: ApiPrefix + 'products/lookup',
  categoryLookup: ApiPrefix + `category/lookup`,
  storeLookup: ApiPrefix + 'store/lookup',
};

export const CategoryMixReportApi = createApi({
  baseQuery: baseQueryOrder,
  reducerPath: 'categoryMixReport/api',
  endpoints: build => ({
    fetchCategoryMixReport: build.query({
      query: (config: {
        CategoryIds?: string | undefined;
        StoreIds?: string | undefined;
        StartDate?: string;
        EndDate?: string;
      }) => {
        return {
          url: CategoryMixReportApis.categoryMixReportListing,
          method: 'GET',
          params: config,
        };
      },
    }),
  }),
});

export const {
  useFetchCategoryMixReportQuery,
  useLazyFetchCategoryMixReportQuery,
} = CategoryMixReportApi;
