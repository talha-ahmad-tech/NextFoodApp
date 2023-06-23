import { TAX_DETAILS } from './types';
import type { ICellRendererParams } from 'ag-grid-community';

const TaxTypeEnum = (value: number) => {
  let tax = '';
  switch (value) {
    case 1:
      tax = 'SalesTax';
      break;
    case 2:
      tax = 'VAT';
      break;
    case 3:
      tax = 'WithholdingTax';
      break;
  }
  return tax;
};

export const columnDefs = [
  {
    headerName: '#',
    field: 'all',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    maxWidth: 49,
  },
  {
    headerName: 'Tax ID',
    field: 'id',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.code ? data?.code : '-';
    },
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Name',
    field: 'name',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Tax Type',
    field: 'taxtype',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Tax Rate',
    field: 'taxRate',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Cluster',
    field: 'cluster',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Stores',
    field: 'stores',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return (
        <div
          style={{ maxWidth: 130, justifyContent: 'left' }}
          data-toggle="tooltip"
          title={data.stores}
        >
          {data.stores}
        </div>
      );
    },
  },
];

interface Itype {
  id?: number | string;
  tenantId?: number | string;
  taxId?: number | string;
  storeId?: number | string;
  productId?: number | string;
  itemGroupId?: number;
  productName?: string;
  store?: {};
}

const taxStore = (data: object[]) => {
  return data.map((item: any) => (
    <>{item.store.name + (data.length > 1 ? ',' : '')}</>
  ));
};

const taxProduct = (data: object[]) => {
  return data.map(({ productName }: Itype, index: number) => (
    <>
      {productName ? productName + (data.length - index > 1 ? ',' : '') : '-'}
    </>
  ));
};

export const tabsConfiguration = ({
  code = '',
  name = '',
  description = '',
  taxRate = 0,
  taxType = 0,
  taxStores = [],
  taxProducts = [],
  cluster = { name: '' },
  taxItemGroups = [],
  clusterId = '',
}: TAX_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Tax ID', value: code ?? '-' },
        { name: 'Name', value: name },
        { name: 'Description', value: description },
        { name: 'Tax Rate', value: `${taxRate}%` },
        { name: 'Tax Type', value: TaxTypeEnum(Number(taxType)) },
        { name: 'Stores', value: taxStore(taxStores) },
        { name: 'Clusters', value: cluster?.name ?? '-' },
        { name: 'Product Name', value: taxProduct(taxProducts) },
      ],
      image: {},
    },
  ];
};

export const customTabsConfiguration = ({
  taxDetails = [],
}: {
  taxDetails: [];
}) => {
  return [
    {
      id: 'lines',
      label: 'Lines',
      classes: 'active',
      actions: false,
      type: 'grid',
      tableData: [taxDetails],
      dataRows: taxDetails,
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
