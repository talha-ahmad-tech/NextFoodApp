// export type ADD_KIT_TYPE = {
//   code: string;
//   kitName: string;
//   itemGroupId: string | number;
//   activeFrom: Date;
//   activeTo: Date;
//   standardCost: string;
//   totalRetailPrice: string;
//   purchaseTaxGroupId: string | number;
//   saleTaxGroupId: string;
//   kitDetails: string;
// };

// export type ADD_UPDATE_FROM_PROPS = {
//   code: string;
//   id: string;
//   kitDetails: KIT_DETAILS;
// };

export type DEAL_DETAILS = {
  externalId: string;
  id: string;
  name: string;
  code: string;
  itemGroup: { name?: string };
  description: string;
  category: { name?: string };
  purchaseUom: string;
  saleUom: number;
  productType: number;
  cost: number;
  inStorePrice: number;
  collectionPrice: number;
  position: number;
  active: boolean;
  preparationTime: string;
  featuredProduct: boolean;
  enableProduct: boolean;
  deliveryPrice: number;
  activeTab: string;
  dealModifier: [
    {
      name: string;
      id: number;
    },
  ];
  dealPrices: any;

  dealDetails: {
    endTime: string;
    startTime: string;
    inStorePrice: number;
    deliveryPrice: number;
    deliveyPrice: number;
    collectionPrice: number;
    dealDetailComponent: any;
  };
  recipe: {
    name: string;
    collectionCost: number;
    eatInCost: number;
    recipeType: number;
    deliveryCost: number;
    recipeDetails: [];
  };
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kitDetails: Array<any>;
  id: number | string;
  activeTab?: number | string;
};
export type INGREDIENT_DETAILS = {
  externalId: string;
  id: string;
  name: string;
  description: string;
  category: { name: string };
  itemGroup: { name: string };
  productType: number;
  purchaseUom: string;
  saleUom: string;
  cost: number;
  inStorePrice: number;
  collectionPrice: number;
  deliveryPrice: number;
  position: number;
  active: boolean;
  preparationTime: number;
  featuredProduct: boolean;
  enableDiscount: boolean;
  activeTab: string;
};

export type FINISHED_PRODUCTS_DETAILS = {
  code: string;
  id: string;
  name: string;
  description: string;
  category: { name: string };
  itemGroup: { name: string };
  productType: number;
  purchaseUom: string;
  saleUom: string;
  cost: number;
  preparationTime: number;
  inStorePrice: number;
  active: boolean;
  collectionPrice: number;
  deliveryPrice: number;
  position: number;
  featuredProduct: boolean;
  enableDiscount: boolean;
  activeTab: string;
  productModifier: [
    {
      name: string;
      id: number;
    },
  ];
  recipe: {
    name: string;
    collectionCost: number;
    eatInCost: number;
    recipeType: number;
    deliveryCost: number;
    recipeDetails: [];
  };
};

export type ItabsConfigurationIngredients = {
  code?: string;
  kitName?: string;
  itemGroupName?: string;
  activeFrom?: string;
  activeTo?: string;
  standardCost?: string;
  totalRetailPrice?: string;
  purchaseTaxGroupName?: string;
  saleTaxGroupName?: string;
  activeTab?: number | string;
  kitDetails?: [];
};
