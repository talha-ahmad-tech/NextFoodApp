'use static';
import _ from 'lodash';
import { env } from '../config';
import moment from 'moment';
const API_URL_SETUP = env('API_URL_SETUP');
const API_URL_PRODUCTS = env('API_URL_PRODUCTS');
const API_URL_CORE = env('API_URL_CORE');
const API_URL_FILTERS = env('API_URL_FILTERS');
const API_URL_ORDER = env('API_URL_ORDER');
const SSO_AUTHORIY = env('SSO_AUTHORIY');
const SSO_CLIENT_ID = env('SSO_CLIENT_ID');
const SSO_REDIRECT_URL = env('SSO_REDIRECT_URL');
const APP_WEB = env('APP_WEB');

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
export const PAGINATION = 40;
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
    | 'app'
    | '',
) => {
  switch (url) {
    case 'app':
      return APP_WEB ?? process.env.NEXT_PUBLIC_APP_WEB;
    case 'setup':
      return API_URL_SETUP ?? process.env.NEXT_PUBLIC_API_URL_SETUP;
    case 'products':
      return API_URL_PRODUCTS ?? process.env.NEXT_PUBLIC_API_URL_PRODUCTS;
    case 'filters':
      return API_URL_FILTERS ?? process.env.NEXT_PUBLIC_API_URL_FILTERS;
    case 'core':
      return API_URL_CORE ?? process.env.NEXT_PUBLIC_API_URL_CORE;
    case 'order':
      return API_URL_ORDER ?? process.env.NEXT_PUBLIC_API_URL_ORDER;
    case 'sso':
      return {
        authority: SSO_AUTHORIY ?? process.env.NEXT_PUBLIC_SSO_AUTHORIY,
        clientId: SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID,
        // scope: SSO_SCOPE ?? process.env.NEXT_PUBLIC_SSO_SCOPE,
        scope: 'ReactLiveClient',
        redirectUri:
          SSO_REDIRECT_URL ?? process.env.NEXT_PUBLIC_SSO_REDIRECT_URL,
      };
    case '':
      return API_URL_PRODUCTS ?? process.env.NEXT_PUBLIC_API_URL_PRODUCTS;
    default:
      break;
  }
};

export const PermissionsNotUsed = [
  'AbpIdentity',
  'FeatureManagement',
  'SettingManagement',
  'AbpTenantManagement',
];

export const GetProductsByCategory = (
  products: Array<object>,
  selectedProduct: Array<object>,
) => {
  const GroupByCategory = _.mapValues(
    _.groupBy(products, 'category.name'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prod: Array<any>) => {
      return {
        parent: true,
        name: prod[0]?.category?.name,
        items: prod?.map((p: { id: string | number; name: string }) => {
          const product = {
            id: p?.id,
            name: p?.name,
            checked: selectedProduct.some(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ({ productId }: any) => productId === p?.id,
            ),
          };
          return product;
        }),
      };
    },
  );
  return Object.keys(GroupByCategory).map(key => GroupByCategory[key]);
};

export const GetLocalDate = (date?: Date) => {
  if (date) {
    const utcDate = moment.utc(date).toDate();
    return moment(utcDate).local().format('MM-DD-YYYY');
  } else {
    return moment().format('MM-DD-YYYY');
  }
};

export const GetLocalTime = (date: Date) => {
  if (date) {
    const utcDate = moment.utc(date).toDate();
    return moment(utcDate).local().format('LT');
  } else {
    return moment().format('LT');
  }
};
