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
  kitDetails: KIT_DETAILS
};

export type KIT_DETAILS = {
  code: string;
  kitName: string;
  itemGroupId: string;
  itemGroupName: string;
  status: 0 | 1;
  approvalStatus: 0 | 1;
  activeFrom: Date;
  activeTo: Date;
  standardCost: string;
  totalRetailPrice: string;
  purchaseTaxGroupId: string;
  purchaseTaxGroupName: string;
  saleTaxGroupId: string;
  saleTaxGroupName: string;
  kitDetails: Array<any>;
  id: 2;
};
