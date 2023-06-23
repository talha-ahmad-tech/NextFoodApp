/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
import { PAGINATION } from '@/utils/helper';
const ApiPrefix = '/api/app/';

export const FloorApis = {
  FloorList: ApiPrefix + `floor?PageIndex=1&PageSize=${PAGINATION}`,
  FloorDetails: (id: number) => ApiPrefix + `floor/${id}/by-id`,
  FloorCreate: ApiPrefix + 'floor',
  FloorStores: ApiPrefix + 'floor/lookup',
};

export const floorApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'floor/api',
  endpoints: build => ({
    fetchFloor: build.query({
      query: () => {
        return {
          url: FloorApis.FloorList,
          method: 'GET',
        };
      },
    }),

    fetchFloorDetails: build.query({
      query: id => {
        return {
          url: FloorApis.FloorDetails(id),
          method: 'GET',
        };
      },
    }),
    createFloor: build.mutation({
      query: (params: any) => {
        return {
          url: FloorApis.FloorCreate,
          method: 'POST',
          body: params,
        };
      },
    }),

    updateFloor: build.mutation({
      query: (params: any) => {
        return {
          url: FloorApis.FloorCreate,
          method: 'PUT',
          body: params,
        };
      },
    }),
  }),
});

export const {
  useCreateFloorMutation,
  useFetchFloorQuery,
  useUpdateFloorMutation,
  useLazyFetchFloorDetailsQuery,
  useFetchFloorDetailsQuery,
} = floorApi;
