import type { ICellRendererParams } from 'ag-grid-community';
import { ROLES_DETAILS } from './types';

export const columnDefs = [
  {
    headerName: 'roles Code',
    field: 'code',
    sortable: true,
    resizable: true,
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },

  {
    headerName: 'roles Name',
    field: 'rolesName',
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

export const tabsConfiguration = ({ id }: ROLES_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Sequence Number', value: 'code' },
        { name: 'Name', value: 'rolesName' },
        { name: 'Item Group', value: 'itemGroupName' },
        { name: 'Active From', value: 'activeFrom' },
        { name: 'Active To', value: 'activeTo' },
        { name: 'Standard Cost', value: 'standardCost' },
        { name: 'Retail Price', value: 'totalRetailPrice' },
        { name: 'Purchase Tax Group', value: 'purchaseTaxGroupName' },
        { name: 'Sale Tax Group', value: 'saleTaxGroupName' },
      ],
      image: {},
    },
  ];
};
