export type ADD_KIT_TYPE = {
  code: string;
  kitName: string;
  itemGroupId: string | number;
  activeFrom: Date;
  activeTo: Date;
  standardCost: string;
  totalRetailPrice: string;
  purchaseTaxGroupId: string | number;
  saleTaxGroupId: string;
  kitDetails: string;
};

export type ADD_UPDATE_FROM_PROPS = {
  code: string;
  id: string;
  kitDetails: CUSTOMER_DETAILS;
};

export type CUSTOMER_DETAILS = {
  id: number | string;
  name: string;
  firstName: string;
  lastName: string;
  storeId: string;
  code: string | number;
  ordersCount: string;
  phoneNumber: string;
  email: string;
  address: object[];
  orderHistory: object[];
  customerHistory: object[];
  specialInstruction: string;
  tenantId: string;
  externalId: string;
  genderValue: string;
  totalSpent: string;
  activeTab: string;
};
