import type { ICellRendererParams } from 'ag-grid-community';
import { SUPPLIERS_DETAILS } from './types';

export const columnDefs = [
  {
    headerName: 'Supplier Code',
    field: 'code',
    sortable: true,
    resizable: true,
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },

  {
    headerName: 'Name',
    field: 'name',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Description',
    field: 'description',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Number',
    field: 'contactNumber',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Address',
    field: 'address',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.addresses
        ?.map((item: { address: string }) => item?.address)
        .join(',');
    },
    resizable: true,
  },
  {
    headerName: 'Stores',
    field: 'stores',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const storeNames = data?.stores?.map(
        (item: { store: { name: string } }) => item?.store?.name,
      );
      return storeNames.join(',');
    },
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Tax ID',
    field: 'taxId',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      const taxNames = data?.taxes?.map(
        (item: { tax: { name: string } }) => item?.tax?.name,
      );
      return taxNames.join(',');
    },
    resizable: true,
  },
];

export const tabsConfiguration = (props: SUPPLIERS_DETAILS) => {
  const {
    activeTab,
    code,
    name,
    description,
    contactNumber,
    email,
    addresses,
    taxes,
    stores,
  } = props;
  const taxNames = taxes?.map(
    (item: { tax: { name: string } }) => item?.tax?.name,
  );
  const storeNames = stores?.map(
    (item: { store: { name: string } }) => item?.store?.name,
  );
  return [
    {
      id: 'general',
      label: 'General',
      classes: activeTab === 'general' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Supplier Code', value: code },
        { name: 'Name', value: name },
        { name: 'Description', value: description },
        { name: 'Contact Number', value: contactNumber },
        { name: 'Email', value: email },
        { name: 'Tax ID', value: taxNames?.join(',') },
        { name: 'Store', value: storeNames?.join(',') },
      ],
      image: {},
    },
    {
      id: 'address',
      label: 'Address',
      classes: activeTab === 'address' ? 'active' : '',
      actions: true,
      type: 'grid',
      tableData: [addresses],
      dataRows: addresses,
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
      ],
      image: {},
    },
  ];
};
