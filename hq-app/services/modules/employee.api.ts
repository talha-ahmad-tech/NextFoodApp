import { ADD_UPDATE_FROM_PROPS } from '@/containers/Employee/types';
import { alertService } from '@fridayfood/shared/components';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const EmployeeApis = {
  EmployeeDetails: (id: string | string[] | undefined | number) =>
    ApiPrefix + `identity-user/${id}`,
  StoresLookup: ApiPrefix + 'store/lookup',
  GeneratePin: ApiPrefix + 'identity-user/random-number',
  EmployeeCreate: ApiPrefix + 'identity-user',
  EmployeeNumberSeries:
    ApiPrefix + 'number-series/number-series-code?Name=employee',
  EmployeeUpdate: (id?: number | string) => ApiPrefix + `identity-user/${id}`,
  RoleLookup: ApiPrefix + 'identity-role/lookup',
  EmployeeListing: ({ page, size }: { page: number; size: number }) =>
    ApiPrefix + `identity-user?PageIndex=${page}&PageSize=${size}`,
};

export const employeeApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'employee/api',
  endpoints: build => ({
    fetchEmployees: build.query({
      query: (config: { page: number; size: number }) => {
        return {
          url: EmployeeApis.EmployeeListing(config),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    updateEmployee: build.mutation({
      query: (params: ADD_UPDATE_FROM_PROPS) => {
        return {
          url: EmployeeApis.EmployeeUpdate(params?.id),
          method: 'PUT',
          body: params,
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
    fetchPins: build.query({
      query: () => {
        return {
          url: EmployeeApis.GeneratePin,
          method: 'GET',
        };
      },
    }),

    createEmployee: build.mutation({
      query: (params: ADD_UPDATE_FROM_PROPS) => {
        return {
          url: EmployeeApis.EmployeeCreate,
          method: 'POST',
          body: params,
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
  useLazyFetchEmployeesQuery,
  useCreateEmployeeMutation,
  useFetchEmployeesQuery,
  useFetchPinsQuery,
  useUpdateEmployeeMutation,
} = employeeApi;
