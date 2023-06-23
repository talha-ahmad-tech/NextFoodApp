import type { ICellRendererParams } from 'ag-grid-community';

export type ADD_PRICELIST = {
  priceType?: number;
  name?: string;
  description?: string;
  status?: number | string;
  dateFrom?: string;
  dateTill?: string;
  id?: number | string;
  priceListDetails?: IrowFormat[];
};

export type PRICE_TYPE = {
  name?: string;
  label: string;
  options: {
    label?: string | undefined;
    name?: string | undefined;
    value?: number | undefined;
  };
};

export type PRICELIST_FORM = {
  priceType?:
    | {
        name?: string | undefined;
        options: {
          label?: string | undefined;
          name?: string | undefined;
          value?: number | undefined;
        }[];
        label?: string | undefined;
        requiredErrorMsg?: string | undefined;
      }
    | undefined;
  name?: { name?: string; label?: string };
  description?: { name?: string; label?: string };
  status?: { name?: string; label?: string };
  dateFrom?: { [key: string]: string };
  dateTill?: { [key: string]: string };
  id?: number | string;
};

export type VIEW_PRICELIST = {
  id?: number | string;
  priceListDetails?: PRICELIST_DETAILS;
};

export type PRICELIST_DETAILS = {
  activeTab?: string;
  priceType?: number;
  name?: string;
  description?: string;
  status?: string;
  statusId?: number;
  dateFrom?: string;
  dateTill?: string;
  id?: number | string;
  priceListDetails?: IrowFormat[];
};
export type PRICE_TYPE_VALUE = {
  priceType?: number;
};
export type IrowFormat = {
  productType?: string | number;
  productName?: string;
  storeType?: string | number;
  clusters?: string;
  stores?: string;
  inStorePrice?: number;
  collectionPrice?: number;
  deliveryPrice?: number;
  discountPercentage?: number;
  discountAmount?: number;
};

export type CellEditorProps = {
  CustomCellEditorParams: (props: ICellRendererParams) => JSX.Element;
};
