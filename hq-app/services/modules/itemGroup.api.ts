import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
import { PAGINATION } from '@/utils/helper';
const ApiPrefix = '/api/app/';

export interface Post {
  body: object;
}

export const ItemGroupApis = {
  ItemGroupListing: ApiPrefix + `item-group?PageIndex=1&PageSize=${PAGINATION}`,
  ItemGroupDetails: (id: number) => ApiPrefix + `item-group/${id}/by-id`,
  CreateItemGroup: ApiPrefix + 'item-group',
  UpdateItemGroup: ApiPrefix + 'item-group',
  ItemGroupTaxGroup: ApiPrefix + 'ProductService/GetTaxGroup',
  ItemGroupItemGroup: ApiPrefix + 'ItemGroupService/Get',
  ItemGroupSequenceNo: ApiPrefix + 'KITService/GetNumberSeries',
};

export const itemGroupApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'itemGroup/api',
  endpoints: build => ({
    fetchItemGroup: build.query({
      query: () => {
        return {
          url: ItemGroupApis.ItemGroupListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    fetchItemGroupDetails: build.query({
      query: (id: number) => {
        return {
          url: ItemGroupApis.ItemGroupDetails(id),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    CreateItemGroup: build.mutation<Post, Partial<Post>>({
      query: body => ({
        url: ItemGroupApis.CreateItemGroup,
        method: 'POST',
        body,
      }),
    }),
    UpdateItemGroup: build.mutation<Post, Partial<Post>>({
      query: body => ({
        url: ItemGroupApis.UpdateItemGroup,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useFetchItemGroupDetailsQuery,
  useFetchItemGroupQuery,
  useLazyFetchItemGroupDetailsQuery,
  useLazyFetchItemGroupQuery,
  useCreateItemGroupMutation,
  useUpdateItemGroupMutation,
} = itemGroupApi;
