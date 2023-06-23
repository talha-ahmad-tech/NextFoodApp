import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
const ApiPrefix = '/api/abp/';

export const TenantAPIs = {
  getTenantInfo: (tenant: string) =>
    ApiPrefix + `multi-tenancy/tenants/by-name/${tenant}`,
};

export const tenantAPIs = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'tenant/api',
  endpoints: build => ({
    getTenantInfo: build.query({
      query: (tenant: string) => {
        return {
          url: TenantAPIs.getTenantInfo(tenant),
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetTenantInfoQuery } = tenantAPIs;
