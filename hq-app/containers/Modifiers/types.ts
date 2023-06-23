export type ADD_MODIFIER_TYPE = {
  name: string;
  description: string;
  position: string;
  modifier: string;
  compulsory: boolean;
  optional: boolean;
  maxSelectionAllowed: string;
  modifierDetails: MODIFIER_DETAILS;
  modifierValues?: [];
};

export type ADD_UPDATE_FROM_PROPS = {
  id?: string;
  name: string;
  description: string;
  position: string;
  modifier: string;
  compulsory: boolean;
  optional: boolean;
  maxSelectionAllowed: string;
  modifierDetails?: MODIFIER_DETAILS;
  modifierValues?: [];
};

export type MODIFIER_DETAILS = {
  name?: string;
  description?: string;
  position?: string;
  compulsory?: boolean;
  optional?: boolean;
  itemGroup?: boolean;
  modifierValues?: [];
  modifier?: string;
  maxSelectionAllowed?: string;
  id?: number;
};

export type MODIFIER_LINE = {
  name: string;
  id?: string | number;
  modifierId?: string | number;
  purchaseUomId?: string | number;
  saleUomId?: string | number;
  position?: string | number;
  cost?: string | number;
  inStorePrice?: string | number;
  deliveryPrice?: string | number;
  active?: boolean;
  trackInventory?: boolean;
  image?: string | number;
  nested?: boolean;
  isChecked?: boolean;
  purchaseUom?: string | number;
  saleUom?: string | number;
  modifierSubValue?: [];
  modifierValueTaxes?: [];
};
