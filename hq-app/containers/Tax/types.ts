export type ADD_TAX_TYPE = {
  taxId?: string | number | undefined | null;
  name?: string | number;
  description?: string | number;
  taxRate?: string | number;
  taxType?: string | number;
  stores?: object[];
  clusters?: string | number;
  clusterId?: number | string;
  clusterName?: string;
  taxItemGroups?: object[];
  taxProducts?: object[];
  id?: string | number;
  taxStores?: object[];
  code?: string | number;
};

export type ADD_UPDATE_FROM_PROPS = {
  taxId?: string | number | undefined | null;
  name?: string | number;
  description?: string | number;
  taxRate?: string | number;
  taxType?: string | number;
  stores?: object[];
  clusters?: string | number;
  clusterId?: number | string;
  taxItemGroups?: object[];
  productName?: string | number;
  id?: string | number;
  taxStores?: object[];
  code?: string | number;
  taxProducts?: object[];
  taxDetails?: TAX_DETAILS;
};

export type TAX_FORM_TAB = {
  id?: number | string;
  taxId?: {
    name?: string | number | undefined | null;
    label?: string | number | undefined | null;
  };
  name?: { name?: string; label?: string };
  description?: { name?: string; label?: string };
  taxRate?: { name?: string; label?: string };
  stores?: { name?: string; label?: string };
  taxType?:
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
  clusters?: { name?: string; label?: string };
  taxProducts?: { id?: string | number; name?: string; label?: string };
  taxItemGroups?: { id?: string | number; name?: string; label?: string };
  taxStores?: { id?: string | number; name?: string; label?: string };
};
export type TAX_TYPE = {
  name?: string;
  label: string;
  options: {
    label?: string | undefined;
    name?: string | undefined;
    value?: number | undefined;
  };
};

export type TAX_DETAILS = {
  code?: string | number;
  taxId?: string | number;
  name?: string;
  description?: string;
  taxRate?: number | string;
  taxType?: number | string;
  clusterId?: string | number;
  stores?: object[];
  id?: string | number;
  tenantId?: null;
  cluster?: { name: string };
  productName?: string | number;
  taxItemGroups?: object[];
  taxStores?: object[];
  taxProducts?: object[];
};
