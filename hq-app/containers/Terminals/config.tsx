import type { ICellRendererParams } from 'ag-grid-community';
import { useState } from 'react';
import { ADD_TERMINALS, TERMINAL_FORM } from './types';
import moment from 'moment';

export const columnDefs = [
  {
    headerName: 'Name',
    field: 'name',
    sortable: true,
    resizable: true,
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },

  {
    headerName: 'Description',
    field: 'description',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Stores',
    field: 'storeName',
    sortable: true,
    resizable: true,
  },

  {
    headerName: 'Auto Log off Time',
    field: 'autoLogTime',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Status',
    field: 'isActive',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.isActive) ? 'Active' : 'inActive';
    },
  },
  {
    headerName: 'Online terminal',
    field: 'isOnline',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.isOnline) ? 'Yes' : 'No';
    },
  },
  {
    headerName: 'Last Synced On',
    field: 'lastSync',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return moment(data?.lastSync).format('MM-DD-YYYY');
    },
  },
  {
    headerName: 'Declare Tender',
    field: 'declareTender',
    sortable: true,
    resizable: true,
    cellRenderer: ({ data }: ICellRendererParams) => {
      return Boolean(data?.declareTender) ? 'Yes' : 'No';
    },
  },
  {
    headerName: 'Mac Address',
    field: 'macAddress',
    sortable: true,
    resizable: true,
  },
];

export const tabsConfiguration = ({
  name = '',
  description = '',
  autoLogTime,
  declareTender,
  terminalStores,
}: ADD_TERMINALS) => {
  let stores = '';
  terminalStores?.map((item: { externalId?: string; storeId?: number }) => {
    stores = `${stores}${item.externalId},`;
  });
  return [
    {
      id: 'general',
      label: 'General',
      label2: 'log',
      classes: 'active',
      actions: false,
      type: 'twoTable',
      tableData1: [
        { name: 'Name', value: name },
        { name: 'Description', value: description },
        { name: 'Store', value: stores },
      ],
      tableData2: [
        { name: 'Auto Log off Time', value: autoLogTime },
        { name: 'Declare Tender', key: declareTender },
      ],
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
