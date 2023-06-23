export const FormFormModel = {
  formId: 'kit',
  formField: {
    productId: {
      name: 'productId',
      label: 'Product ID',
      requiredErrorMsg: 'Product ID is required',
    },
    productName: {
      name: 'productName',
      label: 'Product Name',
      requiredErrorMsg: 'Product is required',
    },

    description: {
      name: 'description',
      label: 'Description',
      requiredErrorMsg: 'Item Group is required',
    },
    categoryId: {
      name: 'categoryId',
      label: 'Category',
      requiredErrorMsg: 'Category From is required',
    },
    categoryDetail: {
      name: 'categoryDetail',
      requiredErrorMsg: 'Category From is required',
    },
    categoryName: {
      name: 'categoryName',
      requiredErrorMsg: 'Category From is required',
    },
    productType: {
      name: 'productType',
      label: 'Product Type',
      requiredErrorMsg: 'Product Type is required',
    },
    itemGroupId: {
      name: 'itemGroupId',
      label: 'Item Group',
      requiredErrorMsg: 'Item Group is Required',
    },
    itemGroupDetail: {
      name: 'itemGroupDetail',
      requiredErrorMsg: 'Item Group is Required',
    },
    items: {
      name: 'items',
      requiredErrorMsg: 'Item Group is Required',
    },
    purchaseUom: {
      name: 'purchaseUom',
      label: 'Purchase UOM',
      requiredErrorMsg: 'Purchase UOM is required',
    },
    purchaseUomName: {
      name: 'purchaseUomName',
    },
    saleUomName: {
      name: 'saleUomName',
    },
    purchaseUomDetail: {
      name: 'purchaseUomDetail',
      requiredErrorMsg: 'Purchase UOM is required',
    },
    saleUom: {
      name: 'saleUom',
      label: 'Sale UOM',
      requiredErrorMsg: 'Sale UOM is required',
    },

    saleUomDetail: {
      name: 'saleUomDetail',
      requiredErrorMsg: 'Sale UOM is required',
    },
    cost: {
      name: 'cost',
      label: 'Cost',
      requiredErrorMsg: 'Cost is required',
    },

    inStorePrice: {
      name: 'inStorePrice',
      label: 'In-store Price',
      requiredErrorMsg: 'In-store Price is required',
    },

    collectionPrice: {
      name: 'collectionPrice',
      label: 'Collection Price',
      requiredErrorMsg: 'Collection Price is required',
    },
    deliveryPrice: {
      name: 'deliveryPrice',
      label: 'Delivery Price',
      requiredErrorMsg: 'Delivery Price is required',
    },

    modifiers: {
      name: 'modifiers',
      label: 'Modifiers',
      requiredErrorMsg: 'Modifiers is required',
    },
    modifiersDetail: {
      name: 'modifiersDetail',
      requiredErrorMsg: 'Modifiers is required',
    },
    modifiersTitle: {
      name: 'modifiersTitle',
    },
    position: {
      name: 'position',
      label: 'Position',
      requiredErrorMsg: 'Position is required',
    },
    preparationTime: {
      name: 'preparationTime',
      label: 'Preparation Time(Minutes)',
      requiredErrorMsg: 'Preparation Time(minutes) is required',
    },
    tax: {
      name: 'tax',
      label: 'Tax',
      requiredErrorMsg: 'Tax is required',
    },
    taxDetail: {
      name: 'taxDetail',
      requiredErrorMsg: 'Tax is required',
    },
    active: {
      name: 'active',
      label: 'Active',
      requiredErrorMsg: 'Active is required',
    },
    enableDiscount: {
      name: 'enableDiscount',
      label: 'Enable Discount',
      requiredErrorMsg: 'Enable Discount is required',
    },

    featuredProduct: {
      name: 'featuredProduct',
      label: 'Featured Product',
      requiredErrorMsg: 'Featured Product is required',
    },
    imageUrl: {
      name: 'imageUrl',
      label: 'Upload Image',
      requiredErrorMsg: 'Upload Image',
    },

    /////////////deals
    startTime: {
      name: 'startTime',
      label: 'Deal Start Time',
      requiredErrorMsg: 'Deal Start Time is required',
    },
    endTime: {
      name: 'endTime',
      label: 'Deal End Time',
      requiredErrorMsg: 'Deal End Time is required',
    },

    dealInStorePrice: {
      name: 'dealInStorePrice',
      label: 'In-store Price',
      requiredErrorMsg: 'In-store Price is required',
    },
    dealDeliveryPrice: {
      name: 'dealDeliveryPrice',
      label: 'Delivery Price',
      requiredErrorMsg: 'Delivery Price is required',
    },
    dealCollectionPrice: {
      name: 'dealCollectionPrice',
      label: 'Collection Price',
      requiredErrorMsg: 'Collection Price is required',
    },

    /// deal insights
    showInsightsBy: {
      name: 'showInsightsBy',
      label: 'Show Insights By ',
      requiredErrorMsg: 'Show Insights By  is required',
    },
    dealPrice: {
      name: 'dealPrice',
      label: 'Deal Price',
      requiredErrorMsg: 'Deal Price is required',
    },
    costOfAllIndividualItems: {
      name: 'costOfAllIndividualItems',
      label: 'Cost Of All Individual Items',
      requiredErrorMsg: 'Cost Of All Individual Items is required',
    },
    priceOfAllIndividualItems: {
      name: 'priceOfAllIndividualItems',
      label: 'Price Of all Individual Items',
      requiredErrorMsg: 'Price Of all Individual Items is required',
    },

    quantitySold: {
      name: 'quantitySold',
      label: 'Quantity Sold(Deal)',
      requiredErrorMsg: 'Quantity Sold is required',
    },
    revenueOfAllIndividualItems: {
      name: 'revenueOfAllIndividualItems',
      label: 'Revenue Individual Items',
      requiredErrorMsg: 'Revenue Individual Items is required',
    },

    profitOfAllIndividualItems: {
      name: 'profitOfAllIndividualItems',
      label: 'Profit of all Individual Items',
      requiredErrorMsg: 'Profit of all Individual Items is required',
    },

    revenueFromDeal: {
      name: 'revenueFromDeal',
      label: 'Revenue from Deal',
      requiredErrorMsg: 'Revenue From Deal is required',
    },
    profitFromDeal: {
      name: 'profitFromDeal',
      label: 'Profit from Deal',
      requiredErrorMsg: 'Profit From Deal is required',
    },
    /// Recipes/////
    recipesName: {
      name: 'recipesName',
      label: 'Name',
      requiredErrorMsg: 'Name is required',
    },
    recipesCostCollection: {
      name: 'recipesCostCollection',
      label: 'Cost Collection',
      requiredErrorMsg: 'Cost Collection is required',
    },
    recipesEatInCost: {
      name: 'recipesEatInCost',
      label: 'Eat In Cost',
      requiredErrorMsg: 'Eat In Cost is required',
    },
    recipesDeliveryCost: {
      name: 'recipesDeliveryCost',
      label: 'Delivery Cost',
      requiredErrorMsg: 'Delivery Cost is required',
    },
    recipeType: {
      name: 'recipeType',
      label: 'Recipe Type',
      options: [
        {
          label: 'Batch Recipe',
          name: 'Batch Recipe',
          value: 0,
          id: 0,
        },
        {
          label: 'Menu Recipe',
          name: 'Menu Recipe',
          value: 1,
          id: 1,
        },
      ],
    },
    productModifiers: {
      name: 'productModifiers',
    },
  },
};
