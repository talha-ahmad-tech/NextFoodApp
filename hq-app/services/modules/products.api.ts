import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryFilters, baseQueryProduct } from '../baseQuery';
import { PAGINATION } from '@/utils/helper';
export const ApiPrefix = '/api/app/';

export const productsEndpoints = {
  category: (page?: number) =>
    ApiPrefix + `category?PageIndex=${page}&PageSize=${PAGINATION}`,
  itemGroup: (page: number) =>
    ApiPrefix + `item-group?PageIndex=${page}&PageSize=${PAGINATION}`,
  uom: (page: number) => ApiPrefix + `uom?PageIndex=${page}&PageSize=200`,
  tax: (page?: number) =>
    ApiPrefix + `tax?PageIndex=${page ? page : 1}&PageSize=200`,
  ingredient: (page: number, productType?: number) =>
    ApiPrefix +
    `ingredient?ProductType=${productType}&PageIndex=${page}&PageSize=200`,

  products: (page: number) =>
    ApiPrefix + `products?PageIndex=${page}&PageSize=200`,

  deal: (page: number) => ApiPrefix + `deal?PageIndex=${page}&PageSize=200`,

  dealDropdown: ApiPrefix + 'deal/deal-dropdown-list',
  ingredientDropdown: (productType?: number) =>
    ApiPrefix + `ingredient/lookup?type=${productType}`,

  ingredientsDetails: (productType?: number) =>
    ApiPrefix +
    `ingredient?ProductType=${productType}&PageIndex=1&PageSize=500`,
  itemGroupDropdown: ApiPrefix + 'item-group/lookup',
  modifierDropdown: ApiPrefix + 'modifier/lookup',
  productsDropdown: ApiPrefix + 'products/product-dropdown-list',
  uomDropdown: ApiPrefix + 'uom/lookup',
  categoryDropdown: ApiPrefix + 'category/lookup',
  categoryByItem: (id: number) =>
    ApiPrefix + `category/lookup-by-item-group/${id}`,

  taxDropdown: ApiPrefix + 'tax/lookup',
  uploadeFinishedProduct: ApiPrefix + 'products/finish-product-uploader',
  bulkUpload: ApiPrefix + 'products/bulk',
  finishedProducts: ({ page, PresetId }: { page: number; PresetId?: string }) =>
    PresetId
      ? ApiPrefix +
        `products?PageIndex=${page}&PageSize=${PAGINATION}&PresetId=${PresetId}`
      : ApiPrefix + `products?PageIndex=${page}&PageSize=${PAGINATION}`,
};

const productsFetcher = (type: string) => {
  switch (type) {
    case 'finishedproduct':
      return ApiPrefix + `products`;
    case 'deals':
      return ApiPrefix + `deal`;
    case 'ingredients':
      return ApiPrefix + `ingredient`;
    case 'packagingmaterial':
      return ApiPrefix + `ingredient`;
    default:
      return '';
  }
};

export const productsApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'products/api',
  endpoints: build => ({
    fetchProducts: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (url: string) => {
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
    uploadFinishProduct: build.mutation({
      query: body => {
        return {
          url: productsEndpoints.uploadeFinishedProduct,
          body,
          method: 'POST',
        };
      },
    }),
    bulkUpload: build.mutation({
      query: body => {
        return {
          url: productsEndpoints.bulkUpload,
          body,
          method: 'POST',
        };
      },
    }),
    filterListing: build.query({
      query: (config: {
        type: string;
        PageIndex: number;
        PageSize: number;
        PresetId?: string;
        FilterQuery?: { [key: string]: string };
      }) => {
        const { type, ...rest } = config;
        const param = ['ingredients', 'packagingmaterial'].includes(type)
          ? { ...rest, ProductType: type === 'ingredients' ? 1 : 2 }
          : { ...rest };
        return {
          url: productsFetcher(type),
          method: 'GET',
          params: param,
        };
      },
    }),
  }),
});

export const filtersApi = createApi({
  baseQuery: baseQueryFilters,
  reducerPath: 'filters/api',
  endpoints: build => ({
    fetchMetaData: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (type?: string) => {
        return {
          url: `/Preference/metaData?name=${type}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useFetchMetaDataQuery, useLazyFetchMetaDataQuery } = filtersApi;
export const {
  useLazyFetchProductsQuery,
  useFetchProductsQuery,
  useFilterListingQuery,
  useLazyFilterListingQuery,
  useUploadFinishProductMutation,
  useBulkUploadMutation,
} = productsApi;
