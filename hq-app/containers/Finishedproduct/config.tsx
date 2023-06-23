// eslint-disable-next-line @typescript-eslint/ban-types

import type { ICellRendererParams } from 'ag-grid-community';
import {
  ForwardRefExoticComponent,
  MemoExoticComponent,
  RefAttributes,
} from 'react';
import CustomStatusRenderer from './CustomSwitch';

export const DealRecipesColDefs = (
  DeleteAction?: (props: ICellRendererParams) => JSX.Element,
  CustomCellEditorParams?: MemoExoticComponent<
    ForwardRefExoticComponent<Omit<unknown, 'ref'> & RefAttributes<unknown>>
  >,
) => [
  {
    headerName: '',
    field: 'zero',
    filter: false,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 40,
  },
  {
    headerName: 'Component Type',
    field: 'componentTypeValue',
    filter: 'agTextColumnFilter',
    editable: true,
    cellEditor: CustomCellEditorParams,
    cellEditorParams: () => {
      const componentType = [
        {
          label: 'Ingredient',
          value: 1,
        },
        {
          label: 'PackagingMaterial',
          value: 2,
        },
        {
          label: 'Modifier',
          value: 3,
        },
      ];
      return {
        values: componentType,
      };
    },
    cellEditorPopup: true,
    width: 200,
  },
  {
    headerName: 'Component Name',
    field: 'name',
    editable: true,
    cellEditor: CustomCellEditorParams,
    cellEditorPopup: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueFormatter: (params: any) => {
      const { value } = params;
      if (value.length > 15) {
        return value.substring(0, 15) + '...';
      }
      return value;
    },
  },
  {
    headerName: 'Component Status',
    field: 'componentStatusValue',
    editable: true,
    cellEditor: CustomCellEditorParams,
    cellEditorParams: () => {
      const componentStatus = [
        {
          label: 'Compulsory',
          value: 1,
        },
        {
          label: 'Optional',
          value: 2,
        },
      ];
      return {
        values: componentStatus,
      };
    },
    cellEditorPopup: true,
    width: 200,
  },
  {
    headerName: 'Selling UOM',
    field: 'sellingUom',
    editable: true,
    cellEditor: CustomCellEditorParams,
    cellEditorPopup: true,
    width: 200,
  },
  {
    headerName: 'Eat In',
    field: 'eatIn',
    cellRenderer: CustomStatusRenderer,
  },
  {
    headerName: 'Collection',
    field: 'collection',
    cellRenderer: CustomStatusRenderer,
  },
  {
    headerName: 'Delivery',
    field: 'delivery',
    cellRenderer: CustomStatusRenderer,
  },
  {
    headerName: 'Unit Cost',
    field: 'unitCost',
    // editable: true,
  },
  {
    headerName: 'Quantity',
    field: 'quantity',
    editable: true,
  },
  {
    headerName: 'Total Cost',
    field: 'totalCost',
  },
  {
    headerName: 'Action',
    field: 'action',
    cellRenderer: DeleteAction,
    width: 150,
  },
];
export const columnDefs = [
  {
    headerName: 'Kit Code',
    field: 'code',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Kit Name',
    field: 'kitName',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Item Group',
    field: 'itemGroupName',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Active Status',
    field: 'activeStatus',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.activeStatus) ? 'Inactive' : 'Active';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Approval Status',
    field: 'approvalStatus',
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.approvalStatus) ? 'Not Approved' : 'Approved';
    },
    filterParams: {
      buttons: ['reset'],
    },
  },
];

export const tabsConfiguration = () => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [],
      image: {},
    },
    {
      id: 'recipes',
      label: 'Recipes',
      classes: '',
      actions: false,
      type: 'grid',
      tableData: [],
      dataRows: [],
      columnDefs: [],
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
          field: 'productype',
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
