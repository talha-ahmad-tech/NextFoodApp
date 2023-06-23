import { Icon } from '@fridayfood/shared/components/Icon';
import { STORE_DETAILS } from './types';
import type { ICellRendererParams } from 'ag-grid-community';

export const AvailableProductsColumnDefs = [
  {
    headerName: 'Product ID',
    field: 'id',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    filterParams: {
      buttons: ['reset'],
    },
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
];

export const columnDefs = (
  onAssignProd: (id: string, name: string) => void,
  onRowClick: (val: string) => void,
  generateQR: (id: string) => void,
) => {
  return [
    {
      headerName: '#',
      field: '',
      checkboxSelection: true,
      maxWidth: 49,
    },
    {
      headerName: 'Store ID',
      field: 'code',
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
      filterParams: {
        buttons: ['reset'],
      },
    },

    {
      headerName: 'Store Name',
      field: 'name',
      cellRenderer: ({ data }: ICellRendererParams) => {
        return (
          (
            <span
              className="custom-table-content"
              onClick={() => onRowClick(data?.id)}
            >
              {data?.name}
            </span>
          ) ?? '-'
        );
      },
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
      filterParams: {
        buttons: ['reset'],
      },
    },

    {
      headerName: 'Store Type',
      field: 'type',
      cellRenderer: ({ data }: ICellRendererParams) => {
        const type = data?.type;
        const StoreType =
          type && type === 1
            ? 'FastFood'
            : type === 2
            ? 'Fine Dining'
            : type === 3
            ? 'Delivery'
            : '';
        return StoreType;
      },
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
      filterParams: {
        buttons: ['reset'],
      },
    },
    {
      headerName: 'Store Address',
      field: 'address',
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
      cellRenderer: ({ data }: ICellRendererParams) => {
        return data?.address?.address ?? '-';
      },
      filterParams: {
        buttons: ['reset'],
      },
    },

    {
      headerName: 'Price Exclusive Tax',
      field: 'priceExclusiveTax',
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
      cellRenderer: ({ data }: ICellRendererParams) => {
        return Boolean(data?.priceExclusiveTax) ? 'Yes' : 'No';
      },
      filterParams: {
        buttons: ['reset'],
      },
    },
    {
      headerName: 'Active',
      field: 'active',
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
      cellRenderer: ({ data }: ICellRendererParams) => {
        return Boolean(data?.isActive) ? 'Yes' : 'No';
      },
      filterParams: {
        buttons: ['reset'],
      },
    },
    {
      headerName: 'Assigned Products',
      field: 'assignedProducts',
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
      cellRendererFramework: ({ data }: ICellRendererParams) => {
        return (
          <div className="w-100">
            <div className="left-side custom-btn-wrapper w-100">
              <button
                className="button-tree-wrapper add-vendor-group w-100"
                type="button"
                onClick={() => {
                  onAssignProd(data?.id, data?.name);
                }}
              >
                Select
                <Icon style={{ width: '10px' }} variant="plus" />
              </button>
            </div>
          </div>
        );
      },
      filterParams: {
        buttons: ['reset'],
      },
    },
    {
      headerName: 'QR Code',
      field: 'qrCode',
      resizable: true,
      cellRendererFramework: ({ data }: ICellRendererParams) => {
        return (
          <button
            className="friday-btn-primary outline-btn small-btn font-medium"
            style={{ height: '20px' }}
            type="button"
            onClick={() => generateQR(data?.id)}
          >
            Generate QR
          </button>
        );
      },
      filterParams: {
        buttons: ['reset'],
      },
    },
  ];
};
const assignedProductTab = (
  hide: boolean | undefined,
  data: [] | undefined,
  activeTab: string | undefined,
) => {
  if (!hide) {
    return {
      id: 'assignProducts',
      label: 'Assigned Products',
      classes: activeTab === 'assignProducts' ? 'active' : '',
      type: 'grid',
      tableData: [data],
      dataRows: data,
      columnDefs: [
        {
          headerName: 'Product Id',
          field: 'productId',
          filter: false,
        },
        {
          headerName: 'Product Name',
          field: 'product.name',
          filter: false,
        },
        {
          headerName: 'Description',
          field: 'product.description',
          filter: false,
        },
        {
          headerName: 'Category',
          field: 'product.category.name',
          // cellRenderer: ({ data }: ICellRendererParams) => {
          //   return data?.product?.category ?? '-';
          // },
          filter: false,
        },
        {
          headerName: 'Product Type',
          field: 'product.productType',
          filter: false,
        },
      ],
      image: {},
    };
  } else {
    return {};
  }
};

export const tabsConfiguration = (props: STORE_DETAILS) => {
  const {
    hide,
    activeTab,
    code,
    name,
    type,
    todayFilterType,
    active,
    priceExclusiveTax,
    parkEnabled,
    discountExclusiveTax,
    showMenuImages,
    currency,
    floor,
    numberSequence,
    storeAddress,
    storeTaxes,
    data,
    deliveryCharges,
    storeLogo,
    storePaymentMethods,
  } = props;
  console.log('props', props);
  const Tax = storeTaxes?.map(
    (item: { tax: { name: string } }) => item.tax.name,
  );
  const paymentMethod = storePaymentMethods?.map(
    (item: { paymentMethod: { name: string } }) => item?.paymentMethod?.name,
  );
  const Arr = [];
  Arr.push(storeAddress);

  return [
    {
      id: 'stores',
      label: 'Stores',
      classes: activeTab === 'stores' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Store Id', value: code ?? '-' },
        { name: 'Store Name', value: name },
        {
          name: 'Store Type',
          value:
            type && type === 1
              ? 'FastFood'
              : type === 2
              ? 'Fine Dining'
              : type === 3
              ? 'Delivery'
              : '',
        },
        {
          name: 'Payment Method',
          value: storePaymentMethods ? paymentMethod?.join() : '-',
        },
        {
          name: 'Today Filter Type',
          value:
            todayFilterType && todayFilterType === 1
              ? 'By Day'
              : todayFilterType === 2
              ? 'By Shift'
              : '-',
        },

        {
          name: 'Tax',
          value: storeTaxes ? Tax?.join() : '-',
        },
        {
          name: 'Number Sequence',
          value: numberSequence ?? '-',
        },
        {
          name: 'Currency',
          value: currency ? currency.name : '-',
        },

        {
          name: 'Price Exclusive Tax',
          value: priceExclusiveTax && priceExclusiveTax === true ? 'Yes' : 'No',
        },
        {
          name: 'Floor Plan',
          value:
            floor && floor === 1
              ? 'Main Hall'
              : floor === 2
              ? '1st Floor'
              : floor === 3
              ? '2nd Floor'
              : '-',
        },
        {
          name: 'Discount Exclusive Tax',
          value:
            discountExclusiveTax && discountExclusiveTax === true
              ? 'Yes'
              : 'No',
        },
        {
          name: 'Delivery Charges',
          value: deliveryCharges ? deliveryCharges : '-',
        },
        {
          name: 'Show Menu Images',
          value: showMenuImages && showMenuImages === true ? 'Yes' : 'No',
        },
        {
          name: 'Store Logo',
          value: storeLogo ? storeLogo : '-',
        },

        { name: 'Active', value: active && active === true ? 'Yes' : 'No' },
        {},
        {
          name: 'Park Enabled',
          value: parkEnabled && parkEnabled === true ? 'Yes' : 'No',
        },
      ],
      image: {},
    },
    {
      id: 'address',
      label: 'Address',
      classes: activeTab === 'address' ? 'active' : '',
      actions: true,
      type: 'grid',
      tableData: [Arr],
      dataRows: Arr,
      columnDefs: [
        {
          headerName: 'Country',
          field: 'country',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.country?.name ?? '-';
          },
          filter: false,
        },

        {
          headerName: 'State',
          field: 'state',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.state?.name ?? '-';
          },
          filter: false,
        },
        {
          headerName: 'City',
          field: 'city',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.city?.name ?? '-';
          },
          filter: false,
        },

        {
          headerName: 'Address',
          field: 'address',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.address ?? '-';
          },
          filter: false,
        },

        {
          headerName: 'Number',
          field: 'contactNumber',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.contactNumber ?? '-';
          },
          filter: false,
        },
        {
          headerName: 'Email',
          field: 'email',
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.email ?? '-';
          },
          filter: false,
        },
      ],
      image: {},
    },
    assignedProductTab(hide, data, activeTab),
  ];
};
