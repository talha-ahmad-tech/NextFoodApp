export type ADD_ROLES = {
  code?: string;
  rolesName?: string;
  itemGroupId?: string;
  itemGroupName?: string;
  activeFrom?: string;
  activeTo?: string;
  standardCost?: string;
  totalRetailPrice?: string;
  purchaseTaxGroupId?: string | number;
  saleTaxGroupId?: string;
  rolesDetails?: string;
};

export type ADD_UPDATE_ROLES = {
  isDefault?: boolean;
  isPublic?: boolean;
  name?: string;
  id?: string | number;
  rolesDetails?: ROLES_DETAILS;
};

export type ROLES_DETAILS = {
  isDefault?: boolean;
  isPublic?: boolean;
  name?: string;
  id?: string | number;
};
