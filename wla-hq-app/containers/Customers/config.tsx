import amountFormatter, { timeFormatter } from '@/utils/helper';
import type { ICellRendererParams } from 'ag-grid-community';
import moment from 'moment';
import { CUSTOMER_DETAILS } from './types';
export const columnDefs = [
  {
    headerName: '',
    field: '',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 49,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Guest User ',
    field: 'isGuest',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.isGuest == true ? 'Yes' : 'No';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Customer Name',
    field: 'firstName',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return `${data?.firstName ?? ''} ${data?.lastName ?? '-'}`;
    },
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Mobile Number',
    field: 'phoneNumber',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Email Address',
    field: 'email',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.email ?? '-';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Loyal User ',
    field: 'isLoyal',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.isLoyal == true ? 'Yes' : 'No';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Delivery Address ',
    field: 'address',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.address ?? '-';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Special Instructions',
    field: 'specialInstruction',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.specialInstruction ?? '-';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Points',
    field: 'points',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return amountFormatter(data?.points);
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
];

export const tabsConfiguration = (props: CUSTOMER_DETAILS) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    address,
    specialInstruction,

    genderValue,
    totalSpent,
    orderHistory,
    customerHistory,
    activeTab,
  } = props;

  return [
    {
      id: 'customer',
      label: 'General',
      classes: activeTab === 'customer' ? 'active' : '',
      actions: false,
      type: 'table',
      tableData: [
        { name: 'Customer Name', value: `${firstName} ${lastName}` },
        { name: 'Special Instruction', value: specialInstruction ?? '-' },
        { name: 'Gender', value: genderValue ?? '-' },
        { name: 'Phone Number', value: phoneNumber ?? '-' },
        { name: 'email', value: email ?? '-' },
        {
          name: 'Lifetime Order Summary',
          value: `Total Spent: ${amountFormatter(totalSpent)}`,
        },
      ],
      image: {},
    },
    {
      id: 'address',
      label: 'Address',
      classes: activeTab === 'address' ? 'active' : '',
      actions: false,
      type: 'grid',
      tableData: [address],
      dataRows: address,
      columnDefs: [
        {
          headerName: 'Label',
          field: 'name',
          filter: false,
        },
        {
          headerName: 'Address',
          field: 'address',
          filter: false,
          width: 400,
        },
        {
          headerName: 'Coordinates',
          field: 'latitude',
          filter: false,
          width: 400,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return `Latitude: ${data?.latitude},
               Longitude: ${data?.longitude}`;
          },
        },
        {
          headerName: 'Defaul Address',
          field: 'isDefault',
          filter: false,
          width: 400,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.isDefault ? 'Yes' : 'No';
          },
        },
      ],
      image: {},
    },
    {
      id: 'orderHistory',
      label: 'Order History',
      classes: activeTab === 'orderHistory' ? 'active' : '',
      actions: false,
      type: 'grid',
      tableData: [orderHistory],
      dataRows: orderHistory,
      columnDefs: [
        {
          headerName: 'Order Code',
          field: 'code',
          filter: false,
        },
        {
          headerName: 'Store',
          field: 'store.name',
          filter: false,
        },
        {
          headerName: 'Order Type',
          field: 'orderTypeValue',
          filter: false,
        },
        {
          headerName: 'Delivery Address',
          field: 'orderDelivery.address',
          filter: false,
        },

        {
          headerName: 'Status',
          field: 'orderStatus',
          filter: false,
        },
        // {
        //   headerName: 'Quantiy',
        //   field: 'orderProducts',
        //   filter: false,
        //   cellRenderer: ({ data }: ICellRendererParams) => {
        //     const quantities = data?.orderProducts?.map(
        //       (item: { quantity: number }) => {
        //         return amountFormatter(item.quantity);
        //       },
        //     );
        //     return quantities?.join();
        //   },
        // },

        {
          headerName: 'Discount',
          field: 'orderPayments',
          filter: false,
          cellRenderer: ({ data }: ICellRendererParams) => {
            const discounts = data?.orderPayments?.map(
              (item: { discount: number }) => {
                return amountFormatter(item.discount);
              },
            );
            return discounts?.join();
          },
        },
        {
          headerName: 'Tax',
          field: 'orderPayments',
          filter: false,
          cellRenderer: ({ data }: ICellRendererParams) => {
            const taxes = data?.orderPayments?.map((item: { tax: number }) => {
              return amountFormatter(item.tax);
            });
            return taxes?.join();
          },
        },

        {
          headerName: 'Total',
          field: 'orderPayments',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const taxes = data?.orderPayments?.map(
              (item: { totalAmount: number }) => {
                return amountFormatter(item.totalAmount);
              },
            );
            return taxes?.join();
          },
          filter: false,
        },
      ],
      image: {},
    },
    {
      id: 'customerLoyaltyHistory',
      label: 'Loyalty History',
      classes: activeTab === 'customerLoyaltyHistory' ? 'active' : '',
      actions: false,
      type: 'grid',
      tableData: [customerHistory],
      dataRows: customerHistory,
      columnDefs: [
        {
          headerName: 'Date',
          field: 'creationTime',
          filter: false,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return moment(data?.creationTime).format('MM/DD/YYYY');
          },
        },
        {
          headerName: 'Time',
          field: 'creationTime',
          filter: false,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return timeFormatter(data?.creationTime);
          },
        },
        {
          headerName: 'Order Code',
          field: 'order.code',
          filter: false,
        },
        {
          headerName: 'Store',
          field: 'order.store.name',
          filter: false,
        },
        {
          headerName: 'Value',
          field: 'value',
          filter: false,
        },

        {
          headerName: 'Points',
          field: 'points',
          filter: false,
        },
        {
          headerName: 'Status',
          field: 'status',
          filter: false,
        },
      ],
      image: {},
    },
  ];
};

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
