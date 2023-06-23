export type ADD_INVENTORY_ADJUSTMENT_NEW = {
  name?: string;
  code?: string;
  inventoryAdjustmentNewName?: string;
  itemGroupId?: string;
  itemGroupName?: string;
  activeFrom?: string;
  activeTo?: string;
  standardCost?: string;
  totalRetailPrice?: string;
  purchaseTaxGroupId?: string | number;
  saleTaxGroupId?: string;
  inventoryAdjustmentNewDetails?: string;
};
export type INVENTORY_ADJUSTMENT_DETAIL = {
  id?: number;
  name?: string;
  description?: string;
  date?: string;
  time?: string;
  reason?: string;
  documentReference?: string;
  supplierId?: string;
  supplierName?: string;
  storeId?: string;
  storeName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inventoryAdjustmentNewDetails?: any;
};
export type ADD_UPDATE_INVENTORY_ADJUSTMENT_NEW = {
  code?: string;
  id?: string;
  inventoryAdjustmentNewDetails?: INVENTORY_ADJUSTMENT_DETAIL;
};

export type IrowFormat = {
  purchaseUom?: string | number;
  productType?: string | number;
  quantity?: string | number;
  unitCost?: string | number;
  totalCost?: string | number;
  documentReference?: string | number;
  remarks?: string | number;
};

export type INVENTORY_ADJUSTMENT_NEW_DETAILS = {
  code?: string;
  inventoryAdjustmentNewName?: string;
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
  inventoryAdjustmentNewDetails?: Array<ADD_INVENTORY_ADJUSTMENT_NEW>;
  id?: string;
  name?: string;
};
