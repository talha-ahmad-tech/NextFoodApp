import type { ICellRendererParams } from 'ag-grid-community';
import { COMPANY_DETAILS } from './types';

export const columnDefs = [
  {
    headerName: 'Company Name',
    field: 'name',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.name) ?? '-';
    },
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },

  {
    headerName: 'VAT Registration Number',
    field: 'vatNumber',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.vatNumber) ?? '-';
    },
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Currency',
    field: 'currency',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.currency) ?? '-';
    },
    resizable: true,
  },

  {
    headerName: 'Language',
    field: 'language',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.language) ? 'Inactive' : 'Active';
    },
  },
  {
    headerName: 'Time Zone',
    field: 'timeZone',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.timeZone) ?? '-';
    },
  },
  {
    headerName: 'White Label App',
    field: 'whiteLabelApp',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.whiteLabelApp) ?? '-';
    },
  },
  {
    headerName: 'Active',
    field: 'active',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.active) ? 'Yes' : 'No';
    },
  },
];

export const tabsConfiguration = ({ activeTab = '' }: COMPANY_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: activeTab === 'general' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Company Name', value: '' },
        { name: 'Currency', value: '' },
        { name: 'Language', value: '' },
        { name: 'White Label App', key: false },
        { name: 'Time Zone', value: '' },
        { name: 'Active', key: false },
        { name: 'Logo', value: '' },
      ],
      image: {},
    },
    {
      id: 'address',
      label: 'Address',
      classes: activeTab === 'address' ? 'active' : '',
      actions: true,
      type: 'grid',
      tableData: [],
      columnDefs: [
        {
          headerName: 'Country',
          field: 'Country',
          sortable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return Boolean(data?.Country) ?? '-';
          },
          resizable: true,
        },

        {
          headerName: 'State',
          field: 'state',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return Boolean(data?.state) ? 'Inactive' : 'Active';
          },
        },
        {
          headerName: 'City',
          field: 'city',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return Boolean(data?.city) ?? '-';
          },
        },
        {
          headerName: 'Addresss',
          field: 'address',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return Boolean(data?.address) ?? '-';
          },
        },
        {
          headerName: 'Number',
          field: 'number',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return Boolean(data?.number) ? 'Yes' : 'No';
          },
        },
        {
          headerName: 'Email',
          field: 'email',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return Boolean(data?.email) ? 'Yes' : 'No';
          },
        },
      ],
      image: {},
    },
    {
      id: 'legalEntity',
      label: 'Legal Entity',
      classes: activeTab === 'legalEntity' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Company Name', value: '' },
        { name: 'VAT Registration Number', value: '' },
      ],
      image: {},
    },
    {
      id: 'contact',
      label: 'Contact',
      classes: activeTab === 'contact' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Name', value: '' },
        { name: 'Contact Number', value: '' },
        { name: 'Email', value: '' },
      ],
      image: {},
    },
  ];
};

export const customTabsConfiguration = ({
  companyDetails = [],
}: {
  companyDetails: [];
}) => {
  return [
    {
      id: 'lines',
      label: 'Lines',
      classes: 'active',
      actions: false,
      type: 'grid',
      tableData: [companyDetails],
      dataRows: companyDetails,
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
