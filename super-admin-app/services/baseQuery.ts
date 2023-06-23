import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { env } from '../config';
const API_URL_CORE = env('API_URL_CORE');

export const baseQueryCore = fetchBaseQuery({
  baseUrl: API_URL_CORE ?? process.env.NEXT_PUBLIC_API_URL_CORE,
  prepareHeaders: async headers => {
    if (localStorage.getItem('token')) {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }
    return headers;
  },
});
