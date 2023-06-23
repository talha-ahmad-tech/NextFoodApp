import { LineSwitch } from '@fridayfood/shared/components';
import { Field } from '@fridayfood/ui-toolkit/src/FormFields/Field';
import type { ICellRendererParams } from 'ag-grid-community';
import { VIIEW_RESPONSE } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Attactment = (props: any) => {
  return (
    <Field
      type="file"
      value={props?.value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(e: React.FormEvent<HTMLInputElement> | any) => {
        const file = e.target.files[0];
        const input = new FormData();
        input.append('File', file);
      }}
    />
  );
};

export const columnDefs = [
  {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    headerName: 'Name',
    field: 'name',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Positon',
    field: 'position',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Cost',
    field: 'cost',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'In-Store Price',
    field: 'inStorePrice',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Delivery Price',
    field: 'deliveryPrice',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Active',
    field: 'active',
    cellRenderer: LineSwitch,
  },
  {
    headerName: 'Track Inventory',
    field: 'active',
    cellRenderer: LineSwitch,
  },
  {
    headerName: 'Image',
    field: 'image',
    cellRenderer: Attactment,
  },
];
export const uomCols = (
  CustomCellEditorParams?: (props: ICellRendererParams) => JSX.Element,
) => [
  {
    headerName: '',
    field: 'zero',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    width: 60,
  },
  {
    headerName: 'From Unit',
    field: 'fromUnit',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: CustomCellEditorParams,
    cellEditorPopup: true,
  },
  {
    headerName: 'To Unit',
    field: 'toUnit',
    sortable: true,
    filter: 'agTextColumnFilter',
    editable: true,
    cellEditor: CustomCellEditorParams,
    cellEditorPopup: true,
  },
  {
    headerName: 'From QTY',
    field: 'fromQTY',
    sortable: true,
    editable: true,
    width: 200,
  },
  {
    headerName: 'To QTY',
    field: 'toQTY',
    sortable: true,
    editable: true,
    width: 200,
  },
];
export const tabsConfiguration = ({
  description = '',
  className = '',
  name = '',
}: VIIEW_RESPONSE) => {
  return [
    {
      id: 'general',
      label: 'UOM',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Name', value: name },
        { name: 'Description', value: description ?? '-' },
        // { name: 'Class', value: className ? className : '-' },
      ],
      // dataRows: [{ fromUnit: 'Kg', toUnit: 'Grams', fromQTY: 1, toQTY: 1000 }],
      // columnDefs: [
      //   {
      //     headerCheckboxSelection: true,
      //     checkboxSelection: true,
      //     headerName: 'From Unit',
      //     field: 'fromUnit',
      //     filter: false,
      //   },
      //   {
      //     headerName: 'To Unit',
      //     field: 'toUnit',
      //     filter: false,
      //   },
      //   {
      //     headerName: 'From Qty',
      //     field: 'fromQTY',
      //     filter: false,
      //   },

      //   {
      //     headerName: 'To Qty',
      //     field: 'toQTY',
      //     filter: false,
      //   },
      // ],
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
