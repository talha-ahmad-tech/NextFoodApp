export type ADD_PAYMENT_METHOD_TYPE = {
  code: string | number | undefined;
  name: string;
  description: string | number;
  position: number | string;
  orderSource: string | number;
  id?: number | string;
};

export type ADD_UPDATE_FROM_PROPS = {
  code: string | number | undefined;
  id: string | number;
  name: string;
  description: string | number;
  position: number | string;
  orderSource?: string | number;
  orderSourceId?: string | number;
  paymentMethodDetails: PAYMENT_METHOD_DETAILS;
};
export type PAYMENT_METHOD_FORM_TAB = {
  code?: { name?: string | number; label?: string };
  name?: { name?: string; label?: string };
  description?: { name?: string; label?: string };
  position?: { name?: string | number; label?: string };
  id?: number | string;
  orderSource?:
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
  orderSourceId?: string | number;
};
export type ORDER_SOURCE = {
  name?: string;
  label: string;
  options: {
    label?: string | undefined;
    name?: string | undefined;
    value?: number | undefined;
  };
};

export type PAYMENT_METHOD_DETAILS = {
  code?: string | number;
  name?: string;
  description?: string | number;
  position?: string | number;
  orderSourceId?: string | number;
  orderSourceName?: string | number;
  orderSource?: string | number;
  id?: string | number;
  externalId?: string | number;
};
