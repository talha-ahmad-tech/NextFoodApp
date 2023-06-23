import { JsxElement } from 'typescript';

export type ADD_DENOMINATIONS_TYPE = {
  name: string;
  description: string;
  stores: Array<any>;
  id: number;
  position: string;
};

export type ADD_UPDATE_FROM_PROPS = {
  name?: string;
  description?: string;
  id?: string | number;
  callBack?: () => void;
  denominationsStores?: object;
  position: string;
};

export type DENOMINATIONS_DETAILS = {
  name?: string;
  description?: string;
  stores?: Array<any>;
  position: string;
  id?: number;
  denominationsDetails?: any;
  // data?: DENOMINATIONS_LIST[];
  ErrorComponent?: JsxElement | React.ReactNode;
  hasError?: boolean;
  statusCode?: number;
  message?: string;
  props?: any;
};

export type DENOMINATIONS_VIEW = {
  name?: string;
  description?: string;
  storeId?: number;
  denominationsStores?: any;
  position?: string;
};
