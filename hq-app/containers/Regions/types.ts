import { JsxElement } from 'typescript';

export type ADD_REGION_TYPE = {
  name: string;
  description: string;
  stores: Array<any>;
  id: number;
};

export type ADD_UPDATE_FROM_PROPS = {
  name?: string;
  description?: string;
  stores?: any;
  id?: string | number;
  callBack?: () => void;
  regionStores?: object;
};

export type REGION_DETAILS = {
  name: string;
  description: string;
  storeId?: string | number;
  stores: string[];
  id: number;
  regionDetails: Array<object>;
  data?: REGIONS_LIST[];
  ErrorComponent?: JsxElement | React.ReactNode;
  hasError?: boolean;
  statusCode?: number;
  message?: string;
  props?: any;
};

export type REGIONS_LIST = {
  id: 21;
  name: string;
  stores: string;
  description?: string;
};
export type REGIONS_VIEW = {
  name?: string;
  description?: string;
  regionStores?: any;
};
