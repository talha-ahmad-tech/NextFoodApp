import { urlConverter } from '@/utils/helper';
import { localstorageService } from '@fridayfood/shared/utils';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const API_URL_PRODUCTS = urlConverter('products');
export const API_URL_CORE_APP = urlConverter('core');
export const API_URL_ORDER_APP = urlConverter('order');
export const API_URL_SETUP = urlConverter('setup');
export const API_URL_FILTERS = urlConverter('filters');

const CreateQueryCustom = (url: string) => {
  return fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: async headers => {
      if (localstorageService.getToken()) {
        headers.set(
          'Authorization',
          `Bearer ${localstorageService.getToken()}`,
        );
      }
      return headers;
    },
  });
};

export const baseQuery = CreateQueryCustom(
  API_URL_SETUP ?? process.env.NEXT_PUBLIC_API_URL_SETUP,
);

export const baseQueryOrder = CreateQueryCustom(API_URL_ORDER_APP);

export const baseQueryProduct = CreateQueryCustom(API_URL_PRODUCTS);

export const baseQueryCore = CreateQueryCustom(API_URL_CORE_APP);

export const baseQuerySetup = CreateQueryCustom(API_URL_SETUP);
export const baseQueryFilters = CreateQueryCustom(API_URL_FILTERS);
