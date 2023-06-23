import type { ICellRendererParams } from 'ag-grid-community';
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
    headerName: 'Customer ID',
    field: 'code',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Customer Name',
    field: 'name',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const name = `${data?.firstName ?? ''}  ${data?.lastName ?? ''}`;
      return name;
    },
    resizable: true,
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

  // {
  //   headerName: 'Alternate Mobile Number',
  //   field: 'alternatePhoneNumber',
  //   cellRenderer: ({ data }: ICellRendererParams) => {
  //     const alternatePhoneNumber = data?.alternatePhoneNumber
  //       ? data?.alternatePhoneNumber
  //       : '-';
  //     return alternatePhoneNumber;
  //   },
  //   sortable: true,
  //   filter: 'agTextColumnFilter',
  //   resizable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  // },
  {
    headerName: 'Email Address',
    field: 'email',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,

    filterParams: {
      buttons: ['reset'],
    },
  },
  // {
  //   headerName: 'Delivery Address 1',
  //   field: 'address',
  //   cellRenderer: ({ data }: ICellRendererParams) => {
  //     const address = data?.address ? data?.address : '-';
  //     return address;
  //   },
  //   sortable: true,
  //   filter: 'agTextColumnFilter',
  //   resizable: true,
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  // },
  {
    headerName: 'Address',
    field: 'customerAddress',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const address = data?.customerAddress?.address;
      return address;
    },
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Payment Method',
    field: 'paymentMethod',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      const paymentMethod = data?.paymentMethod;
      const StoreType =
        paymentMethod && paymentMethod === 1
          ? 'COD'
          : paymentMethod === 2
          ? 'Debit'
          : paymentMethod === 3
          ? 'Credit'
          : '-';
      return StoreType;
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Special Instructions',
    field: 'specialInstruction',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const specialInstruction = data?.specialInstruction
        ? data?.specialInstruction
        : '-';
      return specialInstruction;
    },
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,

    filterParams: {
      buttons: ['reset'],
    },
  },
];

export const tabsConfiguration = (props: CUSTOMER_DETAILS) => {
  const {
    activeTab,
    paymentMethod,
    specialInstruction,
    firstName,
    lastName,
    lifeTimeOrderSummary,
    customerAddress,
    orderHistory,
    phoneNumber,
    email,
    getOrderByCustomer,
  } = props;
  return [
    {
      id: 'customer',
      label: 'General',
      classes: activeTab === 'customer' ? 'active' : '',
      actions: false,
      type: 'both',
      CustomTitleComponent: () => (
        <div className="friday-card-header justify-content-start">
          <h2 className="friday-card-title">Recent Orders</h2>
          <button
            className="friday-btn-primary outline-btn small-btn font-medium "
            style={{ height: '20px', marginLeft: '10px' }}
            type="button"
            onClick={getOrderByCustomer}
          >
            View ALL
          </button>
        </div>
      ),
      dataRows: orderHistory?.length ? orderHistory : [],
      tableData: [
        {
          name: 'Customer Name',
          value: `${firstName ?? ''}  ${lastName ?? ''}`,
        },
        {
          name: 'Mobile Number',
          value: phoneNumber,
        },
        {
          name: 'Email',
          value: email,
        },

        { name: 'Special Instruction', value: specialInstruction ?? '-' },
        {
          name: 'Payment Method',
          value:
            paymentMethod && paymentMethod === 1
              ? 'COD'
              : paymentMethod === 2
              ? 'Debit'
              : paymentMethod === 3
              ? 'Credit'
              : '-',
        },
        { name: 'Lifetime Order Summary', value: lifeTimeOrderSummary ?? '-' },
      ],
      columnDefs: [
        {
          headerName: 'Order ID',
          field: 'code',
          filter: false,
        },
        {
          headerName: 'Store',
          field: 'storeName',
          filter: false,
        },
        {
          headerName: 'Subtotal',
          field: 'grossAmount',
          filter: false,
        },

        {
          headerName: 'Discount',
          field: 'totalDiscount',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const result = data?.orderPayments?.reduce(
              (p: number, c: { discount: number }) => {
                p += c?.discount;
                return p;
              },
              0,
            );
            return result ?? 0;
          },
          filter: false,
        },
        {
          headerName: 'Tax',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const result = data?.orderPayments?.reduce(
              (p: number, c: { tax: number }) => {
                p += c?.tax;
                return p;
              },
              0,
            );
            return result ?? 0;
          },
          field: 'sizeName',
          filter: false,
        },
        {
          headerName: 'Total',
          field: 'netAmount',
          filter: false,
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
      tableData: [customerAddress],
      dataRows: customerAddress?.length ? customerAddress : [],
      columnDefs: [
        {
          headerName: 'Address',
          field: 'address',
          filter: false,
        },
        {
          headerName: 'Country',
          field: 'country',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const country = data?.country?.name ? data?.country?.name : '-';
            return country;
          },
          filter: false,
        },
        {
          headerName: 'State',
          field: 'state',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const state = data?.state?.name ? data?.state?.name : '-';
            return state;
          },
          filter: false,
        },

        {
          headerName: 'City',
          field: 'city',
          cellRenderer: ({ data }: ICellRendererParams) => {
            const city = data?.city?.name ? data?.city?.name : '-';
            return city;
          },
          filter: false,
        },

        {
          headerName: 'Contact Number',
          field: 'contactNumber',
          filter: false,
        },
        {
          headerName: 'Email',
          field: 'email',
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
      type: 'table',
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
