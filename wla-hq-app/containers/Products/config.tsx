import CustomSwitchRenderer from '@fridayfood/shared/components/CustomSwitchButton';
import type { ICellRendererParams } from 'ag-grid-community';
import { DEAL_DETAILS, FINISHED_PRODUCTS_DETAILS } from './types';
import moment from 'moment';
import amountFormatter from '@/utils/helper';
import { SwitchButton } from '@fridayfood/ui-toolkit';

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
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Item Group',
    field: 'itemGroup.name',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.itemGroup?.name ?? '-';
    },
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
  },
  {
    headerName: 'Status',
    field: 'active',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.active ? 'Active' : 'inactive';
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
    cellRenderer: () => {
      return 'Finished Product';
    },
    resizable: true,
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
    cellRenderer: ({ data }: ICellRendererParams) => {
      return amountFormatter(data?.inStorePrice);
    },
  },
  {
    headerName: 'Delivery Price',
    field: 'deliveryPrice',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return amountFormatter(data?.deliveryPrice);
    },
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
    cellRenderer: ({ data }: ICellRendererParams) => {
      return amountFormatter(data?.collectionPrice);
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
];

export const tabsConfigurationFinishedProduct = ({
  code = '',
  name = '',
  description = '',
  category = { name: '' },
  itemGroup = { name: '' },
  preparationTime,
  purchaseUom = '',
  saleUom = '',
  inStorePrice,
  collectionPrice,
  deliveryPrice,
  position,
  cost,
  active,
  featuredProduct,
  enableDiscount,
  productModifier = [{ name: '', id: 0 }],

  activeTab = '',
}: FINISHED_PRODUCTS_DETAILS) => {
  const modifier = productModifier.map((item: { name: string; id: number }) => {
    return item?.name;
  });

  return [
    {
      id: 'general',
      label: 'General',
      classes: activeTab === 'general' ? 'active' : '',
      actions: false,
      type: 'table',
      tableData: [
        { name: 'Product ID', value: code ?? '-' },
        { name: 'Product Name', value: name ?? '-' },
        { name: 'Description', value: description ? description : '-' },
        {
          name: 'Item Group',
          value: itemGroup?.name ? itemGroup?.name : '-',
        },

        { name: 'Category', value: category?.name ? category?.name : '-' },
        { name: 'Sale UOM', value: saleUom ? saleUom : '-' },
        {
          name: 'In-Store Price',
          value: amountFormatter(inStorePrice) ?? '-',
        },
        {
          name: 'Collection Price',
          value: amountFormatter(collectionPrice) ?? '-',
        },
        {
          name: 'Delivery Price',
          value: amountFormatter(deliveryPrice) ?? '-',
        },
        {
          name: 'Modifiers',
          value: modifier.length ? modifier.join(',') : '-',
        },

        { name: 'Position', value: position },
        { name: 'Active', value: active ? 'Yes' : 'No' },
        { name: 'Preparation Time(Minutes)', value: preparationTime ?? '-' },
        { name: 'Featured Product', value: featuredProduct ? 'Yes' : 'No' },
        { name: 'Enabled Discount', value: enableDiscount ? 'Yes' : 'No' },
        { name: 'Uploaded Image', value: '-' },
      ],
      image: {},
    },
  ];
};

export const tabsConfigurationDeals = ({
  externalId = '',
  name = '',
  itemGroup = {},
  description = '',
  category = {},
  purchaseUom,
  saleUom,
  cost,
  inStorePrice,
  collectionPrice,
  deliveryPrice,
  position,
  active,
  preparationTime,
  featuredProduct,
  enableProduct,
  code,
  activeTab = '',
  dealModifier = [{ name: '', id: 0 }],
  dealPrices,

  dealDetails = {
    endTime: '',
    startTime: '',
    inStorePrice: 0,
    deliveryPrice: 0,
    deliveyPrice: 0,
    collectionPrice: 0,
    dealDetailComponent: [],
  },
}: DEAL_DETAILS) => {
  const modifier = dealModifier.map((item: { name: string; id: number }) => {
    return item?.name ?? null;
  });
  const total = dealDetails?.dealDetailComponent?.reduce(
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
      actions: false,
      type: 'table',
      tableData: [
        { name: 'Product ID', value: code ?? '-' },
        { name: 'Product Name', value: name ?? '-' },
        { name: 'Description', value: description ? description : '-' },
        { name: 'Category', value: category?.name ? category?.name : '-' },
        {
          name: 'Item Group',
          value: itemGroup?.name ? itemGroup?.name : '-',
        },
        { name: 'Sale UOM', value: saleUom ? saleUom : '-' },
        { name: 'In-Store Price', value: amountFormatter(inStorePrice) },
        {
          name: 'Collection Price',
          value: amountFormatter(collectionPrice),
        },
        { name: 'Delivery Price', value: amountFormatter(deliveryPrice) },
        {
          name: 'Modifiers',
          value: modifier.length ? modifier.join(',') : '-',
        },

        { name: 'Position', value: position },
        { name: 'Active', value: active ? 'Yes' : 'No' },
        {
          name: 'Preparation Time(Minutes)',
          value: `${preparationTime} minutes`,
        },
        { name: 'Featured Product', value: featuredProduct ? 'Yes' : 'No' },
        { name: 'Enabled Discount', value: enableProduct ? 'Yes' : 'No' },
        { name: 'Uploaded Image', value: '-' },
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
          value: moment(dealDetails?.startTime).format('MM/DD/YYYY'),
        },
        {
          name: 'Deal End Time',
          value: moment(dealDetails?.endTime).format('MM/DD/YYYY'),
        },
      ],
      dataDetail: dealPrices,
      pinnedBottomRowForDeals: pinnedBottomRowForDeals,
      dataRows: dealDetails?.dealDetailComponent,
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
                {data.productId && (
                  <SwitchButton
                    label={''}
                    isDisabled
                    errorMessage={''}
                    checked={data.isInStore ?? false}
                    value={data.isInStore ?? false}
                    isFullWidth
                    onChange={undefined}
                  />
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
                {data.productId && (
                  <SwitchButton
                    label={''}
                    isDisabled
                    errorMessage={''}
                    checked={data.isDelivery ?? false}
                    value={data.isDelivery ?? false}
                    isFullWidth
                    onChange={undefined}
                  />
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
                {data.productId && (
                  <SwitchButton
                    label={''}
                    isDisabled
                    errorMessage={''}
                    checked={data.isCollection ?? false}
                    value={data.isCollection ?? false}
                    isFullWidth
                    onChange={undefined}
                  />
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
//       actions: false,
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
