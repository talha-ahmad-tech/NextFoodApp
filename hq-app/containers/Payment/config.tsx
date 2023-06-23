import { PAYMENT_METHOD_DETAILS } from './types';
import type { ICellRendererParams } from 'ag-grid-community';

export const columnDefs = [
  {
    headerName: '#',
    field: 'all',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Payment Method ID',
    field: 'code',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.code ? data.code : '-';
    },
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Name',
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
  },
  {
    headerName: 'Source',
    field: 'orderSourceName',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Position',
    field: 'position',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
];

const orderSourceEnum = (value: number) => {
  let order = '';
  switch (value) {
    case 1:
      order = 'WLA Web';
      break;
    case 2:
      order = 'WLA Mobile';
      break;
    case 3:
      order = 'POS';
      break;
  }
  return order;
};

export const tabsConfiguration = ({
  code = '',
  name = '',
  description = '',
  position = '',
  orderSource = '',
}: PAYMENT_METHOD_DETAILS) => {
  return [
    {
      id: 'paymentMethodDetails',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Payment Method ID', value: code ?? '-' },
        { name: 'Name', value: name ?? '-' },
        { name: 'Description', value: description ?? '-' },
        { name: 'Position', value: position ?? '-' },
        {
          name: 'Order Source',
          value: orderSourceEnum(Number(orderSource)) ?? '-',
        },
      ],
      image: {},
    },
  ];
};

export const customTabsConfiguration = ({
  PaymentDetails = [],
}: {
  PaymentDetails: [];
}) => {
  return [
    {
      id: 'lines',
      label: 'Lines',
      classes: 'active',
      actions: false,
      type: 'grid',
      tableData: [PaymentDetails],
      dataRows: PaymentDetails,
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
