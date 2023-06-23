import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
import { alertService } from '@fridayfood/shared/components/Alert';
const ApiPrefix = '/api/app/';

export const ClusterApis = {
  ClustersList: ApiPrefix + 'cluster',
  ClusterDetails: (id: number) => ApiPrefix + `cluster/${id}/by-id`,
  ClustersCreate: ApiPrefix + 'cluster',
  ClusterStores: ApiPrefix + 'store/lookup',
};

export const clusterApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'clusters/api',
  endpoints: build => ({
    fetchClusters: build.query<any, any>({
      query: () => {
        return {
          url: ClusterApis.ClustersList,
          method: 'GET',
        };
      },
    }),

    fetchClusterDetails: build.query<any, any>({
      query: id => {
        return {
          url: ClusterApis.ClusterDetails(id),
          method: 'GET',
        };
      },
    }),

    createCluster: build.mutation<any, any>({
      query: (params: any) => {
        return {
          url: ClusterApis.ClustersCreate,
          method: 'POST',
          body: params,
          // params: AgGridFitlersUtils(params.request)
        };
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        alertService.error(baseQueryReturnValue?.data.error.message, {
          keepAfterRouteChange: true,
          autoClose: true,
        });
      },
    }),

    updateCluster: build.mutation<any, any>({
      query: (params: any) => {
        return {
          url: ClusterApis.ClustersCreate,
          method: 'PUT',
          body: params,
          // params: AgGridFitlersUtils(params.request)
        };
      },
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
  useCreateClusterMutation,
  useFetchClusterDetailsQuery,
  useFetchClustersQuery,
  useUpdateClusterMutation,
} = clusterApi;
