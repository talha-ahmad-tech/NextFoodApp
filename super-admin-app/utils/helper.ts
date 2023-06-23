'use static';
import { env } from '../config';
import moment from 'moment';
const SSO_AUTHORIY = env('SSO_AUTHORIY');
const SSO_CLIENT_ID = env('SSO_CLIENT_ID');
const SSO_REDIRECT_URL = env('SSO_REDIRECT_URL');
const API_URL_CORE = env('API_URL_CORE');

export const PAGINATION = 40;

export const statusConversion = (val: number) => {
  switch (val) {
    case 0:
      return 'None';
    case 1:
      return 'Draft';
    case 2:
      return 'InReview';
    case 3:
      return 'Approved';
    case 4:
      return 'Closed';
    case 5:
      return 'Rejected';
    default:
      return 'Draft';
  }
};

export const defDate = (preDate?: string) => {
  const validDate = preDate
    ? new Date(preDate)?.toISOString()?.substring(0, 10)
    : false;
  const currentDate = new Date();
  const today = new Date(currentDate)?.toISOString()?.substring(0, 10);
  // ?.replaceAll('/', '-');
  const defaultDate =
    (validDate && validDate < today) || !validDate ? today : validDate;
  return defaultDate;
};

const amountFormatter = (value: string | number) => {
  const intlFormat = new Intl.NumberFormat('en-US');
  const formatted = intlFormat.format(Number(value));
  return formatted;
  // value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
};

export const dateFormatter = (value: string) => {
  return value ? new Date(value).toLocaleDateString() : '';
};

export const timeFormatter = (value: string) => {
  return value ? moment(value).format('LT') : '';
};

export default amountFormatter;

export const dashboardStats: Array<{
  id?: string;
  title?: string;
  time?: string;
}> = [
  {
    id: 'R-000VG1',
    title: 'D-G1',
    time: '1 Day ago',
  },
  {
    id: 'R-000SG1',
    title: 'P-T1',
    time: '2 Days ago',
  },
];

export const urlConverter = (
  url:
    | 'setup'
    | 'products'
    | 'filters'
    | 'core'
    | 'order'
    | 'sso'
    | 'filters'
    | '',
) => {
  switch (url) {
    case 'core':
      return API_URL_CORE ?? process.env.NEXT_PUBLIC_API_URL_CORE;
    case 'sso':
      return {
        authority: SSO_AUTHORIY ?? process.env.NEXT_PUBLIC_SSO_AUTHORIY,
        clientId: SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID,
        scope: 'ReactWLAPreview',
        redirectUri:
          SSO_REDIRECT_URL ?? process.env.NEXT_PUBLIC_SSO_REDIRECT_URL,
      };
    default:
      break;
  }
};
