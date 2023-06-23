export type ADD_TERMINALS = {
  name?: string;
  description?: string;
  store?: string | undefined;
  logoffTime?: string;
  autoLogTime?: number;
  declareTender?: boolean | string;
  id?: number | string;
  activeTab?: string;
  terminalStores?: [
    {
      id?: number;
      terminalId?: number;
      storeId?: number;
      tenantId?: string;
      externalId?: string;
    },
  ];
  terminalsDetails?: TERMINAL_FORM;
};

export type TRMINALS_DETAILS = {
  id?: string;
  terminalsDetails?: TERMINAL_FORM;
  activeTab?: number;
};
export type TERMINAL_FORM = {
  id?: number;
  tenantId?: string;
  externalId?: string;
  name?: string;
  description?: string;
  autoLogTime?: number;
  declareTender?: boolean;
  terminalStores?: [
    {
      id?: number;
      terminalId?: number;
      storeId?: number;
      tenantId?: string;
      externalId?: string;
    },
  ];
};
