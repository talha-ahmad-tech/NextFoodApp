import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';
const ApiPrefix = '/api/services/app/';

export const KitApis = {
  KitListing: ApiPrefix + 'KITService/Get',
  KitDetails: ApiPrefix + 'KITService/GetById',
  CreateKit: ApiPrefix + 'KITService/Create',
  UpdateKit: ApiPrefix + 'KITService/Update',
  KitTaxGroup: ApiPrefix + 'ProductService/GetTaxGroup',
  KitItemGroup: ApiPrefix + 'ItemGroupService/Get',
  KitSequenceNo: ApiPrefix + 'KITService/GetNumberSeries',
};

export const kitApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'kit/api',
  endpoints: build => ({
    fetchKits: build.query({
      query: () => {
        return {
          url: KitApis.KitListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
  }),
});

export const { useLazyFetchKitsQuery } = kitApi;
