export const columnDefs = [
  {
    headerName: 'Code',
    field: 'code',
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cellRenderer: ({ data }: any) => {
      return Boolean(data?.activeStatus) ? 'Inactive' : 'Active';
    },
  },
  {
    headerName: 'Approval Status',
    field: 'approvalStatus',
    sortable: true,
    resizable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cellRenderer: ({ data }: any) => {
      return Boolean(data?.approvalStatus) ? 'Not Approved' : 'Approved';
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tabsConfiguration = (currentData: any) => {  
  
  return [
    {
      id: 'itemGroup',
      label: 'Item Group',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Name', value: currentData?.name},
        { name: 'Description', value: currentData?.description ?? "N/A" },
      ],
      image: {},
    },
  ];
};

export const customTabsConfiguration = ({
  kitDetails = [],
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kitDetails: any;
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
