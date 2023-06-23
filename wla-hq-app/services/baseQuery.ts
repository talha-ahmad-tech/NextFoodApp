import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { env } from '../config';
const API_URL_WLA = env('API_URL_WLA');

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL_WLA ?? process.env.NEXT_PUBLIC_API_URL_WLA,
  prepareHeaders: async headers => {
    if (localStorage.getItem('token')) {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }
    return headers;
  },
});
