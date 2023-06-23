// import { defDate } from '@/utils/helper';
import type { ICellRendererParams } from 'ag-grid-community';
import moment from 'moment';
import { PRICELIST_DETAILS } from './types';
import { GetLocalDate } from '@/utils/helper';
// const style = {
//   container: {
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     display: 'flex',
//   },
//   childContainer: {
//     margin: 2,
//     background: 'rgb(241 241 241)',
//     fontSize: '10px',
//     fontWeight: '600',
//     padding: '3px',
//     borderRadius: '3px',
//     justifyContent: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     maxHeight: '25px',
//   },
// };
export const priceListPriceCols = [
  {
    headerName: 'In-Store Price',
    field: 'inStorePrice',
    sortable: true,
    editable: true,
  },
  {
    headerName: 'Collection Price',
    field: 'collectionPrice',
    sortable: true,
    editable: true,
  },
  {
    headerName: 'Delivery Price',
    field: 'deliveryPrice',
    sortable: true,
    editable: true,
  },
];

export const priceListDiscountCols = [
  {
    headerName: 'Discount Percentage',
    field: 'discountPercentage',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.discountPercentage ?? '-';
    },
    editable: true,
  },
  {
    headerName: 'Discount Amount',
    field: 'discountAmount',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.discountAmount ?? '-';
    },
    sortable: true,
    editable: true,
  },
];
const priceTypeOptions = [
  {
    label: 'Finished Products',
    value: 1,
  },
  {
    label: 'Deals',
    value: 2,
  },
];

// const storeTypeOption = [
//   {
//     label: 'Fast Food',
//     value: 1,
//   },
//   {
//     label: 'Fine Dinning',
//     value: 2,
//   },
//   {
//     label: 'Delivery',
//     value: 3,
//   },
// ];

export const productOptions = [
  {
    name: 'Subway',
    description: 'Subway desc',
    ids: 'ST-001',
    id: 1,
  },
  {
    name: 'subway 11',
    description: 'Subway desc11',
    ids: 'ST-0011',
    id: 11,
  },
  {
    name: 'subway 111',
    description: 'Subway desc 111',
    ids: 'ST-00111',
    id: 111,
  },
];
const options = productOptions.map(
  (items: {
    name?: string;
    description?: string;
    ids?: string;
    id?: number | string;
  }) => {
    return {
      ...items,
      label: (
        <span>
          {items?.ids} {items?.name} {items?.description}
        </span>
      ),
      value: items?.id,
    };
  },
);

options.unshift({
  label: (
    <div
      style={{
        height: '50x',
      }}
    >
      <span
        style={{
          marginRight: '45px',
        }}
      >
        ID
      </span>
      <span
        style={{
          marginRight: '45px',
        }}
      >
        Name
      </span>
      <span>Description</span>
    </div>
  ),
  value: 0,
});

export const priceListColsForLines = [
  {
    headerName: 'Product Type',
    field: 'productType',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.productType === 1
        ? 'Finished Product'
        : data?.productType === 2 && 'Deals';
    },
    resizable: true,
  },
  {
    headerName: 'Product Name',
    field: 'productName',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.product?.name ?? '-';
    },
    sortable: true,
    filter: 'agTextColumnFilter',
  },
  // {
  //   headerName: 'Store Type',
  //   field: 'storeType',
  //   cellRenderer: ({ data }: ICellRendererParams) => {
  //     return data?.storeType === 1
  //       ? 'Fast Food'
  //       : data?.storeType === 2
  //       ? 'Fine Dinning'
  //       : data?.storeType === 3 && 'Delivery';
  //   },
  //   sortable: true,
  // },
  // {
  //   headerName: 'Clusters',
  //   field: 'clusters',
  //   sortable: true,
  // },
  {
    headerName: 'Stores',
    field: 'priceListStores.storeName',
    cellRenderer: ({ data }: ICellRendererParams) => {
      const totalNames = data?.priceListStores;
      return (
        <span>
          {data?.priceListStores[0]?.storeName ?? ''}
          {totalNames.length > 1 ? `,+${totalNames.length - 1}` : ''}
        </span>
      );

      // return Boolean(data?.activeStatus) ? 'Inactive' : 'Active';
    },
    sortable: true,
  },
];
export const priceListCols = (
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
    headerName: 'Product Type',
    field: 'productTypeName',
    sortable: true,
    resizable: true,
    editable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data.productType === 1
        ? 'Finished Product'
        : data.productType === 2
        ? 'Deals'
        : '-select-';
    },
    cellEditor: CustomCellEditorParams,
    cellEditorParams: () => {
      return {
        values: priceTypeOptions,
      };
    },
    cellEditorPopup: true,
  },
  {
    headerName: 'Product Name',
    field: 'productName',
    sortable: true,
    filter: 'agTextColumnFilter',
    editable: true,
    resizable: true,
    cellEditorPopupPosition: 'over',
    cellEditor: CustomCellEditorParams,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return (
        <div
          style={{ maxWidth: 130, justifyContent: 'left' }}
          data-toggle="tooltip"
          title={data.productName}
        >
          {data.productName}
        </div>
      );
    },
    cellEditorPopup: true,
    cellEditorParams: () => {
      // let productsList: any = [];
      // productsList = productOptions?.map((product: any, i?: number) => (
      //   <span key={i}>
      //     {product?.ID}
      //     {/* {product?.name} {product?.description} */}
      //   </span>
      // ));

      return {
        values: options,
      };
    },
    maxWidth: 200,
  },
  {
    headerName: 'Stores',
    field: 'priceListStores.storeName',
    sortable: true,
    resizable: true,
    editable: true,
    cellEditor: CustomCellEditorParams,
    cellRenderer: ({ data }: ICellRendererParams) => {
      const totalNames = data?.priceListStores;
      return (
        <span>
          {data?.priceListStores[0]?.storeName ?? ''}
          {totalNames.length > 1 ? `,+${totalNames.length - 1}` : ''}
        </span>
      );
    },
    cellEditorPopup: true,
  },
];

export const columnDefs = [
  {
    headerName: 'Price Type',
    field: 'priceType',
    sortable: true,
    cellRenderer: ({ data }: ICellRendererParams) =>
      data?.priceType === 1
        ? 'Price'
        : data?.priceType === 2
        ? 'Discount'
        : '-',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    resizable: true,
  },
  {
    headerName: 'Name',
    field: 'name',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Description',
    field: 'description',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Status',
    field: 'status',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
  },
  {
    headerName: 'Date From',
    field: 'dateFrom',
    cellRenderer: ({ data }: ICellRendererParams) =>
      GetLocalDate(data?.dateFrom),
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Date Till',
    field: 'dateTill',
    cellRenderer: ({ data }: ICellRendererParams) =>
      GetLocalDate(data?.dateTill),
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
  },
];

export const tabsConfiguration = ({
  priceType = 1,
  name = '',
  description = '',
  status = '',
  dateFrom = '',
  dateTill = '',
}: PRICELIST_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        {
          name: 'Price Type',
          value:
            Number(priceType) === 1
              ? 'Price'
              : Number(priceType) === 2
              ? 'Discount'
              : '-',
        },
        { name: 'Name', value: name },
        { name: 'Description', value: description },
        { name: 'Status', value: status },
        { name: 'Date From', value: moment(dateFrom).format('MM/DD/YYYY') },
        { name: 'Date Till', value: moment(dateTill).format('MM/DD/YYYY') },
      ],
      image: {},
    },
  ];
};
