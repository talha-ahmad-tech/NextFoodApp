import { defDate } from '@/utils/helper';
import type { ICellRendererParams } from 'ag-grid-community';
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
    cellRenderer: ({ data }: ICellRendererParams) => data?.name ?? '-',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Description',
    field: 'description',
    cellRenderer: ({ data }: ICellRendererParams) => data?.description ?? '-',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Date',
    field: 'date',
    cellRenderer: ({ data }: ICellRendererParams) => defDate(data?.date) ?? '-',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Time',
    field: 'time',
    cellRenderer: ({ data }: ICellRendererParams) => {
      if (data?.time?.includes(' ')) {
        const [hours, minutes] = data?.time
          .split(' ')[1]
          .split(':')
          .slice(0, 2);
        return [hours, ':', minutes];
      } else {
        return data?.time ?? '-';
      }
    },

    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Reason',
    field: 'reason',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const reasonConversion = (type: string | number) => {
        switch (type) {
          case 0:
            return 'Purchase';
          case 1:
            return 'StockIn';
          case 2:
            return 'StockOut';
          case 3:
            return 'Wastage';
          case 4:
            return 'Damage';

          case 5:
            return 'Adjustment';

          default:
            break;
        }
      };
      return reasonConversion(data?.reason) ?? '';
    },
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Document Reference',
    field: 'documentReference',
    cellRenderer: ({ data }: ICellRendererParams) =>
      data?.documentReference ? data?.documentReference : '-',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Stores',
    field: 'storeId',
    cellRenderer: ({ data }: ICellRendererParams) =>
      data?.storeName ? data?.storeName : '-',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Number of Lines',
    field: 'inventoryAdjustmentDetails.length',
    sortable: true,
    resizable: true,
  },
];

export const AddLinesDefs = (
  CustomCellEditorParams?: (props: ICellRendererParams) => JSX.Element,
) => [
  {
    headerName: '#',
    field: 'all',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Product Name',
    field: 'productIdName',
    sortable: true,
    resizable: true,
    cellEditor: CustomCellEditorParams,
    cellEditorPopupPosition: 'over',
    cellEditorPopup: true,
    editable: true,
  },
  {
    headerName: 'Purchase UOM ',
    field: 'purchaseUomIdName',
    cellEditor: CustomCellEditorParams,
    cellEditorPopupPosition: 'over',
    cellEditorPopup: true,
    editable: true,
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Product Type',
    field: 'productType',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const componentTypeEnum = (value: number) => {
        switch (value) {
          case 1:
            return 'Ingredient';
          case 2:
            return 'Packaging Material';
          case 3:
            return 'Modifier';
          default:
            break;
        }
      };
      return componentTypeEnum(data?.productType ?? 0);
    },
  },
  {
    headerName: 'Quantity',
    field: 'quantity',
    sortable: true,
    resizable: true,
    editable: true,
  },
  {
    headerName: 'Unit Cost',
    field: 'unitCost',
    sortable: true,
    editable: true,
    resizable: true,
  },
  {
    headerName: 'Total Cost',
    field: 'totalCost',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Number(data?.quantity) * Number(data?.unitCost);
    },
    sortable: true,
    resizable: true,
  },
  // {
  //   headerName: 'Document Reference',
  //   field: 'documentReference',
  //   sortable: true,
  //   resizable: true,
  // },
  {
    headerName: 'Remarks',
    field: 'remarks',
    sortable: true,
    resizable: true,
    editable: true,
  },
];

export const linesDefView = [
  {
    headerName: '#',
    field: 'all',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Product Name',
    field: 'product.name',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.product?.name ?? '-';
    },
    sortable: true,
    resizable: true,
    // editable: true,
  },
  {
    headerName: 'Purchase UOM ',
    field: 'purchaseUom.name',
    // editable: true,
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Product Type',
    field: 'productType',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const componentTypeEnum = (value: number) => {
        switch (value) {
          case 1:
            return 'Ingredient';
          case 2:
            return 'Packaging Material';
          case 3:
            return 'Modifier';
          default:
            break;
        }
      };
      return componentTypeEnum(data?.productType ?? 0);
    },
  },
  {
    headerName: 'Quantity',
    field: 'quantity',
    sortable: true,
    resizable: true,
    // editable: true,
  },
  {
    headerName: 'Unit Cost',
    field: 'unitCost',
    sortable: true,
    // editable: true,
    resizable: true,
  },
  {
    headerName: 'Total Cost',
    field: 'totalCost',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Number(data?.quantity) * Number(data?.unitCost);
    },
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Remarks',
    field: 'remarks',
    sortable: true,
    resizable: true,
    // editable: true,
  },
];
const reasonConversion = (type: string | number) => {
  switch (type) {
    case 0:
      return 'Purchase';
    case 1:
      return 'StockIn';
    case 2:
      return 'StockOut';
    case 3:
      return 'Wastage';
    case 4:
      return 'Damage';

    case 5:
      return 'Adjustment';

    default:
      break;
  }
};
export const tabsConfiguration = ({
  name = '',
  description = '',
  date = '',
  time = '',
  reason = '',
  documentReference = '',
  supplierName = '',
  storeName = '',
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: false,
      type: 'table',
      tableData: [
        { name: 'Name', value: name ?? '-' },
        { name: 'Description', value: description ?? '-' },
        { name: 'Date', value: defDate(date) ?? '-' },
        { name: 'Time', value: time ?? '-' },
        { name: 'Reason', value: reasonConversion(reason) ?? '-' },
        { name: 'Document Reference', value: documentReference ?? '-' },
        { name: 'Supplier', value: supplierName ?? '-' },
        { name: 'Store', value: storeName ? storeName : '-' },
      ],
      image: {},
    },
  ];
};

export const customTabsConfiguration = ({
  inventoryAdjustmentNewDetails = [],
}: {
  inventoryAdjustmentNewDetails: [];
}) => {
  return [
    {
      id: 'lines',
      label: 'Lines',
      classes: 'active',
      actions: false,
      type: 'grid',
      tableData: [inventoryAdjustmentNewDetails],
      dataRows: inventoryAdjustmentNewDetails,
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
