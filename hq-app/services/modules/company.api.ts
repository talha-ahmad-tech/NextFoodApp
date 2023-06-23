import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '../baseQuery';
const ApiPrefix = '/api/services/app/';

export const CompanyApis = {
  CompanyListing: ApiPrefix + '',
  CompanyDetails: ApiPrefix + '',
  CreateCompany: ApiPrefix + 'CompanyService/Create',
  UpdateCompany: ApiPrefix + 'CompanyService/Update',
  CompanyTaxGroup: ApiPrefix + 'ProductService/GetTaxGroup',
  CompanyItemGroup: ApiPrefix + 'ItemGroupService/Get',
  CompanySequenceNo: ApiPrefix + 'CompanyService/GetNumberSeries',
};

export const companyApi = createApi({
  baseQuery: baseQuery,
  reducerPath: 'company/api',
  endpoints: build => ({
    fetchCompany: build.query<any, any>({
      query: (config: { page: number; size: number }) => {
        return {
          url: CompanyApis.CompanyListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
  }),
});

export const { useLazyFetchCompanyQuery, useFetchCompanyQuery } = companyApi;
