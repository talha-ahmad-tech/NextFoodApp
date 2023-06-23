import type { ICellRendererParams } from 'ag-grid-community';
import { FOOD_COSTING_DETAILS } from './types';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from 'react';

// const Progress_Bar = () =>{
//   const ref = useRef()
//   useEffect(() => {
//     if (ref.current) {
//       const inner = ref.current.querySelector(".progress-bar");
//       if ( inner ) {
//          inner.style.backgroundColor = "green";
//       }
//     }
//   }, [ref]);
//   return
// }

export const columnDefs = [
  {
    headerName: '',
    children: [
      {
        headerName: 'Product Name',
        field: 'productName',
        style: {
          borderLeft: 'solid',
        },
        sortable: true,
        resizable: true,
        minWidth: 180,
      },

      {
        headerName: 'Cost Price',
        field: 'costPrice',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },

      {
        headerName: 'Sale Price',
        field: 'salePrice',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },

      {
        headerName: 'Sales Tax',
        field: 'salesTax',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },
      {
        headerName: 'Sales Tax Amount',
        field: 'salesTaxAmount',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },
      {
        headerName: 'Gross Margin',
        field: 'grossMargin',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },
      {
        headerName: 'Gross Profit',
        field: 'grossProfit',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },
    ],
  },
  {
    headerName: 'Performance Review',
    cellStyle: {
      border: '1px solid black',
      justifyContents: 'center',
      alignItems: 'center',
      paddingRight: 200,
    },
    children: [
      {
        headerName: 'Unit Sales',
        field: 'reviewUnitSales',
        sortable: true,
        resizable: true,
        cellStyle: {
          borderLeft: '1px solid black',
        },
        // cellStyle: params => {
        //   if (params.node.rowIndex % 2 === 0) {
        //     //mark police cells as red
        //     return {
        //       borderLeft: '1px solid black',
        //       // marginLeft: '-2px',
        //       // top: '-3px',
        //     };
        //   }
        //   return {
        //     borderLeft: '1px solid black',
        //     // marginLeft: '-1px',
        //     // top: '-3px',
        //   };
        // },

        minWidth: 180,
      },

      {
        headerName: 'Gross Sales',
        field: 'reviewGrossSales',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },

      {
        headerName: 'Sale Tax',
        field: 'saleTaxReview',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },

      {
        headerName: 'Discount',
        field: 'discountReview',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },
      {
        headerName: 'Net Sales',
        field: 'netSalesReview',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },
      {
        headerName: 'Cost',
        field: 'costReview',
        sortable: true,
        resizable: true,
        minWidth: 180,
      },
      {
        headerName: 'Gross Margin',
        field: 'grossMarginReview',
        sortable: true,
        resizable: true,
        cellRenderer: ({ data }: ICellRendererParams) => {
          console.log('DATA', data);

          return data.pinnedRow ? (
            <>{`${data.grossMarginReview}%`}</>
          ) : (
            <div style={{ minWidth: 150 }}>
              <ProgressBar
                className="custom-progress-bar"
                now={data.grossMarginReview}
                label={`${data.grossMarginReview}%`}
              />
            </div>
          );
        },
        minWidth: 180,
      },
      {
        headerName: 'Gross Profit',
        field: 'grossProfitReview',
        sortable: true,
        cellStyle: {
          borderRight: '1px solid black',
        },
        resizable: true,
        minWidth: 180,
      },
    ],
  },
];

export const tabsConfiguration = ({
  code = '',
  foodCostingName = '',
  itemGroupName = '',
  activeFrom = '',
  activeTo = '',
  standardCost = '',
  totalRetailPrice = '',
  purchaseTaxGroupName = '',
  saleTaxGroupName = '',
  foodCostingDetails = [],
}: FOOD_COSTING_DETAILS) => {
  return [
    {
      id: 'general',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Sequence Number', value: code },
        { name: 'Name', value: foodCostingName },
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
      id: 'foodCostingDetails',
      label: 'foodCosting Details',
      classes: '',
      actions: false,
      type: 'grid',
      tableData: [foodCostingDetails],
      dataRows: foodCostingDetails,
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

export const customTabsConfiguration = ({
  foodCostingDetails = [],
}: {
  foodCostingDetails: [];
}) => {
  return [
    {
      id: 'lines',
      label: 'Lines',
      classes: 'active',
      actions: false,
      type: 'grid',
      tableData: [foodCostingDetails],
      dataRows: foodCostingDetails,
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
