import { COMPANY_DETAILS } from '@/containers/Company/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
const API_PRFIX = '/api/app/';
export const CompanyEndpoints = {
  CurrencyLookup: API_PRFIX + 'currency/lookup',

  CompanyListing: API_PRFIX + 'friday-tenant/companies',
  Company: API_PRFIX + 'friday-tenant/company',

  timeZone: API_PRFIX + 'time-zone/lookup',
  customerView: (id?: string) =>
    API_PRFIX + `friday-tenant/${id}/company-by-id`,
  CustomerOrderHisotry: '/get-orders-by-customer-id',
  CustomerAddress: '/get-address-by-customer-id',
  CustomerPointHisotry: '/get-customer-points-history',
};

export const companyApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'company/api',
  endpoints: build => ({
    fetchCompany: build.query({
      query: (params: { PageIndex: number; PageSize: number }) => {
        return {
          url: CompanyEndpoints.CompanyListing,
          method: 'GET',
          params,
        };
      },
    }),
    company: build.mutation({
      query: (payload: COMPANY_DETAILS) => {
        return {
          url: CompanyEndpoints.Company,
          method: payload?.id ? 'put' : 'post',
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useFetchCompanyQuery,
  useLazyFetchCompanyQuery,
  useCompanyMutation,
} = companyApi;
