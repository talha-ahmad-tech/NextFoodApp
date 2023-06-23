export type ADD_FOOD_COSTING = {
  code?: string;
  foodCostingName?: string;
  itemGroupId?: string;
  itemGroupName?: string;
  activeFrom?: string;
  activeTo?: string;
  standardCost?: string;
  totalRetailPrice?: string;
  purchaseTaxGroupId?: string | number;
  saleTaxGroupId?: string;
  foodCostingDetails?: string;
};

export type ADD_UPDATE_FOOD_COSTING = {
  code?: string;
  id?: string;
  foodCostingDetails?: FOOD_COSTING_DETAILS;
};

export type FOOD_COSTING_DETAILS = {
  code?: string;
  foodCostingName?: string;
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
  foodCostingDetails?: Array<ADD_FOOD_COSTING>;
  id?: string;
};
