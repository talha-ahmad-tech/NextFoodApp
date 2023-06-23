import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
import { CATEGORY_DETAILS } from '@/containers/Categories/types';
import { alertService } from '@fridayfood/shared/components';
const ApiPrefix = '/api/app/';

export interface Post {
  body: object;
}

export const CategoryApis = {
  categoryListing: ({ page, size }: { page: number; size: number }) =>
    ApiPrefix + `category?PageIndex=${page}&PageSize=${size}`,
  categoryDetails: (id: number | string) => ApiPrefix + `category/${id}/by-id`,
  CreateCategory: ApiPrefix + 'category',
  UpdateCategory: ApiPrefix + 'category',
  CreateUpdateCategory: ApiPrefix + 'category',
  KitTaxGroup: ApiPrefix + 'ProductService/GetTaxGroup',
  KitItemGroup: ApiPrefix + 'ItemGroupService/Get',
  KitSequenceNo: ApiPrefix + 'KITService/GetNumberSeries',
  uploadCategories: ApiPrefix + 'category/category-uploader',
  bulkCategories: ApiPrefix + 'category/bulk',
};

export interface Post {
  file: string;
}

export const categoriesApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'categories/api',
  endpoints: build => ({
    fetchCategory: build.query({
      query: (config: { page: number; size: number }) => {
        return {
          url: CategoryApis.categoryListing(config),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    fetchCategoryById: build.query({
      query: id => {
        return {
          url: CategoryApis.categoryDetails(id),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    uplaodImage: build.mutation<Post, Partial<Post>>({
      query: body => ({
        url: CategoryApis.KitTaxGroup,
        method: 'POST',
        body,
      }),
    }),
    CreateCategory: build.mutation<Post, Partial<Post>>({
      query: body => ({
        url: CategoryApis.CreateCategory,
        method: 'POST',
        body,
      }),
    }),
    UpdateCategory: build.mutation<Post, Partial<Post>>({
      query: body => ({
        url: CategoryApis.UpdateCategory,
        method: 'PUT',
        body,
      }),
    }),
    uploadCategories: build.mutation({
      query: body => {
        return {
          url: CategoryApis.uploadCategories,
          body,
          method: 'POST',
        };
      },
    }),
    bulkCategoriesUpload: build.mutation({
      query: body => {
        return {
          url: CategoryApis.bulkCategories,
          body,
          method: 'POST',
        };
      },
    }),
    CreateUpdateCategory: build.mutation({
      query: (body: CATEGORY_DETAILS) => ({
        url: CategoryApis.CreateUpdateCategory,
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
  useFetchCategoryQuery,
  useLazyFetchCategoryQuery,
  useUplaodImageMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useCreateUpdateCategoryMutation,
  useUploadCategoriesMutation,
  useBulkCategoriesUploadMutation,
} = categoriesApi;
