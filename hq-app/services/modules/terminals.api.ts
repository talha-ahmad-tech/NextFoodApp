import { TERMINAL_FORM } from '@/containers/Terminals/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryCore } from '../baseQuery';
const ApiPrefix = '/api/app/';

export const TerminalsApis = {
  getTerminals: ({ page, size }: { page: number; size: number }) =>
    ApiPrefix + `terminal?PageIndex=${page}&PageSize=${size}`,
  getStores: ApiPrefix + 'store/lookup',
  createTerminal: ApiPrefix + 'terminal',
  terminalDetails: (id: number) => ApiPrefix + `terminal/${id}/by-id`,
};

export const terminalsApi = createApi({
  baseQuery: baseQueryCore,
  reducerPath: 'terminals/api',
  endpoints: build => ({
    fetchTerminals: build.query({
      query: (config: { page: number; size: number }) => {
        return {
          url: TerminalsApis.getTerminals(config),
          method: 'GET',
          // params: AgGridFitlersUtils(params.request)
        };
      },
    }),
    createUpdateTerminal: build.mutation({
      query: (params: TERMINAL_FORM) => {
        const method = params?.id ? 'PUT' : 'POST';
        return {
          url: TerminalsApis.createTerminal,
          method,
          body: params,
        };
      },
    }),
  }),
});

export const { useFetchTerminalsQuery, useCreateUpdateTerminalMutation } =
  terminalsApi;
