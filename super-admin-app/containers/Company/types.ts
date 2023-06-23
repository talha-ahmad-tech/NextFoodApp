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
  contactNumber?: string;
  adminEmailAddress?: string;
};

export type ADD_UPDATE_COMPANY = {
  code?: string;
  id?: string;
  companyDetails?: COMPANY_DETAILS;
  contactNumber?: string;
  adminEmailAddress?: string;
};

export type COMPANY_DETAILS = {
  subdomainName?: string;
  active?: boolean;
  language?: string;
  timeZone?: string;
  vat?: string;
  wlaApp?: false;
  name?: string;
  currencyName?: string;
  addresses?: [];

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

  currencyId?: string;
  currency?: string;

  timeZoneId?: string;
  logo?: string;
  subDomain?: string;
  isActive?: boolean;
  legalName?: string;
  contactName?: string;

  contactNumber?: string;
  adminEmailAddress?: string;
};
