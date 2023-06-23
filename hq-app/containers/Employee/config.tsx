import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';
import { EMPLOYEE_DETAILS } from './types';

export const columnDefs = [
  {
    headerName: '#',
    field: 'all',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Name',
    field: 'name',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Stores',
    field: 'stores',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Role',
    field: 'roles',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Pin Number',
    field: 'pin',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  // {
  //   headerName: 'Address',
  //   field: 'addresses',
  //   cellRenderer: ({ data }: ICellRendererParams) => {
  //     return data?.addresses ?? '-';
  //   },
  //   sortable: true,
  //   resizable: true,
  //   filter: 'agTextColumnFilter',
  //   filterParams: {
  //     buttons: ['reset'],
  //   },
  // },
  {
    headerName: 'Phone',
    field: 'phoneNumber',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data.phoneNumber ?? '-';
    },
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Active',
    field: 'isActive',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.isActive) ? 'Yes' : 'No';
    },
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
];

export const tabsConfiguration = (props: EMPLOYEE_DETAILS) => {
  const {
    activeTab,
    name,
    roles,
    code,
    pin,
    phone,
    isActive,
    email,
    type,
    payType,
    payDetail,
    stores,
    addresses,
  } = props;

  return [
    {
      id: 'general',
      label: 'General',
      classes: activeTab === 'general' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Employee Id', value: code ?? '' },
        { name: 'Employee Name', value: name },
        {
          name: 'Employee Type',
          value:
            type === 0
              ? 'Head Office Employee'
              : type === 1
              ? 'Store Employee'
              : '',
        },
        { name: 'Role', value: roles ?? '-' },
        { name: 'Contact Number', value: phone },
        { name: 'Email', value: email },
        // { name: 'Password', value: '' },
        { name: 'Pin Number', value: pin },
        {
          name: 'Pay Type',
          value:
            payType === 0
              ? 'Hourly Pay'
              : payType === 1
              ? 'Fixed Weekly Pay'
              : payType === 2
              ? 'Monthly Pay Rate'
              : '',
        },
        { name: 'Pay Details', value: payDetail },
        { name: 'Stores', value: stores ?? '-' },
        { name: 'Active', value: isActive && isActive ? 'Yes' : 'No' },
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
        // {
        //   headerName: 'Name',
        //   field: 'contactName',
        //   filter: false,
        // },
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

    // {
    //   id: 'permissions',
    //   label: 'Permissions',
    //   classes: activeTab === 'permissions' ? 'active' : '',
    //   actions: true,
    //   type: 'table',
    //   tableData: [],
    //   image: {},
    // },
  ];
};
