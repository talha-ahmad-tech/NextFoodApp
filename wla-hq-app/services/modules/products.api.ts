import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';

export const productsEndpoints = {
  getProducts: '/get-all-products',
  getDeals: '/get-all-deals',
  category: '/category',
  itemGroup: '/item-group',
  uom: '/uom',
};

export const productsApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'products/api',
  endpoints: build => ({
    fetchProducts: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (page: number) => {
        return {
          url: `${productsEndpoints.getProducts}?page=${page}`,
          method: 'GET',
        };
      },
    }),
    fetchDeals: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: () => {
        return {
          url: productsEndpoints.getDeals,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useLazyFetchProductsQuery,
  useFetchProductsQuery,
  useFetchDealsQuery,
} = productsApi;
