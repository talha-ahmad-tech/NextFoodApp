/* eslint-disable @typescript-eslint/no-explicit-any */
export type ADD_PRODUCTS_FINISHEDPRODUCT_TYPE = {
  code?: string;
  kitName?: string;
  itemGroupId?: string | number;
  activeFrom?: Date;
  activeTo?: Date;
  standardCost?: string;
  totalRetailPrice?: string;
  purchaseTaxGroupId?: string | number;
  saleTaxGroupId?: string;
  kitDetails?: string;
};

export type IFINISHEDPRODUCTRecipesLines = {
  type?: string;
  name?: string;
  status?: string;
  sellingUOM?: string;
  eatIn?: boolean;
  collection?: boolean;
  delivery?: boolean;
  unitCost?: number;
  totalCost?: number;
  quantity?: number;
  cost?: number;
  zero?: number;
};

export type IDealDeatilsLines = {
  name: string;
  quantity: number;
  cost?: number;
  zero?: number;
};

export type ADD_UPDATE_FROM_PROPS = {
  code?: string;
  id?: string;
  productsDealDetails?: FINISHEDPRODUCT_DETAILS;
};

export type FINISHEDPRODUCT_DETAILS = {
  imageUrl?: string;
  purchaseUomName?: string;
  saleUomName?: string;
  tax?: string;
  modifiersTitle?: string;
  productModifiers?: string | [];
  activeTab?: string;
  recipeType?: string;
  name?: string;
  label?: string;
  code?: number | string;
  productId?: string | number | undefined;
  productName?: string;
  description?: string;
  category?:
    | { [key: string]: string }
    | { name?: string; id?: string | number };
  itemGroup?:
    | { [key: string]: string | number }
    | { name?: string; id?: string | number };
  items?: string;
  categoryName?: string;
  categoryId?: string | number;
  itemGroupId?: string | number;
  saleUom?: any;
  purchaseUom?: any;
  saleUomId?: string;
  purchaseUomId?: string;
  cost?: number | string;
  inStorePrice?: number | string;
  deliveryPrice?: number | string;
  collectionPrice?: number | string;
  position?: string;
  modifiers?: string;
  modifiersDetail?: string;
  preparationTime?: string;
  active?: boolean;
  featuredProduct?: boolean;
  enableDiscount?: boolean;
  enableProduct?: boolean;
  uploadImage?: string;
  tenantId?: null;
  productTaxes?: string;
  productModifierDetails?: [];
  recipe?: {
    recipeDetails?: { componentStatus?: number; componentType?: number }[];
    collectionCost?: number;
    deliveryCost?: number;
    eatInCost?: number;
    recipeType?: number | string;
    outputUnit?: string;
    outputPerBatch?: number;
    id?: number | string;
    tenantId?: null;
    name?: string;
  };

  dealDetail?:
    | {
        id?: number | string;
        tenantId: null;
        startTime?: string;
        endTime?: string;
        inStorePrice: number;
        deliveyPrice: number;
        collectionPrice: number;
        dealDetailComponents: [];
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { [key: string]: any };
  outputUnit?: string | number;
  outputPerBatch?: string | number;
  //deals
  startTime?: string;
  endTime?: string;
  dealInStorePrice?: number | string;
  dealDeliveryPrice?: number | string;
  dealCollectionPrice?: number | string;
  showInsightsBy?: string;
  quantitySold?: string;

  // revenueOfAllIndividualItems,
  // profitOfAllIndividualItems,
  // revenueFromDeal,
  // profitFromDeal,
  // recipes///

  // recipesName,

  recipesCostCollection?: string;
  recipesEatInCost?: string;
  recipesDeliveryCost?: string;
  id?: number;
  productsDealDetails?: Array<FINISHEDPRODUCT_DETAILS>;
  dealDetailId?: string | number;
  recipeId?: string | number;
  categoryDetail?: number;
  productType?: string;
  itemGroupDetail?: number;
  purchaseUomDetail?: string;
  saleUomDetail?: string;
  taxDetail?: string;
};
export type IDealLines = {
  // rowData?: IDealRecipesLines[];
  // setRowData: React.Dispatch<React.SetStateAction<IDealRecipesLines[]>>;
  type?: string;
};

export type PRODUCTS_FINISHED_PRODUCT_DETAILS = {
  activeTab?: string;
  code?: string;
  productId?: string;
  productName?: string;
  description?: string;
  category?: string;
  itemGroup?: string;
  saleUOM?: string;
  purchaseUOM?: string;
  cost?: number | string;
  inStorePrice?: number | string;
  deliveryPrice?: number | string;
  collectionPrice?: number | string;
  position?: string;
  modifiers?: string;
  preparationTime?: string;
  active?: boolean;
  featuredProduct?: boolean;
  enableDiscount?: boolean;
  uploadImage?: string;

  // recipesName,

  recipesName?: string;
  recipesCostCollection?: string;
  recipesEatInCost?: string;
  recipesDeliveryCost?: string;
  recipesRecipeType?: string;
  id?: number | string;
  productsDealDetails: Array<ADD_PRODUCTS_FINISHEDPRODUCT_TYPE>;
};
