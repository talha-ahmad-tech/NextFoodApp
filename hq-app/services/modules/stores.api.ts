import { ADD_UPDATE_FROM_PROPS } from '@/containers/Stores/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore, baseQueryProduct } from '../baseQuery';
import { alertService } from '@fridayfood/shared/components';

const ApiPrefix = '/api/app/';

export const StoresApis = {
  categoryLookup: ApiPrefix + 'category/lookup',
  paymentMethodLookup: ApiPrefix + 'payment-method/lookup',
  productWithCategory: ApiPrefix + 'products/product-with-category',
  productCategory: ({
    page,
    size,
    categoryIds,
  }: {
    page: number;
    size: number;
    categoryIds: number;
  }) =>
    ApiPrefix +
    `products/product-by-categories?PageIndex=${page}&PageSize=${size}&categoryIds=${categoryIds}`,
  // StoresListing: ApiPrefix + 'store',
  taxLookup: ApiPrefix + 'tax/lookup',
  currencyLookup: ApiPrefix + 'currency/lookup',
  storeLookup: ApiPrefix + 'store/lookup',
  StoresNumberSeries: ApiPrefix + '',
  storeCreate: ApiPrefix + 'store',
  storeDetails: (id: number) => ApiPrefix + `store/${id}`,
  StoresListing: ({ page, size }: { page: number; size: number }) =>
    ApiPrefix + `store?PageIndex=${page}&PageSize=${size}`,
  storeProduct: ApiPrefix + 'store-product',
  storeNumberSeries: ApiPrefix + 'number-series/number-series-code?Name=store',
  storeProductById: (storeId: number) =>
    ApiPrefix + `store-product?StoreId=${storeId}`,
  GetCountries: ApiPrefix + 'country/countries',
  GetStates: (id: number) => ApiPrefix + `country/states?Id=${id}`,
  GetCities: (id: number) => ApiPrefix + `country/cities?Id=${id}`,
};

export const storesApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: '/storemanagement/stores/api',
  endpoints: build => ({
    fetchStoresNumberSeries: build.query({
      query: () => {
        return {
          url: StoresApis.StoresNumberSeries,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),

    fetchStores: build.query({
      query: (config: { page: number; size: number }) => {
        return {
          url: StoresApis.StoresListing(config),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),

    createStore: build.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (params: ADD_UPDATE_FROM_PROPS) => {
        const method = params?.id ? 'PUT' : 'POST';
        return {
          url: StoresApis.storeCreate,
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
  useLazyFetchStoresQuery,
  useFetchStoresQuery,
  useFetchStoresNumberSeriesQuery,
  useCreateStoreMutation,
} = storesApi;

export const ProductApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: '/storemanagement/productCategories/api',
  endpoints: build => ({
    fetchCategories: build.query({
      query: () => {
        return {
          url: StoresApis.categoryLookup,
          method: 'GET',
        };
      },
    }),
    fetchProductWithCategory: build.query({
      query: () => {
        return {
          url: StoresApis.productWithCategory,
          method: 'GET',
        };
      },
    }),
    fetchStoreProductDetails: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (params: any) => {
        return {
          url: StoresApis.storeProductById(params),
          method: 'GET',
        };
      },
    }),

    fetchCategoriesById: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (params: any) => {
        return {
          url: StoresApis.productCategory(params),
          method: 'GET',
        };
      },
    }),

    assignProducts: build.mutation({
      query: ({
        id,
        body,
      }: {
        id: string;
        body: {
          productId: number;
          storeId: number;
          storeName: string;
          externalId: string;
        };
      }) => {
        return {
          url: `${StoresApis.storeProduct}?storeId=${id}`,
          method: 'PUT',
          body,
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
  useFetchCategoriesQuery,
  useFetchCategoriesByIdQuery,
  useAssignProductsMutation,
  useFetchStoreProductDetailsQuery,
  useFetchProductWithCategoryQuery,
} = ProductApi;
