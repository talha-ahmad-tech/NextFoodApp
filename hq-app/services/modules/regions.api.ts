import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
import { PAGINATION } from '@/utils/helper';
const ApiPrefix = '/api/app/';

export const RegionApis = {
  RegionsList: ApiPrefix + `region?PageIndex=1&PageSize=${PAGINATION}`,
  RegionsDetails: (id: number) => ApiPrefix + `region/${id}/by-id`,
  RegionsCreate: ApiPrefix + 'region',
  RegionStores: ApiPrefix + 'store/lookup',
};

export const regionsApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'regions/api',
  endpoints: build => ({
    fetchRegions: build.query({
      query: () => {
        return {
          url: RegionApis.RegionsList,
          method: 'GET',
        };
      },
    }),

    fetchRegionDetails: build.query({
      query: id => {
        return {
          url: RegionApis.RegionsDetails(id),
          method: 'GET',
        };
      },
    }),
    createRegion: build.mutation({
      query: params => {
        return {
          url: RegionApis.RegionsCreate,
          method: 'POST',
          body: params,
        };
      },
    }),

    updateRegion: build.mutation({
      query: params => {
        return {
          url: RegionApis.RegionsCreate,
          method: 'PUT',
          body: params,
        };
      },
    }),
  }),
});

export const {
  useFetchRegionsQuery,
  useFetchRegionDetailsQuery,
  useLazyFetchRegionDetailsQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
} = regionsApi;
