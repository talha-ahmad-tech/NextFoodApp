import { ADD_UPDATE_ROLES } from '@/containers/Roles/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
import { alertService } from '@fridayfood/shared/components/Alert';
const ApiPrefix = '/api/app/';

export const RolesApis = {
  RolesListing: ApiPrefix + 'identity-role/list',
  Permissions: ApiPrefix + 'permission',
  CreateRoles: ApiPrefix + 'identity-role',
  UpdateRoles: ApiPrefix + 'RolesService/Update',
  createPermissions: ApiPrefix + 'permission/grant-role-permission',
  RolesTaxGroup: ApiPrefix + 'ProductService/GetTaxGroup',
  RolesItemGroup: ApiPrefix + 'ItemGroupService/Get',
  RolesSequenceNo: ApiPrefix + 'RolesService/GetNumberSeries',
  FetchUserPermissions: 'api/permission-management/permissions',
  PemrissionsUpdate: (params?: { providerName: string; providerKey: string }) =>
    ApiPrefix +
    `permission?providerName=${params?.providerName}&providerKey=${params?.providerKey}`,
};

export const rolesApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'roles/api',
  endpoints: build => ({
    fetchRoles: build.query({
      query: () => {
        return {
          url: RolesApis.RolesListing,
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),

    createRoles: build.mutation({
      query: (params: ADD_UPDATE_ROLES) => {
        const method = params?.id ? 'PUT' : 'POST';
        return {
          url: RolesApis.CreateRoles,
          method: method,
          body: params,
        };
      },
      // transformErrorResponse(baseQueryReturnValue: FetchBaseQueryError) {
      //   alertService.error(baseQueryReturnValue?.data.error.message, {
      //     keepAfterRouteChange: true,
      //     autoClose: true,
      //   });
      // },
    }),

    fetchPermission: build.query({
      query: params => {
        return {
          url: RolesApis.Permissions,
          method: 'GET',
          params: params,
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    fetchUserPermissions: build.query<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      { providerName: string; providerKey: string }
    >({
      query: params => {
        return {
          url: RolesApis.FetchUserPermissions,
          method: 'GET',
          params,
        };
      },
    }),
    createPermissions: build.mutation({
      query: params => {
        const urls = RolesApis.PemrissionsUpdate(params.ParamData);
        return {
          url: urls,
          method: 'PUT',
          body: params.permissions,
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  useFetchRolesQuery,
  useFetchPermissionQuery,
  useCreateRolesMutation,
  useCreatePermissionsMutation,
  useLazyFetchUserPermissionsQuery,
} = rolesApi;
