import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';
const ApiPrefix = '/api/services/app/';

export const foodCostingApis = {
  foodCostingListing: ApiPrefix + 'foodCostingService/Get',
  foodCostingDetails: ApiPrefix + 'foodCostingService/GetById',
  CreatefoodCosting: ApiPrefix + 'foodCostingService/Create',
  UpdatefoodCosting: ApiPrefix + 'foodCostingService/Update',
  foodCostingTaxGroup: ApiPrefix + 'ProductService/GetTaxGroup',
  foodCostingItemGroup: ApiPrefix + 'ItemGroupService/Get',
  foodCostingSequenceNo: ApiPrefix + 'foodCostingService/GetNumberSeries',
};

export const foodCostingApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'foodCosting/api',
  endpoints: build => ({
    fetchfoodCosting: build.query<any, any>({
      query: (params: any) => {
        return {
          url: foodCostingApis.foodCostingListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
  }),
});

export const { useLazyFetchfoodCostingQuery } = foodCostingApi;
