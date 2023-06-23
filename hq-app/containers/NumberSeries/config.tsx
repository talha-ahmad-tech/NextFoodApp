import type { ICellRendererParams } from 'ag-grid-community';
import { NUMBER_SERIES_DETAILS } from './types';

export const columnDefs = [
  {
    headerName: 'Series Type',
    field: 'type',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.type ?? '-';
    },
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },

  {
    headerName: 'Form',
    field: 'type',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.type ?? '-';
    },
    resizable: true,
  },

  {
    headerName: 'Prefix',
    field: 'prefix',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.prefix ?? '-';
    },
  },
  {
    headerName: 'Suffix',
    field: 'suffix',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.suffix ?? '-';
    },
  },

  {
    headerName: 'To Number',
    field: 'min',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.min ?? '-';
    },
    resizable: true,
  },

  {
    headerName: 'Till Number',
    field: 'max',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.max ?? '-';
    },
  },
  {
    headerName: 'Overwrite Number',
    field: 'isOverwrite',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.isOverwrite ? 'Yes' : 'No';
    },
  },
  {
    headerName: 'Continuous Number',
    field: 'continuous',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.continuous ? 'Yes' : 'No';
    },
  },
];

export const tabsConfiguration = ({
  module,
  prefix,
  suffix,
  min,
  max,
  type,
  continuous,
  isOverwrite,
}: NUMBER_SERIES_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Module', value: module },
        { name: 'To Number', value: min },
        { name: 'Form', value: type },
        { name: 'Till Number', value: max },
        { name: 'Overwrite Number', value: isOverwrite ? 'Yes' : 'No' },
        { name: 'Continuous Number', value: continuous ? 'Yes' : 'No' },
        { name: 'Prefix', value: prefix },
        { name: '', value: name },
        { name: 'Suffix', value: suffix },
      ],
      image: {},
    },
  ];
};

export const customTabsConfiguration = ({
  numberSeriesDetails = [],
}: {
  numberSeriesDetails: [];
}) => {
  return [
    {
      id: 'lines',
      label: 'Lines',
      classes: 'active',
      actions: false,
      type: 'grid',
      tableData: [numberSeriesDetails],
      dataRows: numberSeriesDetails,
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
