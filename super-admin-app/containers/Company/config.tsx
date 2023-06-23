import { urlConverter } from '@/utils/helper';
import type { ICellRendererParams } from 'ag-grid-community';
import { COMPANY_DETAILS } from './types';

export const columnDefs = [
  {
    headerName: 'Company Name',
    field: 'name',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.name ?? '-';
    },
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },

  {
    headerName: 'VAT Registration Number',
    field: 'vat',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.vat) ? data?.vat : '-';
    },
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Currency',
    field: 'currencyName',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.currencyName ?? '-';
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
      return data?.timeZone ?? '-';
    },
  },
  {
    headerName: 'White Label App',
    field: 'wlaApp',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.whiteLabelApp) ? 'Yes' : 'No';
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

export const tabsConfiguration = ({
  isActive = false,
  activeTab = '',
  language = '',
  timeZone = '',
  vat = '',
  wlaApp = false,
  name = '',
  currencyName = '',
  addresses = [],
  subDomain = '',
  logo = '',
  legalName = '',
  contactName = '',
  contactNumber = '',
  adminEmailAddress = '',
}: COMPANY_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: activeTab === 'general' ? 'active' : '',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Company Name', value: name ?? '-' },
        { name: 'Currency', value: currencyName ?? '-' },
        {
          name: 'Language',
          value: Number(language) === 1 ? 'English UK' : 'English USA',
        },
        { name: 'White Label App', value: wlaApp ? 'Yes' : 'No' },
        { name: 'Time Zone', value: timeZone },
        { name: 'Active', value: isActive ? 'Yes' : 'No' },
        {
          name: 'Logo',
          images: logo ? urlConverter('core') + logo : '',
        },
        { name: 'Subdomain Name', value: subDomain ?? '-' },
      ],
      image: {},
    },
    {
      id: 'address',
      label: 'Address',
      classes: activeTab === 'address' ? 'active' : '',
      actions: true,
      type: 'grid',
      tableData: addresses,
      dataRows: addresses,
      columnDefs: [
        {
          headerName: 'Country',
          field: 'Country',
          sortable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.Country ?? '-';
          },
          resizable: true,
        },

        {
          headerName: 'State',
          field: 'state',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.state ?? '-';
          },
        },
        {
          headerName: 'City',
          field: 'city',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.city ?? '-';
          },
        },
        {
          headerName: 'Addresss',
          field: 'address',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.address ?? '-';
          },
        },
        {
          headerName: 'Number',
          field: 'number',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.number ?? '-';
          },
        },
        {
          headerName: 'Email',
          field: 'email',
          sortable: true,
          resizable: true,
          cellRenderer: ({ data }: ICellRendererParams) => {
            return data?.email ?? '-';
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
        { name: 'Company Name', value: legalName ? legalName : '-' },
        { name: 'VAT Registration Number', value: vat ?? '-' },
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
        { name: 'Name', value: contactName ? contactName : '-' },
        {
          name: 'Contact Number',
          value: contactNumber ? contactNumber : '-',
        },
        { name: 'Email', value: adminEmailAddress ? adminEmailAddress : '-' },
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
