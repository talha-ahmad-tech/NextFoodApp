import { getMethod } from './axios';

export const NumberSeries = async (name: string) => {
  const response = await getMethod({
    url: `/app/number-series/number-series-code?Name=${name}`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL_CORE,
  });

  return response;
};
