import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';
const ApiPrefix = '/api/services/app/';

export const TableorderingApis = {
  TableorderingListing: ApiPrefix + 'TableorderingService/Get',
  TableorderingDetails: ApiPrefix + 'TableorderingService/GetById',
  CreateTableordering: ApiPrefix + 'TableorderingService/Create',
  UpdateTableordering: ApiPrefix + 'TableorderingService/Update',
  TableorderingTaxGroup: ApiPrefix + 'ProductService/GetTaxGroup',
  TableorderingItemGroup: ApiPrefix + 'ItemGroupService/Get',
  TableorderingSequenceNo: ApiPrefix + 'TableorderingService/GetNumberSeries',
};

export const tableorderingApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'tableordering/api',
  endpoints: build => ({
    fetchTableordering: build.query({
      query: () => {
        return {
          url: TableorderingApis.TableorderingListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
  }),
});

export const { useLazyFetchTableorderingQuery } = tableorderingApi;
