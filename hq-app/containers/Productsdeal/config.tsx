// eslint-disable-next-line @typescript-eslint/ban-types

import type { ICellRendererParams } from 'ag-grid-community';
import {
  ForwardRefExoticComponent,
  MemoExoticComponent,
  RefAttributes,
} from 'react';
import CustomStatusRenderer from './CustomSwitch';

export const DealPriceColDefs = () => [
  {
    headerName: 'Deal',
    field: 'dealName',
    filter: false,
    width: 200,
  },
  {
    headerName: 'Cost Price',
    field: 'costPrice',
    filter: 'agTextColumnFilter',
    cellRenderer: (props: ICellRendererParams) => {
      const diff =
        Number(props?.data?.salePrice ?? 0) - Number(props?.data?.tax ?? 0);
      const inTake =
        diff > 0 ? 1 - Number(props?.data?.costPrice ?? 0) / diff : 0;

      props.data.inTakeMargin = inTake;
      const profit =
        Number(props?.data?.salePrice ?? 0) -
        Number(props?.data?.tax ?? 0) -
        Number(props?.data?.costPrice ?? 0);
      props.data.profit = profit;
      return props?.data?.costPrice;
    },

    width: 200,
  },

  {
    headerName: 'Sale Price',
    field: 'salePrice',
    editable: true,
    filter: false,
    width: 200,
  },
  {
    headerName: 'In-Take Margin',
    field: 'inTakeMargin',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const inTakeMargin = data?.inTakeMargin
        ? Math.round(data?.inTakeMargin * 100) / 100 + '%'
        : 0;
      return inTakeMargin;
    },

    filter: false,
    width: 200,
  },
  {
    headerName: 'Profit',
    field: 'profit',
    cellRenderer: (props: ICellRendererParams) => {
      const profit =
        Number(props?.data?.salePrice ?? 0) -
        Number(props?.data?.tax ?? 0) -
        Number(props?.data?.costPrice ?? 0);
      props.data.profit = profit;
      return profit;
    },
    filter: false,
    width: 200,
  },
];

export const DealDetailsColDefs = (
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
    headerName: 'Component Name',
    field: 'componentName',
    // filter: false,
    filter: 'agTextColumnFilter',
    editable: true,
    cellEditor: CustomCellEditorParams,
    cellEditorPopup: true,
    width: 200,
  },

  {
    headerName: 'Quantity',
    field: 'quantity',
    filter: false,
    cellRenderer: ({ data }: ICellRendererParams) =>
      Number(data?.quantity ?? 0),
    editable: true,
    width: 180,
  },

  {
    headerName: 'Component Cost',
    field: 'componentCost',
    filter: false,
    width: 200,
  },
];

export const DealRecipesColDefs = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CustomCellEditorParams?: any,
  DeleteAction?: (props: ICellRendererParams) => JSX.Element,
  values?: { products: string[]; ingredients: string[] },
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
    headerName: 'Product Type',
    field: 'componentTypeValue',
    filter: 'agTextColumnFilter',
    // editable: true,
    editable: (o: { node: { isRowPinned: () => boolean } }) =>
      !o.node.isRowPinned(),
    cellEditor: CustomCellEditorParams,
    cellEditorParams: () => {
      const componentType = [
        {
          label: 'Finishd Product',
          value: 1,
        },
        {
          label: 'Packaging Material',
          value: 2,
        },
      ];
      return {
        values: componentType,
        isNotPinned: true,
      };
    },
    cellEditorPopup: true,
    width: 200,
  },
  {
    headerName: 'Product Name',
    field: 'name',
    valueFormatter: (params: any) => {
      if (params?.value?.length > 15) {
        return params?.value?.substring(0, 15) + '...';
      }
      return params?.value ?? '';
    },
    editable: (o: { node: { isRowPinned: () => boolean } }) =>
      !o.node.isRowPinned(),
    cellEditor: CustomCellEditorParams,
    cellEditorParams: ({ data }: ICellRendererParams) => {
      return {
        values:
          data?.componentType === 1 ? values?.products : values?.ingredients,
        isNotPinned: true,
      };
    },
    cellEditorPopup: true,
  },
  {
    headerName: 'Quantity',
    field: 'quantity',
    editable: (o: { node: { isRowPinned: () => boolean } }) =>
      !o.node.isRowPinned(),
  },
  {
    headerName: 'Cost Price',
    field: 'cost',
  },
  {
    headerName: 'Tax',
    field: 'tax',
  },
  {
    headerName: 'Sale Price',
    field: 'salePrice',
  },
  {
    headerName: 'Gross Margin',
    field: 'grossMargin',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.grossMargin ? data?.grossMargin + '%' : 0;
    },
  },
  {
    headerName: 'Gross Profit',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const value =
        Number(data?.salePrice) - Number(data?.tax) - Number(data?.cost);
      const profit = Number(value ?? 0) > 0 ? Number(value ?? 0) : 0;
      return value ? profit ?? 0 : 0;
    },
    field: 'grossProfit',
  },

  {
    headerName: 'Eat In',
    field: 'isInStore',
    cellRenderer: CustomStatusRenderer,
  },
  {
    headerName: 'Collection',
    field: 'isCollection',
    cellRenderer: CustomStatusRenderer,
  },
  {
    headerName: 'Delivery',
    field: 'isDelivery',
    cellRenderer: CustomStatusRenderer,
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

export const tabsConfiguration = ({
  code = '',
  kitName = '',
  itemGroupName = '',
  activeFrom = '',
  activeTo = '',
  standardCost = '',
  totalRetailPrice = '',
  purchaseTaxGroupName = '',
  saleTaxGroupName = '',
  kitDetails = [],
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Sequence Number', value: code },
        { name: 'Name', value: kitName },
        { name: 'Item Group', value: itemGroupName },
        { name: 'Active From', value: activeFrom },
        { name: 'Active To', value: activeTo },
        { name: 'Standard Cost', value: standardCost },
        { name: 'Retail Price', value: totalRetailPrice },
        { name: 'Purchase Tax Group', value: purchaseTaxGroupName },
        { name: 'Sale Tax Group', value: saleTaxGroupName },
      ],
      image: {},
    },
    {
      id: 'dealDetails',
      label: 'Deal Insight',
      classes: '',
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
    // {
    //   id: 'recipes',
    //   label: 'Recipes',
    //   classes: '',
    //   actions: false,
    //   type: 'grid',
    //   tableData: [kitDetails],
    //   dataRows: kitDetails,
    //   columnDefs: [
    //     {
    //       headerName: 'Line No',
    //       field: 'id',
    //       filter: false,
    //     },
    //     {
    //       headerName: 'Product Id',
    //       field: 'productCode',
    //       filter: false,
    //     },
    //     {
    //       headerName: 'Product Name',
    //       field: 'productName',
    //       filter: false,
    //     },

    //     {
    //       headerName: 'Product Type',
    //       field: 'producttype',
    //       filter: false,
    //     },

    //     {
    //       headerName: 'Variant Name',
    //       field: 'varientName',
    //       filter: false,
    //     },
    //     {
    //       headerName: 'Size Name',
    //       field: 'sizeName',
    //       filter: false,
    //     },
    //     {
    //       headerName: 'Color Name',
    //       field: 'colorName',
    //       filter: false,
    //     },
    //     {
    //       headerName: 'Style',
    //       field: 'styleName',
    //       filter: false,
    //     },
    //     {
    //       headerName: 'Unit Cost',
    //       field: 'unitCost',
    //       filter: false,
    //     },
    //   ],
    //   image: {},
    // },
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
