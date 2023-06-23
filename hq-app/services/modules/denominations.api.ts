import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from 'services/baseQuery';

const ApiPrefix = '/api/app/';

export const DenominationsApis = {
  DenominationsList: ApiPrefix + 'denomination',
  DenominationsDetails: (id: number) => ApiPrefix + `denomination/${id}/by-id`,
  DenominationsCreate: ApiPrefix + 'denomination',
  DenominationsStore: ApiPrefix + 'store/lookup',
};

export const denominationsApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'denominations/api',
  endpoints: build => ({
    fetchDenominations: build.query<any, any>({
      query: () => {
        return {
          url: DenominationsApis.DenominationsList,
          method: 'GET',
        };
      },
    }),

    fetchDenominationsDetails: build.query<any, any>({
      query: id => {
        return {
          url: DenominationsApis.DenominationsDetails(id),
          method: 'GET',
        };
      },
    }),

    createDenominations: build.mutation<any, any>({
      query: (params: any) => {
        return {
          url: DenominationsApis.DenominationsCreate,
          method: 'POST',
          body: params,
        };
      },
    }),

    updateDenominations: build.mutation<any, any>({
      query: (params: any) => {
        return {
          url: DenominationsApis.DenominationsCreate,
          method: 'PUT',
          body: params,
        };
      },
    }),
  }),
});

export const {
  useFetchDenominationsQuery,
  useFetchDenominationsDetailsQuery,
  useCreateDenominationsMutation,
  useUpdateDenominationsMutation,
} = denominationsApi;
