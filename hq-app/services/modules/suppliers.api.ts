import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
import { alertService } from '@fridayfood/shared/components/Alert';
import { ADD_UPDATE_SUPPLIERS } from '@/containers/Suppliers/types';
const ApiPrefix = '/api/app/';

export const SuppliersApis = {
  supplierNumberSeries:
    ApiPrefix + 'number-series/number-series-code?Name=Supplier',
  SuppliersListing: ({ page, size }: { page: number; size: number }) =>
    ApiPrefix + `supplier?PageIndex=${page}&PageSize=${size}`,
  SuppliersDetails: (id: number | string) => ApiPrefix + `supplier/${id}/by-id`,
  CreateSuppliers: ApiPrefix + 'supplier',
  UpdateSuppliers: ApiPrefix + 'SuppliersService/Update',
  SuppliersTaxGroup: ApiPrefix + 'tax/lookup',
  SupplierStore: ApiPrefix + 'store/lookup',
  SuppliersItemGroup: ApiPrefix + 'ItemGroupService/Get',
  SuppliersSequenceNo: ApiPrefix + 'SuppliersService/GetNumberSeries',
};

export const suppliersApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'suppliers/api',
  endpoints: build => ({
    fetchSuppliers: build.query({
      query: (config: { page: number; size: number }) => {
        return {
          url: SuppliersApis.SuppliersListing(config),
          method: 'GET',
        };
      },
    }),

    createSupplier: build.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (params: ADD_UPDATE_SUPPLIERS) => {
        const method = params?.id ? 'PUT' : 'POST';
        return {
          url: SuppliersApis.CreateSuppliers,
          method,
          body: params,
          // params: AgGridFitlersUtils(params.request)
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

export const { useFetchSuppliersQuery, useCreateSupplierMutation } =
  suppliersApi;
