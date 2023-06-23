export const columnDefs = [
  {
    headerName: '',
    field: 'all',
    filter: false,
    checkboxSelection: true,
    headerCheckboxSelection: true,
  },
  {
    headerName: 'Category',
    field: 'categoryName',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 150,
  },

  {
    headerName: 'Quantity',
    field: 'quantity',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 150,
  },
  {
    headerName: 'Gross Revenue',
    field: 'grossRevenue',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 150,
  },
  {
    headerName: 'Net Revenue',
    field: 'netRevenue',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 150,
  },
  {
    headerName: '% Revenue',
    field: 'grossRevenuePercentage',
    sortable: true,
    filterParams: {
      buttons: ['reset'],
    },
    resizable: true,
    minWidth: 150,
  },
];
