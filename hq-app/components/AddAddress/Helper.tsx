/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ICellRendererParams } from 'ag-grid-community';
import EditDeleteIcons from './EditDeleteIcons';
export const setPurpose = (val: 1 | 2 | 3) => {
  switch (val) {
    case 1:
      return 'Delivery';
    case 2:
      return 'Invoicing';
    case 3:
      return 'Payment';
    default:
      return '0';
  }
};

export const columnDefs = [
  {
    headerName: 'Country',
    field: 'countryName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.country?.name ? data?.country?.name : data?.countryName;
    },
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'State',
    field: 'stateName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.state?.name ? data?.state?.name : data?.stateName;
    },
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'City',
    field: 'cityName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.city?.name ? data?.city?.name : data?.cityName;
    },
    checkboxSelection: false,
    editable: false,
    width: 200,
  },

  {
    headerName: 'Address',
    field: 'address',
    sortable: true,
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'Number',
    field: 'contactNumber',
    sortable: true,
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'Actions',
    field: 'actions',
    sortable: true,
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    editable: false,
    width: 200,
    cellRendererFramework: EditDeleteIcons,
  },
];
export const columnDefsEmploy = [
  {
    headerName: 'Country',
    field: 'countryName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.country?.name ? data?.country?.name : data?.countryName;
    },
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'State / Province',
    field: 'stateName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.state?.name ? data?.state?.name : data?.stateName;
    },
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'City',
    field: 'cityName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.city?.name ? data?.city?.name : data?.cityName;
    },
    checkboxSelection: false,
    editable: false,
    width: 200,
  },

  {
    headerName: 'Address',
    field: 'address',
    sortable: true,
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'Actions',
    field: 'actions',
    sortable: true,
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    editable: false,
    width: 200,
    cellRendererFramework: EditDeleteIcons,
  },
];

export const columnDefsSimpleAddress = [
  {
    headerName: 'Country',
    field: 'countryName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.country?.name ? data?.country?.name : data?.countryName;
    },
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'State',
    field: 'stateName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.state?.name ? data?.state?.name : data?.stateName;
    },
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'City',
    field: 'cityName',
    sortable: true,
    filter: 'agTextColumnFilter',
    cellRenderer: ({ data }: ICellRendererParams) => {
      return data?.city?.name ? data?.city?.name : data?.cityName;
    },
    checkboxSelection: false,
    editable: false,
    width: 200,
  },

  {
    headerName: 'Address',
    field: 'address',
    sortable: true,
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    editable: false,
    width: 200,
  },
  {
    headerName: 'Actions',
    field: 'actions',
    sortable: true,
    filter: 'agTextColumnFilter',
    checkboxSelection: false,
    editable: false,
    width: 200,
    cellRendererFramework: EditDeleteIcons,
  },
];

export const addDeleteandEditFunctions = (
  values: any,
  handleDelete: any,
  handleEdit: any,
) => {
  return values?.length === 0
    ? []
    : values?.map((value: any, index: number) => ({
        ...value,
        deleteFunction: () => handleDelete(index),
        editFunction: () => handleEdit(index),
      }));
};
