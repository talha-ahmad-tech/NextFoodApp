import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const RecieptApis = {
  CreateReciept: ApiPrefix + 'receipt-setting',
};

export const recieptApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'reciept/api',
  endpoints: build => ({
    fetchReciept: build.query<any, any>({
      query: (params: any) => {
        return {
          url: '',
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    createUpdateReciept: build.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (params: any) => {
        const method = params?.id ? 'PUT' : 'POST';
        return {
          url: RecieptApis.CreateReciept,
          method,
          body: params,
        };
      },
    }),
  }),
});

export const { useLazyFetchRecieptQuery, useCreateUpdateRecieptMutation } =
  recieptApi;
