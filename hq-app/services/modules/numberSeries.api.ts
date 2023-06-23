import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const NumberSeriesApis = {
  NumberSeriesListing: ApiPrefix + 'number-series',
  NumberSeriesDetails: ApiPrefix + 'number-series',
  NumberSeriesView: (id: string) => ApiPrefix + `number-series/by-id/${id}`,

  CreateNumberSeries: ApiPrefix + 'number-series',
};

export const numberSeriesApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'numberseries/api',
  endpoints: build => ({
    fetchNumberSeries: build.query<any, any>({
      query: (config: { page: number; size: number }) => {
        return {
          url: NumberSeriesApis.NumberSeriesListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    createUpdateNumberSeries: build.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (params: any) => {
        const method = params?.id ? 'PUT' : 'POST';
        return {
          url: NumberSeriesApis.CreateNumberSeries,
          method,
          body: params,
        };
      },
    }),
  }),
});

export const {
  useLazyFetchNumberSeriesQuery,
  useFetchNumberSeriesQuery,
  useCreateUpdateNumberSeriesMutation,
} = numberSeriesApi;
