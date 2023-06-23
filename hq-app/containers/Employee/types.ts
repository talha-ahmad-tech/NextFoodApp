export type ADD_EMPLOYEE_TYPE = {
  employeeId: string;
  employeeName: string;
  employeeType: string | number;
  role: string;
  password: string;
  pinNumber: number;
  payType: string | number;
  payDetails: string;
  stores: string | number;
  active: boolean;
  employeeDetails: string;
};

export type ADD_UPDATE_FROM_PROPS = {
  roleIds?: [];
  storesIds?: [];
  storeIdName?: [''];
  roleIdName?: [];
  employeeType?: string | number;
  employeeId?: string | number;
  employeeName?: string;
  pinNumber?: string | number;
  number?: number | string;
  id?: string | number;
  name?: string;
  roles?: string | number;
  pin?: number | undefined;
  phone?: number;
  isActive?: boolean;
  email?: string;
  type?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role?: any;
  code?: string | number | undefined;
  username?: string | number | undefined;
  payType?: string | number;
  payDetails?: string | number;
  payDetail?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stores?: any;
  active?: boolean;
  password?: string;
  employeeDetails?: EMPLOYEE_DETAILS;
  Addresses?: Array<object>;
  addresses?: Array<object>;
  callBack?: () => void;
  roleNames?: string[] | undefined | unknown;
  phoneNumber?: string | number;
  storeIds?: string[] | undefined | unknown;
};

export type EMPLOYEE_DETAILS = {
  addresses?: Array<object>;
  id?: string | number;
  activeTab?: string;
  name?: string;
  roles?: string | number;
  code?: number;
  pin?: number;
  phone?: number;
  isActive?: boolean;
  email?: string;
  type?: string | number;
  role?: string | number;
  payType?: string | number;
  payDetails?: string;
  payDetail?: string | number;
  stores?: object;
  active?: boolean;
  password?: string;
};
