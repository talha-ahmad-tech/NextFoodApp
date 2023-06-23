import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
import { PAGINATION } from '@/utils/helper';
const ApiPrefix = '/api/app/';

export const inventoryAdjustmentEndpoints = {
  inventoryAdjustmentListing: ({
    page,
    type,
  }: {
    page: number;
    type?: number;
  }) =>
    type
      ? ApiPrefix +
        `inventory-adjustment?Type=${type}&PageIndex=${page}&PageSize=${PAGINATION}`
      : ApiPrefix +
        `inventory-adjustment?PageIndex=${page}&PageSize=${PAGINATION}`,

  CreateinventoryAdjustment: ApiPrefix + 'inventory-adjustment',
  inventoryLines: ApiPrefix + 'inventory-adjustment/lines',
  inventoryDetails: (id: number) =>
    ApiPrefix + `inventory-adjustment/${id}/by-id`,
  inventoryLookup: ApiPrefix + 'onhand-inventory/lookup',
  supplierLookup: ApiPrefix + 'supplier/lookup',
  uploadInventory: ApiPrefix + 'inventory-adjustment/from-excel',
  bulkInventory: ApiPrefix + 'inventory-adjustment/bulk',
};

export const inventoryAdjustmentApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'inventoryAdjustment/api',
  endpoints: build => ({
    fetchInventoryAdjustment: build.query({
      query: (config: { page: number; type?: number }) => {
        return {
          url: inventoryAdjustmentEndpoints.inventoryAdjustmentListing(config),
          method: 'GET',
        };
      },
    }),
    createInventoryAdjustment: build.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (payload: any) => {
        return {
          url: inventoryAdjustmentEndpoints.CreateinventoryAdjustment,
          method: 'POST',
          body: payload,
        };
      },
    }),
    inventoryAdjustmentListing: build.query({
      query: (config: {
        PageIndex: number;
        PageSize: number;
        PresetId?: string;
        FilterQuery?: { [key: string]: string };
        StartDate?: string;
        EndDate?: string;
      }) => {
        return {
          url: inventoryAdjustmentEndpoints.CreateinventoryAdjustment,
          method: 'GET',
          params: config,
        };
      },
    }),
    uploadInventory: build.mutation({
      query: body => {
        return {
          url: inventoryAdjustmentEndpoints.uploadInventory,
          body,
          method: 'POST',
        };
      },
    }),
    bulkInventoryUpload: build.mutation({
      query: body => {
        return {
          url: inventoryAdjustmentEndpoints.bulkInventory,
          body,
          method: 'POST',
        };
      },
    }),
    inventoryLines: build.query({
      query: (config: {
        PageIndex: number;
        PageSize: number;
        PresetId?: string;
        FilterQuery?: { [key: string]: string };
        StartDate?: string;
        EndDate?: string;
        InventoryAdjustmentId?: number;
      }) => {
        return {
          url: inventoryAdjustmentEndpoints.inventoryLines,
          method: 'GET',
          params: config,
        };
      },
    }),
  }),
});

export const {
  useLazyFetchInventoryAdjustmentQuery,
  useFetchInventoryAdjustmentQuery,
  useCreateInventoryAdjustmentMutation,
  useLazyInventoryAdjustmentListingQuery,
  useInventoryAdjustmentListingQuery,
  useUploadInventoryMutation,
  useBulkInventoryUploadMutation,
  useInventoryLinesQuery,
  useLazyInventoryLinesQuery,
} = inventoryAdjustmentApi;
