import { JsxElement } from 'typescript';

export type ADD_CLUSTERS_TYPE = {
  name: string;
  description: string;
  stores: Array<any>;
  id: number;
};

export type ADD_UPDATE_FROM_PROPS = {
  name?: string;
  description?: string;
  stores?: CLUSTERS_DETAILS;
  id?: string | number;
  callBack?: () => void;
  clusterStores?: any;
};

export type CLUSTERS_DETAILS = {
  name?: string;
  description?: string;
  stores?: Array<any>;
  id?: number;
  clusterDetails?: any;
  data?: CLUSTERS_LIST[];
  ErrorComponent?: JsxElement | React.ReactNode;
  hasError?: boolean;
  statusCode?: number;
  message?: string;
  props?: any;
};

export type CLUSTERS_LIST = {
  id: 21;
  name: string;
  symbol?: string;
  description?: string;
  externalId?: string;
};
export type CLUSTERS_VIEW = {
  name?: string;
  description?: string;
  clusterStores?: any;
};
