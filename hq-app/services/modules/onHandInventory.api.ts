import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryProduct } from '../baseQuery';
import { PAGINATION } from '@/utils/helper';
const ApiPrefix = '/api/app/';

export const onHandEndpoints = {
  onHandInventory: ApiPrefix + 'onhand-inventory',
  GetInventory: (page?: number, type?: number) =>
    ApiPrefix +
    `onhand-inventory?Type=${type}&PageIndex=${page}&PageSize=${PAGINATION}`,
};

export const onHandInventoryApi = createApi({
  baseQuery: baseQueryProduct,
  reducerPath: 'onHandInventory/api',
  endpoints: build => ({
    inventoryListng: build.query({
      query: (config: {
        type: string;
        PageIndex: number;
        PageSize: number;
        PresetId?: string;
        FilterQuery?: { [key: string]: string };
      }) => {
        const { type, ...rest } = config;
        const param = [
          'allonhand',
          'ingredientsinventory',
          'packaginginventory',
          'modifierinventory',
        ].includes(type)
          ? {
              ...rest,
              type:
                type === 'allonhand'
                  ? 0
                  : type === 'ingredientsinventory'
                  ? 1
                  : type === 'packaginginventory'
                  ? 2
                  : 3,
            }
          : { ...rest };
        return {
          url: onHandEndpoints.GetInventory(
            config.PageIndex,
            config.type === 'allonhand'
              ? 0
              : type === 'ingredientsinventory'
              ? 1
              : type === 'packaginginventory'
              ? 2
              : 3,
          ),
          method: 'GET',
          // params: param,
        };
      },
    }),
    fetchInventory: build.query({
      query: (url: string) => {
        return {
          url: url,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useFetchInventoryQuery,
  useInventoryListngQuery,
  useLazyInventoryListngQuery,
} = onHandInventoryApi;
