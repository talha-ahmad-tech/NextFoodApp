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
  id?: string;
  kitDetails: CUSTOMER_DETAILS;
  viewId?: number;
};

export type CUSTOMER_DETAILS = {
  viewId?: number;
  orderHistory?: string[];
  id?: number;
  customerId?: string | number;
  customerName?: string;
  name?: string;
  specialInstruction?: string;
  paymentMethod?: string | number;
  Address?: Array<any>;
  OrderHistory?: Array<any>;
  customerDetails?: Array<any>;
  code?: string | number;
  activeTab?: string;
  firstName?: string;
  lastName?: string;
  lifeTimeOrderSummary?: string;
  customerAddress?: string[];
  email: string;
  phoneNumber: string;
  getOrderByCustomer?: () => void;
};
