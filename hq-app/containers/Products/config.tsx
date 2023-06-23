import { ModifierButton } from './CustomButton/Modifier';
import CustomSwitchRenderer from '@fridayfood/shared/components/CustomSwitchButton';
import type { ICellRendererParams } from 'ag-grid-community';
import {
  DEAL_DETAILS,
  INGREDIENT_DETAILS,
  FINISHED_PRODUCTS_DETAILS,
} from './types';
import moment from 'moment';
import { SwitchButton } from '@fridayfood/ui-toolkit';
import { urlConverter } from '@/utils/helper';
const componentTypeEnum = (value: number) => {
  switch (value) {
    case 1:
      return 'Ingredient';
    case 2:
      return 'Packaging Material';
    case 3:
      return 'Modifier';
    default:
      null;
  }
};
const componentStatusEnum = (value: number) => {
  switch (value) {
    case 0:
      return '-';
    case 1:
      return 'Compulsory';
    case 2:
      return 'Optional';
    default:
      null;
  }
};

export const columnDefsForFinishedProducts = [
  {
    headerName: '#',
    field: 'all',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Product Name',
    field: 'name',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return (
        data?.name ?? (
          <span style={{ textAlign: 'center', width: '100%' }}>-</span>
        )
      );
    },
    minWidth: 200,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Category',
    field: 'category.name',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => {
      return (
        data?.category?.name ?? (
          <span style={{ textAlign: 'center', width: '100%' }}>-</span>
        )
      );
    },
  },

  {
    headerName: 'Item Group',
    field: 'itemGroup.name',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return (
        data?.itemGroup?.name ?? (
          <span style={{ textAlign: 'center', width: '100%' }}>-</span>
        )
      );
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Stores',
    sortable: true,
    field: 'productStores',
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRendererFramework: ({ data }: ICellRendererParams) => {
      const stores = data?.productStores?.map((s: { storeName: string }) => {
        return { name: s?.storeName };
      });

      return stores?.length > 0 ? (
        ModifierButton(stores || [])
      ) : (
        <span style={{ textAlign: 'center', width: '100%' }}>-</span>
      );
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Status',
    field: 'active',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.active ? 'Active' : 'Inactive';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Product Type',
    field: 'productType',
    sortable: true,
    filter: 'agTextColumnFilter',
    // cellRenderer: ({ data }: ICellRendererParams) => {
    //   return data?.productType === 1
    //     ? 'Ingredient'
    //     : data?.productType === 2
    //     ? 'Packaging Material'
    //     : data?.productType === 3 && 'Modifier';
    // },
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Modifier',
    field: '',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRendererFramework: ({ data }: ICellRendererParams) => {
      return !data?.dealModifiersCount && data?.productModifiers?.length > 0 ? (
        ModifierButton(data?.productModifiers || [])
      ) : (
        <span style={{ textAlign: 'center', width: '100%' }}>
          {data?.dealModifiersCount ? `+${data?.dealModifiersCount}` : '-'}
        </span>
      );
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Recipe',
    field: 'recipeId',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.recipeId ? 'Yes' : 'No';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'In-Store Price',
    field: 'inStorePrice',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Delivery Price',
    field: 'deliveryPrice',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Collection Price',
    field: 'collectionPrice',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
];
export const columnDefsForIngredients = [
  {
    headerName: '#',
    field: 'all',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Ingredient Name',
    field: 'name',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Ingredient Type',
    field: 'productType',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,

    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.productType === 1
        ? 'Ingredient'
        : data?.productType === 2
        ? 'Packaging Material'
        : data?.productType === 3 && 'Modifier';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Purchase UOM',
    field: 'purchaseUom',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Running Average Cost',
    field: '',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.runningAverageCost ? data?.runningAverageCost : '-';
    },
  },
  {
    headerName: 'Suppliers',
    field: '',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.supplier ? data?.supplier : '-';
    },
  },
];
export const columnDefsForPackagingMaterial = [
  {
    headerName: '#',
    field: 'all',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Packaging Material Name',
    field: 'name',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Description',
    field: 'description',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.description ? data?.description : '-';
    },
  },

  {
    headerName: 'Purchase UOM',
    field: 'purchaseUom',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Suppliers',
    field: 'activeStatus',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.supplier ? data?.supplier : '-';
    },
  },
];

const columnDefsForRecipies = [
  {
    headerName: 'Component Type',
    field: 'componentType',
    filter: false,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return componentTypeEnum(data?.componentType);
    },
  },
  {
    headerName: 'Component Name',
    field: 'name',
    filter: false,
  },
  {
    headerName: 'Component Status',
    field: 'componentStatus',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return componentStatusEnum(data?.componentType);
    },
    filter: false,
  },

  {
    headerName: 'Selling UOM',
    field: 'sellingUom',
    filter: false,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.sellingUom ?? '-';
    },
  },

  {
    headerName: 'Eat In',
    field: 'eatIn',
    filter: false,
    cellRenderer: CustomSwitchRenderer,
  },
  {
    headerName: 'Collection',
    field: 'collection',
    filter: false,
    cellRenderer: CustomSwitchRenderer,
  },
  {
    headerName: 'Delivery',
    field: 'delivery',
    filter: false,
    cellRenderer: CustomSwitchRenderer,
  },

  {
    headerName: 'Unit Cost',
    field: 'unitCost',
    filter: false,
  },
  {
    headerName: 'Quantity',
    field: 'quantity',
    filter: false,
  },
  {
    headerName: 'Total Cost ',
    field: 'totalCost',
    filter: false,
  },
];
export const columnDefsForModifiers = [
  {
    headerName: 'Component Type',
    field: 'componentType',
    filter: false,
    cellRenderer: () => {
      return 'Modifier';
    },
  },
  {
    headerName: 'Component Name',
    field: 'name',
    filter: false,
  },
  {
    headerName: 'Component Status',
    field: 'componentStatus',
    cellRenderer: () => {
      return '-';
    },
    filter: false,
  },

  {
    headerName: 'Selling UOM',
    field: 'sellingUom',
    cellRenderer: () => {
      return '-';
    },
    filter: false,
  },
];
export const tabsConfigurationFinishedProduct = ({
  code = '',
  name = '',
  description = '',
  category = { name: '' },
  itemGroup = { name: '' },
  // productType,
  // purchaseUom = '',
  saleUom = '',
  inStorePrice,
  collectionPrice,
  deliveryPrice,
  position,
  // cost,
  active,
  featuredProduct,
  enableDiscount,
  preparationTime,
  productTaxes = [{ taxName: '' }],

  productModifiers = [{ name: '', id: 0, productModifierValues: [] }],

  imageUrl,
  recipe = {
    name: '',
    collectionCost: 0,
    eatInCost: 0,
    recipeType: 0,
    deliveryCost: 0,
    recipeDetails: [],
  },
  activeTab = '',
}: FINISHED_PRODUCTS_DETAILS) => {
  const taxes = productTaxes.map((item: { taxName: string | number }) => {
    return item?.taxName ?? null;
  });
  const recipeData = recipe?.recipeDetails?.filter(
    (item: { [key: string]: string | number | boolean }) => {
      return item?.componentType !== 3;
    },
  );
  const modifierDetails = productModifiers?.map(
    (item: { productModifierValues?: { name?: string; id?: number }[] }) => {
      return item?.productModifierValues?.map(
        (details: { [key: string]: string | number | boolean }) => details,
      );
    },
  );

  const newDetails = modifierDetails.flat(1);

  return [
    {
      id: 'general',
      label: 'General',
      classes: activeTab === 'general' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Product ID', value: code },
        { name: 'Product Name', value: name },
        { name: 'Description', value: description ? description : '-' },
        { name: 'Category', value: category?.name ? category?.name : '-' },

        {
          name: 'Item Group',
          value: itemGroup?.name ? itemGroup?.name : '-',
        },
        { name: 'Sale UOM', value: saleUom ? saleUom : '-' },
        { name: 'In-Store Price', value: inStorePrice },
        {
          name: 'Collection Price',
          value: collectionPrice,
        },
        {
          name: 'Delivery Price',
          value: deliveryPrice,
        },
        {
          name: 'Modifiers',
          value:
            productModifiers.length && productModifiers[0]?.name
              ? productModifiers[0]?.name + `+ ${productModifiers?.length}`
              : productModifiers[0]?.productModifierValues?.length &&
                (productModifiers[0]?.productModifierValues[0 as number]
                  ?.name as string)
              ? productModifiers[0]?.productModifierValues.length &&
                (productModifiers[0]?.productModifierValues[0 as number]
                  ?.name as string) +
                  `+ ${productModifiers[0]?.productModifierValues?.length}`
              : '-',
        },
        { name: 'Position', value: position },
        { name: 'Active', value: active ? 'Yes' : 'No' },
        {
          name: 'Preparation Time(Minutes)',
          value: preparationTime ? `${preparationTime} minutes` : '-',
        },
        { name: 'Featured Product', value: featuredProduct ? 'Yes' : 'No' },
        { name: 'Tax', value: taxes.length ? taxes.join(', ') : '-' },
        { name: 'Enabled Discount', value: enableDiscount ? 'Yes' : 'No' },
        {
          name: 'Image',
          images: imageUrl ? `${urlConverter('products')} ${imageUrl}` : '',
        },
      ],
      image: {},
    },
    {
      id: 'recipies',
      label: 'Recipies',
      classes: activeTab === 'recipies' ? 'active' : '',
      actions: true,
      type: 'forProductOnly',
      tableData: [
        { name: 'Name', value: recipe?.name },
        { name: 'Collection Cost', value: recipe?.collectionCost },
        { name: 'Eat In Cost', value: recipe?.eatInCost },
        { name: 'Delivery Cost', value: recipe?.deliveryCost },
        {
          name: 'Recipe Type',
          value:
            recipe?.recipeType == 0
              ? 'Batch Recipe'
              : recipe?.recipeType == 1 && 'Menu Recipe',
        },
      ],
      dataRows: recipe?.recipeDetails,
      recipeData: recipeData,
      modifierData: newDetails,
      title1: 'Modifiers',
      title2: 'Ingredients & Packaging Material',
      columnDefsForModifiers: columnDefsForModifiers,
      columnDefs: columnDefsForRecipies,
      image: {},
    },
  ];
};

export const tabsConfigurationIngredients = ({
  code = '',
  name = '',
  description = '',
  purchaseUom = '',
  cost,
  active,
  activeTab = '',
  imageUrl = '',
}: INGREDIENT_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: activeTab === 'general' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Product ID', value: code },
        { name: 'Product Name', value: name },
        { name: 'Description', value: description ? description : '-' },
        { name: 'Purchase UOM', value: purchaseUom ? purchaseUom : '-' },
        { name: 'Cost', value: cost },
        { name: 'Active', value: active ? 'Yes' : 'No' },

        { name: 'Tax', value: '-' },
        {
          name: 'Uploaded Image',
          images: imageUrl ? urlConverter('core') + imageUrl : '',
        },
      ],
      image: {},
    },
  ];
};

export const tabsConfigurationDeals = ({
  code = '',
  name = '',
  itemGroup = {},
  description = '',
  category = {},
  // purchaseUom,
  // productType,
  saleUom,
  // cost,
  inStorePrice,
  collectionPrice,
  deliveryPrice,
  position,
  active,
  preparationTime,
  featuredProduct,
  enableProduct,
  activeTab = '',
  dealPrices,
  dealDetail = {
    endTime: '',
    startTime: '',
    inStorePrice: 0,
    deliveryPrice: 0,
    deliveyPrice: 0,
    collectionPrice: 0,
    dealDetailComponents: [],
  },
  attachment,
  dealModifiers = [{ name: '', id: 0, dealModifierValues: [] }],
}: DEAL_DETAILS) => {
  const total = dealDetail?.dealDetailComponents?.reduce(
    (
      pre: {
        componentCost: number;
        tax: number;
        salePrice: number;
        quantity: number;
        grossMargin: number;
        grossProfit: number;
      },
      cr: {
        componentCost: number;
        tax: number;
        salePrice: number;
        quantity: number;
        grossMargin: number;
        grossProfit: number;
      },
    ) => {
      return {
        componentCost: Number(pre.componentCost) + Number(cr.componentCost),
        tax: Number(pre.tax) + Number(cr.tax),
        salePrice: Number(pre.salePrice) + Number(cr.salePrice),
        quantity: Number(pre.quantity) + Number(cr.quantity),
        grossMargin: Number(pre.grossMargin) + Number(cr.grossMargin),
        grossProfit: Number(pre.grossProfit) + Number(cr.grossProfit),
      };
    },
    {
      cost: 0,
      componentCost: 0,
      salePrice: 0,
      tax: 0,
      quantity: 0,
      grossProfit: 0,
      grossMargin: 0,
    },
  );
  const pinnedBottomRowForDeals = [
    {
      componentType: 3,
      quantity: total.quantity,
      componentCost: total.componentCost,
      tax: total.tax,
      salePrice: total.salePrice,
      grossMargin: total.grossMargin,
      grossProfit: total.grossProfit,
    },
  ];
  return [
    {
      id: 'general',
      label: 'General',
      classes: activeTab === 'general' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Product ID', value: code ?? '-' },
        { name: 'Product Name', value: name },
        { name: 'Description', value: description ? description : '-' },
        { name: 'Category', value: category?.name ? category?.name : '-' },

        {
          name: 'Item Group',
          value: itemGroup?.name ? itemGroup?.name : '-',
        },
        { name: 'Sale UOM', value: saleUom ? saleUom : '-' },
        { name: 'In-Store Price', value: inStorePrice },
        {
          name: 'Collection Price',
          value: collectionPrice,
        },
        { name: 'Delivery Price', value: deliveryPrice },
        {
          name: 'Modifiers',

          value:
            dealModifiers?.length && dealModifiers[0]?.name
              ? dealModifiers[0]?.name + `+ ${dealModifiers?.length}`
              : dealModifiers[0]?.dealModifierValues?.length &&
                (dealModifiers[0]?.dealModifierValues[0 as number]
                  ?.name as string)
              ? dealModifiers[0]?.dealModifierValues.length &&
                (dealModifiers[0]?.dealModifierValues[0 as number]
                  ?.name as string) +
                  `+ ${dealModifiers[0]?.dealModifierValues?.length}`
              : '-',
        },
        { name: 'Position', value: position },
        { name: 'Active', value: active ? 'Yes' : 'No' },
        {
          name: 'Preparation Time(Minutes)',
          value: preparationTime ? `${preparationTime} minutes` : '-',
        },
        { name: 'Featured Product', value: featuredProduct ? 'Yes' : 'No' },

        { name: 'Enabled Discount', value: enableProduct ? 'Yes' : 'No' },
        {
          name: 'Uploaded Image',
          images: attachment ? urlConverter('core') + attachment : '',
        },
      ],
      image: {},
    },
    {
      id: 'dealDetails',
      label: 'Deal Insight',
      classes: activeTab === 'dealDetails' ? 'active' : '',
      actions: true,
      type: 'custom',
      topTableData: [
        {
          name: 'Deal Start Time',
          value: moment(dealDetail?.startTime).format('MM/DD/YYYY'),
        },
        {
          name: 'Deal End Time',
          value: moment(dealDetail?.endTime).format('MM/DD/YYYY'),
        },
      ],
      dataDetail: dealPrices,
      pinnedBottomRowForDeals: pinnedBottomRowForDeals,
      dataRows: dealDetail?.dealDetailComponents,
      columnDef1: [
        {
          headerName: 'Product Type',
          field: 'componentType',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.componentType === 1
              ? 'Finished Product'
              : data?.componentType === 2
              ? 'Packaging Material'
              : data?.componentType === 3 && 'Grand Total';
          },
          filter: false,
        },
        {
          headerName: 'Product ID',
          field: 'productId',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.componentType === 2
              ? data?.packagingMaterialId
              : data?.productId;
          },
          filter: false,
        },

        {
          headerName: 'Product Name',
          field: 'componentName',
          filter: false,
        },
        {
          headerName: 'Quantity',
          field: 'quantity',
          filter: false,
        },
        {
          headerName: 'Cost Price',
          field: 'componentCost',
          filter: false,
        },
        {
          headerName: 'Tax',
          field: 'tax',
          filter: false,
        },

        {
          headerName: 'Sale Price',
          field: 'salePrice',
          filter: false,
        },
        {
          headerName: 'Gross Margin',
          field: 'grossMargin',
          filter: false,
        },
        {
          headerName: 'Gross Profit',
          field: 'grossProfit',
          filter: false,
        },

        {
          headerName: 'In Store',
          field: 'isInStore',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return (
              <div className="custom-center-toggle">
                {data.productId | data.packagingMaterialId ? (
                  <SwitchButton
                    label={''}
                    isDisabled
                    errorMessage={''}
                    checked={data.isInStore ?? false}
                    value={data.isInStore ?? false}
                    isFullWidth
                    onChange={undefined}
                  />
                ) : (
                  ''
                )}
              </div>
            );
          },
          filter: false,
        },
        {
          headerName: 'Is Delivery ',
          field: 'isDelivery',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return (
              <div className="custom-center-toggle">
                {data.productId | data.packagingMaterialId ? (
                  <SwitchButton
                    label={''}
                    isDisabled
                    errorMessage={''}
                    checked={data.isDelivery ?? false}
                    value={data.isDelivery ?? false}
                    isFullWidth
                    onChange={undefined}
                  />
                ) : (
                  ''
                )}
              </div>
            );
          },
          filter: false,
        },
        {
          headerName: 'Is Collection',
          field: 'isCollection',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return (
              <div className="custom-center-toggle">
                {data.productId | data.packagingMaterialId ? (
                  <SwitchButton
                    label={''}
                    isDisabled
                    errorMessage={''}
                    checked={data.isCollection ?? false}
                    value={data.isCollection ?? false}
                    isFullWidth
                    onChange={undefined}
                  />
                ) : (
                  ''
                )}
              </div>
            );
          },
          filter: false,
        },
      ],
      columnDef2: [
        {
          headerName: 'Deal',
          field: 'dealName',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.dealName;
          },
          filter: false,
        },
        {
          headerName: 'Cost Price',
          field: 'costPrice',
          filter: false,
        },

        {
          headerName: 'Sale Price',
          field: 'salePrice',
          filter: false,
        },
        {
          headerName: 'In-Take Margin',
          field: 'inTakeMargin',
          filter: false,
        },
        {
          headerName: 'Profit',
          field: 'profit',
          filter: false,
        },
      ],
      columnDef3: [
        {
          headerName: 'Deal',
          field: 'dealName',
          filter: false,
        },
        {
          headerName: 'Cost Price',
          field: 'costPrice',
          filter: false,
        },

        {
          headerName: 'Sale Price',
          field: 'salePrice',
          filter: false,
        },
        {
          headerName: 'In-Take Margin',
          field: 'inTakeMargin',
          filter: false,
        },
        {
          headerName: 'Profit',
          field: 'profit',
          filter: false,
        },
      ],
      columnDef4: [
        {
          headerName: 'Deal',
          field: 'dealName',
          filter: false,
        },
        {
          headerName: 'Cost Price',
          field: 'costPrice',
          filter: false,
        },

        {
          headerName: 'Sale Price',
          field: 'salePrice',
          filter: false,
        },
        {
          headerName: 'In-Take Margin',
          field: 'inTakeMargin',
          filter: false,
        },
        {
          headerName: 'Profit',
          field: 'profit',
          filter: false,
        },
      ],
      image: {},
    },
  ];
};

// export const tabsConfigurationPackingMaterial = ({
//   externalId = '',
//   name = '',
//   description = '',
//   category = { name: '' },
//   itemGroup = { name: '' },
//   productType,
//   purchaseUom = '',
//   saleUom = '',
//   cost,
//   active,
//   featuredProduct,
//   enableDiscount,
//   activeTab = '',
// }: INGREDIENT_DETAILS) => {
//   return [
//     {
//       id: 'general',
//       label: 'General',
//       classes: activeTab === 'general' ? 'active' : '',
//       actions: true,
//       type: 'table',
//       tableData: [
//         { name: 'Product ID', value: externalId },
//         { name: 'Product Name', value: name },
//         { name: 'Description', value: description },
//         { name: 'Category', value: category?.name },
//         { name: 'Product Type', value: productType },
//         { name: 'Item Group', value: itemGroup.name },
//         { name: 'Purchase UOM', value: purchaseUom },
//         { name: 'Sale UOM', value: saleUom },
//         { name: 'Cost', value: cost },
//         { name: 'In-Store Price', value: 'missing' },
//         { name: 'Collection Price', value: 'missing' },
//         { name: 'Delivery Price', value: 'missing' },
//         { name: 'Modifiers', value: 'missing' },
//         { name: 'Position', value: 'missing' },
//         { name: 'Active', value: active ? 'Yes' : 'No' },
//         { name: 'Preparation Time(Minutes)', value: 'missing' },
//         { name: 'Featured Product', value: featuredProduct ? 'Yes' : 'No' },

//         { name: 'Enabled Discount', value: enableDiscount ? 'Yes' : 'No' },
//         { name: 'Uploaded Image', value: 'missing' },
//       ],
//       image: {},
//     },
//   ];
// };

export const customTabsConfiguration = ({
  kitDetails = [],
}: {
  kitDetails: [];
}) => {
  return [
    {
      id: 'lines',
      label: 'Lines',
      classes: 'active',
      actions: false,
      type: 'grid',
      tableData: [kitDetails],
      dataRows: kitDetails,
      columnDefs: [
        {
          headerName: 'Line No',
          field: 'id',
          filter: false,
        },
        {
          headerName: 'Product Id',
          field: 'productCode',
          filter: false,
        },
        {
          headerName: 'Product Name',
          field: 'productName',
          filter: false,
        },

        {
          headerName: 'Product Type',
          field: 'producttype',
          filter: false,
        },

        {
          headerName: 'Variant Name',
          field: 'varientName',
          filter: false,
        },
        {
          headerName: 'Size Name',
          field: 'sizeName',
          filter: false,
        },
        {
          headerName: 'Color Name',
          field: 'colorName',
          filter: false,
        },
        {
          headerName: 'Style',
          field: 'styleName',
          filter: false,
        },
        {
          headerName: 'Unit Cost',
          field: 'unitCost',
          filter: false,
        },
      ],
      image: {},
    },
  ];
};

export const AllColumnsDef = {
  deals: columnDefsForFinishedProducts,
  ingredients: columnDefsForIngredients,
  packagingmaterial: columnDefsForPackagingMaterial,
  finishedproduct: columnDefsForFinishedProducts,
};
