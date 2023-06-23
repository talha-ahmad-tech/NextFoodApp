export type BULK_UPLOAD_PRODUCT = {
  id: number | string;
  code: string;
  name: string;
  description: string;
  categoryId: number;
  itemGroupId: number;
  saleUom: string;
  saleUomId: number;
  inStorePrice: number;
  collectionPrice: number;
  deliveryPrice: number;
  position: number;
  preparationTime: number;
  active: boolean;
  featuredProduct: boolean;
  enableProduct: boolean;
  externalId: string;
  productModifiers: [
    {
      id: number;
      productId: number;
      name: string;
      externalId: string;
      modifierId: number;
      productModifierValues: [
        {
          id: number;
          name: string;
          externalId: string;
          productModifierId: number;
          modifierValueId: number;
        },
      ];
    },
  ];
  recipe: {
    id: number;
    externalId: string;
    name: string;
    collectionCost: number;
    eatInCost: number;
    deliveryCost: number;
    outputUnit: string;
    outputPerBatch: number;
    recipeType: number;
    recipeDetails: [
      {
        id: number;
        externalId: string;
        ingredientId: number;
        modifierValueId: number;
        recipeId: number;
        componentType: number;
        name: string;
        componentStatus: 1;
        sellingUom: string;
        eatIn: boolean;
        collection: boolean;
        delivery: boolean;
        unitCost: number;
        quantity: number;
        totalCost: number;
      },
    ];
    loaderError: string;
  };
  recipeId: number;
  productTaxes: [
    {
      id: number;
      externalId: string;
      productId: number;
      taxId: number;
    },
  ];
  imageUrl: string;
  discountApplicable: boolean;
  cost: number;
};

export type DEAL_DETAILS = {
  imageUrl?: string;
  code?: string;
  externalId?: string;
  id?: string;
  name?: string;
  itemGroup?: { name?: string };
  description?: string;
  category?: { name?: string };
  purchaseUom?: string;
  saleUom?: number;
  productType?: number;
  cost?: number;
  inStorePrice?: number;
  collectionPrice?: number;
  position?: number;
  active?: boolean;
  preparationTime?: string;
  featuredProduct?: boolean;
  enableProduct?: boolean;
  deliveryPrice?: number;
  activeTab?: string;
  dealPrices?: [];
  attachment?: string;
  dealDetail?: {
    endTime?: string;
    startTime?: string;
    inStorePrice?: number;
    deliveryPrice?: number;
    deliveyPrice?: number;
    collectionPrice?: number;
    dealDetailComponents?: any;
  };
  // dealModifiers?: [{ name: string; id: number }];
  dealModifiers?: [
    {
      name: string;
      id: number;
      dealModifierValues?: { name?: string; id?: number }[];
    },
  ];
  recipe?: {
    name?: string;
    collectionCost?: number;
    eatInCost?: number;
    recipeType?: number;
    deliveryCost?: number;
    recipeDetails?: [];
  };
};

export type INGREDIENT_DETAILS = {
  imageUrl?: string;
  code?: string;
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
  imageUrl?: string;
  code?: string;
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
  active: boolean;
  collectionPrice: number;
  deliveryPrice: number;
  position: number;
  featuredProduct: boolean;
  enableDiscount: boolean;
  activeTab: string;
  preparationTime: number;
  productTaxes: [{ taxName: string | number }];

  productModifiers?: [
    {
      name: string;
      id: number;
      productModifierValues?: { name?: string; id?: number }[];
      dealModifierValues?: { name?: string; id?: number }[];
    },
  ];
  dealModifiers?: [
    {
      name: string;
      id: number;
      dealModifierValues?: { name?: string; id?: number }[];
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
