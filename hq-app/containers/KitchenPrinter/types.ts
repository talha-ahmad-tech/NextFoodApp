import { JsxElement } from 'typescript';

export type ADD_KITCHEN_TYPE = {
  name?: string;
  description?: string;
  itemGroup?: Array<any>;
  productCategory?: string;
};

export type ADD_UPDATE_FROM_PROPS = {
  categoryId?: string | number;
  itemGroupId?: string | number;
  categoryName?: string;
  name?: string;
  description?: string;
  itemGroup?: string | number;
  productCategory?: string | number;
  productCategoryName?: string | number | undefined;
  itemGroupName?: string | number | undefined;
  callBack?: () => void;
  kitchenDetails?: KITCHEN_DETAILS;
  id?: number;
};

export type KITCHEN_DETAILS = {
  categoryName?: string;
  productCategoryName?: string;

  itemGroupName?: string;
  categoryId?: number | string;
  itemGroupId?: number | string;
  name?: string;
  description?: string;
  itemGroup?: any;
  productCategory?: any;
  id?: number;
  kitchenDetails?: any;
  ErrorComponent?: JsxElement | React.ReactNode;
  hasError?: boolean;
  statusCode?: number;
  message?: string;
  props?: any;
};
