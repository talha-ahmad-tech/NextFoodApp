import amountFormatter, { GetLocalDate, GetLocalTime } from '@/utils/helper';
import type { ICellRendererParams } from 'ag-grid-community';
function insertSpaces(s: string) {
  s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
  s = s.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  return s;
}
export const columnDefs = [
  {
    headerName: '',
    field: 'all',
    filter: false,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 40,
  },
  {
    headerName: 'Date',
    field: 'date',
    cellRenderer: ({ data }: ICellRendererParams) => GetLocalDate(data?.date),
    sortable: true,

    filterParams: {
      buttons: ['reset'],
    },
    minWidth: 180,
  },

  {
    headerName: 'Time',
    field: 'time',
    cellRenderer: ({ data }: ICellRendererParams) => GetLocalTime(data?.date),
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    minWidth: 180,
  },
  {
    headerName: 'Order #',
    field: 'orderNumber',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => data?.orderNumber ?? '-',

    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Receipt #',
    field: 'receiptNumber',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => data?.receiptNumber ?? '-',

    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Customer',
    field: 'customerName',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) =>
      data?.customerName ? insertSpaces(data?.customerName) : '-',

    resizable: true,
    minWidth: 180,
  },

  {
    headerName: 'Net Amount',
    field: 'netAmount',
    cellRenderer: ({ data }: ICellRendererParams) =>
      amountFormatter(data?.netAmount ?? 0),
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Discount',
    field: 'discount',
    cellRenderer: ({ data }: ICellRendererParams) =>
      amountFormatter(data?.discount ?? 0),
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Tax Amount',
    field: 'taxAmount',
    cellRenderer: ({ data }: ICellRendererParams) =>
      amountFormatter(data?.taxAmount ?? 0),
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Gross Amount',
    field: 'grossAmount',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) =>
      amountFormatter(data?.grossAmount ?? 0),
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Discount Reason',
    field: 'discountReason',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) =>
      data?.discountReason ?? '-',

    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Payment Method',
    field: 'paymentMethodName',
    cellRenderer: ({ data }: ICellRendererParams) =>
      data?.paymentMethodName ?? '-',

    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Order Type',
    field: 'orderType',
    cellRenderer: ({ data }: ICellRendererParams) => data?.orderType ?? '-',

    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Order Status',
    field: 'orderStatus',
    cellRenderer: ({ data }: ICellRendererParams) => data?.orderStatus ?? '-',

    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Store',
    field: 'storeName',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => data?.storeName ?? '-',

    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Store Terminal',
    field: 'storeTerminal',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => data?.storeTerminal ?? '-',

    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Order Source',
    field: 'orderSource',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => data?.orderSource ?? '-',

    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Delivery Charges',
    field: 'deliveyCharges',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 180,
    cellRenderer: ({ data }: ICellRendererParams) =>
      data?.deliveyCharges ?? '-',
  },
  {
    headerName: 'Order Notes',
    field: 'notes',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => data?.notes ?? '-',

    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Re-Print Count',
    field: 'reprintCount',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => data?.reprintCount ?? '-',

    resizable: true,
    minWidth: 180,
  },
  {
    headerName: 'Employee Name',
    field: 'employeeName',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    cellRenderer: ({ data }: ICellRendererParams) => data?.employeeName ?? '-',

    resizable: true,
    minWidth: 180,
  },
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
