import { defDate } from '@/utils/helper';
import type { ICellRendererParams } from 'ag-grid-community';
export const columnDefs = [
  {
    headerName: '#',
    field: 'all',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    width: 49,
  },
  {
    headerName: 'Date',
    field: 'date',
    cellRenderer: ({ data }: ICellRendererParams) => defDate(data?.date),
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Time',
    field: 'time',
    cellRenderer: ({ data }: ICellRendererParams) => defDate(data?.date),
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Order #',
    field: 'order',
    sortable: true,
    resizable: true,

  },
  {
    headerName: 'Receipt #',
    field: 'receipt',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Customer',
    field: 'customer',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Product Name',
    field: 'product',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Catgory',
    field: 'category',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Product Type',
    field: 'productType',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Quantity',
    field: 'quantity',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Net Amount',
    field: 'net',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Discount',
    field: 'discount',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Tax Amount',
    field: 'tax',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Gross Amount',
    field: 'gross',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  // {
  //   headerName: 'Discount Reason',
  //   field: 'reason',
  //   sortable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  //   resizable: true,
  // },
  // {
  //   headerName: 'Payment Method',
  //   field: 'paymentMethod',
  //   sortable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  //   resizable: true,
  // },
  // {
  //   headerName: 'Order Type',
  //   field: 'orderType',
  //   sortable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  //   resizable: true,
  // },
  // {
  //   headerName: 'Order Status',
  //   field: 'orderStatus',
  //   sortable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  //   resizable: true,
  // },
  // {
  //   headerName: 'Store',
  //   field: 'store',
  //   sortable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  //   resizable: true,
  // },
  // {
  //   headerName: 'Store Terminal',
  //   field: 'storeTerminal',
  //   sortable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  //   resizable: true,
  // },
  // {
  //   headerName: 'Order Source',
  //   field: 'source',
  //   sortable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  //   resizable: true,
  // },
  // {
  //   headerName: 'Employee Name',
  //   field: 'employee',
  //   sortable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  //   resizable: true,
  // },
];

export const customTabsConfiguration = ({
  linesData = [],
}: {
  linesData: [];
}) => {
  return [
    {
      id: 'lines',
      label: 'Lines',
      classes: 'active',
      actions: false,
      type: 'grid',
      tableData: [linesData],
      dataRows: linesData,
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
          headerName: 'Quantity',
          field: 'quantity',
          filter: false,
        },

        {
          headerName: 'Subtotal',
          field: 'subTotal',
          filter: false,
        },
        {
          headerName: 'Discount',
          field: 'discount',
          filter: false,
        },
        {
          headerName: 'Tax',
          field: 'tax',
          filter: false,
        },
      ],
      image: {},
    },
  ];
};
