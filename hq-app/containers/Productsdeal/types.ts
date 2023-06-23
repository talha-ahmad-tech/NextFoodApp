export type ADD_PRODUCTS_DEAL_TYPE = {
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

export type IDealRecipesLines = {
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
  salePrice: number;
  tax?: number;
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
  productsDealDetails?: PRODUCTS_DEAL_DETAILS;
};

export type PRODUCTS_DEAL_DETAILS = {
  imageUrl?: string;
  purchaseUomId?: string;
  saleUomId?: string;
  purchaseUomName?: string;
  saleUomName?: string;
  tax?: string;
  modifiersTitle?: string;
  dealModifiers?: string;
  dealTaxes?: string;
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
  categoryId?: string | number;
  itemGroupId?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saleUom?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  purchaseUom?: any;
  cost?: number | string;
  inStorePrice?: number | string;
  deliveryPrice?: number | string;
  collectionPrice?: number | string;
  position?: number;
  modifiers?: string;
  preparationTime?: number;
  active?: boolean;
  featuredProduct?: boolean;
  enableDiscount?: boolean;
  enableProduct?: boolean;
  uploadImage?: string;
  tenantId?: null;
  recipe?: {
    recipeDetails?: { componentStatus?: number; componentType?: number }[];
    collectionCost?: number;
    deliveryCost?: number;
    eatInCost?: number;
    recipeType?: number;
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
  outputPerBatch?: number;
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
  productsDealDetails?: Array<PRODUCTS_DEAL_DETAILS>;
  dealDetailId?: string | number;
  recipeId?: string | number;
  categoryDetail?: number;
  productType?: string;
  itemGroupDetail?: number;
  purchaseUomDetail?: string;
  saleUomDetail?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taxDetail?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taxDefaults?: any[] | string;
};
export type IDealLines = {
  // rowData?: IDealRecipesLines[];
  // setRowData: React.Dispatch<React.SetStateAction<IDealRecipesLines[]>>;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pinnedBottomRowData?: any;
};
