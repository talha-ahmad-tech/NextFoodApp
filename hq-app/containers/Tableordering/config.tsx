import type { ICellRendererParams } from 'ag-grid-community';
import { TABLEORDERING_DETAILS } from './types';

export const columnDefs = [
  {
    headerName: 'tableordering Code',
    field: 'code',
    sortable: true,
    resizable: true,
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },

  {
    headerName: 'tableordering Name',
    field: 'tableorderingName',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Item Group',
    field: 'itemGroupName',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Active Status',
    field: 'activeStatus',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.activeStatus) ? 'Inactive' : 'Active';
    },
  },
  {
    headerName: 'Approval Status',
    field: 'approvalStatus',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.approvalStatus) ? 'Not Approved' : 'Approved';
    },
  },
];

export const tabsConfiguration = ({
  allowTableOrder = false,
  noOfTable = ""
  // tableorderingDetails = [],
}: TABLEORDERING_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Allow Table Order  ', value: allowTableOrder },
        { name: 'No of Tables', value: noOfTable },
      ],
      image: {},
    },
  ];
};

export const customTabsConfiguration = ({
  tableorderingDetails = [],
}: {
  tableorderingDetails: [];
}) => {
  return [
    {
      id: 'lines',
      label: 'Lines',
      classes: 'active',
      actions: false,
      type: 'grid',
      tableData: [tableorderingDetails],
      dataRows: tableorderingDetails,
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
