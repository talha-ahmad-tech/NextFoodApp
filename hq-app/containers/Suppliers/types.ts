/* eslint-disable @typescript-eslint/no-explicit-any */
// export type ADD_SUPPLIERS = {
//   code?: string;
//   suppliersName?: string;
//   itemGroupId?: string;
//   itemGroupName?: string;
//   activeFrom?: string;
//   activeTo?: string;
//   standardCost?: string;
//   totalRetailPrice?: string;
//   purchaseTaxGroupId?: string | number;
//   saleTaxGroupId?: string;
//   suppliersDetails?: string;
// };

export type ADD_UPDATE_SUPPLIERS = {
  code?: string;
  id?: string | number;
  suppliersDetails?: SUPPLIERS_DETAILS;
  name?: string;
  description?: string;
  contactNumber?: string;
  email?: string;
  taxId?: Array<object>;
  store?: Array<object>;
  addresses?: Array<object>;
  taxIdName?: any;
  storeIdName?: any;
  taxes?: any;
  stores?: any;
};

export type SUPPLIERS_DETAILS = {
  code?: string;
  name?: string;
  description?: string;
  contactNumber?: string;
  email?: string;
  taxes?: any;
  stores?: any;
  addresses?: Array<object>;
  suppliersName?: string;
  // suppliersDetails?: Array<ADD_SUPPLIERS>;
  id?: string;
  activeTab?: string;
};
