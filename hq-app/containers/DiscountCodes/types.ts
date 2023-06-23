import { JsxElement } from 'typescript';

export type ADD_DISCOUNT_TYPE = {
  name: string;
  description: string;
  stores: Array<any>;
  id: number;
};

export type ADD_UPDATE_FROM_PROPS = {
  id?: string | number;
  callBack?: () => void;
  name?: string;
  code?: string;
  type?: string;
  amount?: string;
  customerLimit?: string;
  maximumAmount?: string;
  maximumLimit?: string;
  startDate?: string;
  endDate?: string;
  discountStores?: any;
  discountProducts?: any;
  discountItemGroups?: any;
  discountTypeValue?: string;
  discountProductId?: [];
  discountItemsGroupId?: [];
  discountStoreId?: [];
};

export type DISCOUNT_DETAILS = {
  name?: string;
  description?: string;
  stores?: Array<any>;
  id?: number;
  clusterDetails?: any;
  data?: DISCOUNT_LIST[];
  ErrorComponent?: JsxElement | React.ReactNode;
  hasError?: boolean;
  statusCode?: number;
  message?: string;
  props?: any;
};

export type DISCOUNT_LIST = {
  id: 21;
  name: string;
  symbol?: string;
  description?: string;
  externalId?: string;
};
export type DISCOUNT_VIEW = {
  orderSource?: string | [];
  discountCategory?: string | number;
  discountName?: string;
  discountCode?: string;
  discountType?: string;
  percentage?: string;
  store?: number;
  discountStatus?: string | boolean;
  customerUsageLimit?: string;
  VoucherUsageLimit?: string;
  discountUpperLimit?: string;
  startDate?: string;
  endDate?: string;
  discountStores?: any;
  discountProducts?: any;
  discountItemGroups?: any;
  discountTypeValue?: string;
};
