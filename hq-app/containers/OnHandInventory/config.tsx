import type { ICellRendererParams } from 'ag-grid-community';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCode = (data: { [x: string]: { code: string }; productType: any }) => {
  const productType = ProductsTypes[data?.productType];
  return data[productType]?.code ?? '-';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getName = (data: { [x: string]: { name: string }; productType: any }) => {
  const productType = ProductsTypes[data?.productType];
  return data[productType]?.name ?? '-';
};
export const columnDefsForAll = [
  {
    headerName: '',
    field: 'zero',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Code',
    field: 'product.code',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return getCode(data);
    },
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Name',
    field: 'product.name',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return getName(data);
    },
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Purchase UOM',
    field: 'purchaseUom.name',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.purchaseUom?.name ?? '-';
    },
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Product Type',
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
    headerName: 'Running Average Cost',
    field: 'runningAverage',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Quantity',
    field: 'totalAvailable',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Total Cost',
    field: 'costAmount',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Store',
    field: 'storeName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data.storeName ?? '-';
    },
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
];

export const columnDefs = [
  {
    headerName: '',
    field: '',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Ingredient Code',
    field: 'product.code',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return getCode(data);
    },
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Ingredient Name',
    field: 'product.name',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return getName(data);
    },
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Purchase UOM',
    field: 'purchaseUom.name',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.purchaseUom?.name ?? '-';
    },
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Running Average Cost',
    field: 'runningAverage',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Quantity',
    field: 'totalAvailable',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'On-Hand Cost',
    field: 'costAmount',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Store',
    field: 'storeName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data.storeName ?? '-';
    },
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
];

export const columnDefsForModifiers = [
  {
    headerName: '',
    field: '',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    maxWidth: 49,
  },

  {
    headerName: 'Modifier Name',
    field: 'modifier.name',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.modifierValue?.name ?? '-';
    },
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Purchase UOM',
    field: 'purchaseUom.name',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.purchaseUom?.name ?? '-';
    },
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Running Average Cost',
    field: 'runningAverage',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Quantity',
    field: 'totalAvailable',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Total Cost',
    field: 'costAmount',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Store',
    field: 'storeName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data.storeName ?? '-';
    },
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
];

export const ProductsTypes: Product = {
  0: 'poduct',
  1: 'ingredient',
  2: 'ingredient',
  3: 'modifierValue',
};

type Product = { [key: number]: 'poduct' | 'ingredient' | 'modifierValue' };
