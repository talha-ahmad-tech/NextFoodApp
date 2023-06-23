import type { ICellRendererParams } from 'ag-grid-community';
import { CATEGORY_DETAILS } from './types';

export const columnDefs = (
  onGetProducts: (id: string, name?: string) => void,
  onRowClick: (id: string) => void,
) => {
  return [
    {
      headerName: '#',
      field: 'all',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 49,
    },
    {
      headerName: 'Category ID',
      field: 'categoryCode',
      cellRenderer: ({ data }: ICellRendererParams) => {
        return data?.categoryCode ? data.categoryCode : '-';
      },
      sortable: true,
      resizable: true,
    },

    {
      headerName: 'Category Name',
      field: 'name',
      sortable: true,
      resizable: true,
      cellRenderer: ({ data }: ICellRendererParams) => {
        return (
          (
            <span
              className="custom-table-content"
              onClick={() => onRowClick(data?.id)}
            >
              {data?.name}
            </span>
          ) ?? '-'
        );
      },
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset'],
      },
    },

    {
      headerName: 'Description',
      field: 'description',
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Item Group',
      field: 'itemGroup',
      cellRenderer: ({ data }: ICellRendererParams) => {
        return data?.itemGroup?.name ? data.itemGroup?.name : '-';
      },
      sortable: true,
      resizable: true,
    },

    {
      headerName: 'Position',
      field: 'position',
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Active',
      field: 'active',
      cellRenderer: ({ data }: ICellRendererParams) => {
        return data?.active == true ? 'Yes' : 'No';
      },
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Featured',
      field: 'featured',
      cellRenderer: ({ data }: ICellRendererParams) => {
        return data?.active == true ? 'Yes' : 'No';
      },
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      resizable: true,
      cellRendererFramework: ({ data }: ICellRendererParams) => {
        return (
          <button
            className="friday-btn-primary outline-btn small-btn font-medium"
            style={{ height: '20px' }}
            type="button"
            onClick={() => {
              onGetProducts(data?.id, data?.name);
            }}
          >
            Get Products
          </button>
        );
      },
      filterParams: {
        buttons: ['reset'],
      },
    },
  ];
};

export const tabsConfiguration = ({
  // id =  "",
  categoryCode = '',
  name = '',
  description = '',
  position = '',
  active = false,
  featured = false,
  hideOnline = false,
  hideOnPOS = false,
  itemGroup,
}: // tenantId = null,
CATEGORY_DETAILS) => {
  return [
    {
      id: 'category',
      label: 'General',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Category ID', value: categoryCode ?? '-' },
        { name: 'Category Name', value: name },
        { name: 'Description', value: description ?? '-' },
        { name: 'Item Group', value: itemGroup?.name ?? '-' },

        { name: 'Position', value: position },
        { name: 'Active', value: active === true ? 'Yes' : 'NO' },
        { name: 'Featured', value: featured === true ? 'Yes' : 'NO' },
        { name: 'Hide online', value: hideOnline === true ? 'Yes' : 'NO' },
        { name: 'Hide on POS', value: hideOnPOS === true ? 'Yes' : 'NO' },
      ],
      image: {},
    },
  ];
};
