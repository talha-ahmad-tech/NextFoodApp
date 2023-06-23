export type ADD_COMPANY = {
  code?: string;
  companyName?: string;
  itemGroupId?: string;
  itemGroupName?: string;
  activeFrom?: string;
  activeTo?: string;
  standardCost?: string;
  totalRetailPrice?: string;
  purchaseTaxGroupId?: string | number;
  saleTaxGroupId?: string;
  companyDetails?: string;
};

export type ADD_UPDATE_COMPANY = {
  code?: string;
  id?: string;
  companyDetails?: COMPANY_DETAILS;
};

export type COMPANY_DETAILS = {
  activeTab?: string;
  code?: string;
  companyName?: string;
  itemGroupId?: string;
  itemGroupName?: string;
  status?: 0 | 1;
  approvalStatus?: 0 | 1;
  activeFrom?: string;
  activeTo?: string;
  standardCost?: string;
  totalRetailPrice?: string;
  purchaseTaxGroupId?: string;
  purchaseTaxGroupName?: string;
  saleTaxGroupId?: string;
  saleTaxGroupName?: string;
  companyDetails?: Array<ADD_COMPANY>;
  id?: string;
};
