import { urlConverter } from '@/utils/helper';
import axios from 'axios';

axios.defaults.baseURL = urlConverter('core');

interface getUtil {
  url?: string;
  params?: object;
  baseUrl?: string;
}
interface postUtil {
  url: string;
  params?: object;
  baseUrl?: string;
}

const getMethod = ({ url = '', params = {}, baseUrl }: Partial<getUtil>) => {
  const config = {
    params: params,
    baseURL: baseUrl,
    url: url,
  };

  return axios.get(url, config);
};

const postMethod = ({ url, params = {}, baseUrl }: postUtil) => {
  const config = {
    baseURL: baseUrl,
  };
  return axios.post(url, params, config);
};
const deleteMethod = ({ url, params = {} }: postUtil) => {
  return axios.delete(url, params);
};

const putMethod = ({ url, params = {}, baseUrl }: postUtil) => {
  const config = {
    ...(baseUrl && { baseURL: baseUrl }),
  };
  return axios.put(url, params, config);
};

const setDefaultHeader = (token: string | undefined) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  axios.defaults.headers.common = headers;
};

export { getMethod, postMethod, putMethod, deleteMethod, setDefaultHeader };
