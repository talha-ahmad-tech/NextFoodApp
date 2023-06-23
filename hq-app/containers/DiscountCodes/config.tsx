import amountFormatter from '@/utils/helper';
import moment from 'moment';
import { DISCOUNT_VIEW } from './types';

export const tabsConfiguration = (Details?: DISCOUNT_VIEW) => {
  const stores = Details?.discountStores;
  const storeKeys = stores?.map((item: any) => {
    return '  ' + `${item?.storeName}`;
  });
  const products = Details?.discountProducts;
  const productKeys = products?.map((item: any) => {
    return '  ' + `${item?.productName ?? item?.productId}`;
  });
  const itemGroup = Details?.discountItemGroups;
  const itemKeys = itemGroup?.map((item: any) => {
    return '  ' + `${item?.itemGroupName}`;
  });
  return [
    {
      id: 'discountCode',
      label: 'Discount Code',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData:
        Details?.discountCategory === 1
          ? [
              { name: 'Order Source', value: Details?.orderSource ?? '-' },
              {
                name: 'Discount Category',
                value: Details?.discountCategory ?? '-',
              },
              {
                name: 'Discount Name',
                value: Details?.discountName ?? '-',
              },
              {
                name: 'Discount Code',
                value: amountFormatter(parseInt(Details?.discountCode ?? '0')),
              },
              {
                name: 'Discount Type',
                value: Details?.discountType ?? '-',
              },
              {
                name: 'Stores',
                value: stores
                  ? `${storeKeys[1]} +${storeKeys.length - 2}`
                  : '-',
              },
              {
                name: 'Start Date',
                value: moment(Details?.startDate).format('MM/DD/YYYY'),
              },
              {
                name: 'Discount Status',
                key: Details?.discountStatus ?? false,
              },
            ]
          : Details?.discountCategory === 2
          ? [
              { name: 'Order Source', value: Details?.orderSource ?? '-' },
              {
                name: 'Discount Category',
                value: Details?.discountCategory ?? '-',
              },
              {
                name: 'Discount Name',
                value: Details?.discountName ?? '-',
              },
              {
                name: 'Discount Code',
                value: amountFormatter(parseInt(Details?.discountCode ?? '0')),
              },
              {
                name: 'Discount Type',
                value: Details?.discountType ?? '-',
              },
              {
                name: 'Stores',
                value: stores
                  ? `${storeKeys[1]} +${storeKeys.length - 2}`
                  : '-',
              },
              {
                name: 'Start Date',
                value: moment(Details?.startDate).format('MM/DD/YYYY'),
              },
              {
                name: 'Discount Status',
                value: Details?.discountStatus ?? '-',
              },
              {
                name: 'Percentage',
                value: `${Details?.percentage ?? 0}%`,
              },
              {
                name: 'Products',
                value: productKeys
                  ? `${productKeys[1]} +${productKeys.length - 2}`
                  : '-',
              },
              {
                name: 'Item Groups',
                value: itemGroup
                  ? `${itemKeys[1]} +${itemKeys.length - 2}`
                  : '-',
              },
              {
                name: 'Stores',
                value: stores
                  ? `${storeKeys[1]} +${storeKeys.length - 2}`
                  : '-',
              },
              {
                name: 'Start Date',
                value: moment(Details?.startDate).format('MM/DD/YYYY'),
              },
              {
                name: 'End Date',
                value: moment(Details?.endDate).format('MM/DD/YYYY'),
              },
            ]
          : null,
      image: {},
    },
  ];
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
    headerName: 'Discount Name',
    field: 'discountName',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Discount Code',
    field: 'discountCode',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Discount Category',
    field: 'discountCategory',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Location',
    field: 'location',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },

  {
    headerName: 'Stores',
    field: 'stores',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Start Date',
    field: 'startDate',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'End Date',
    field: 'endDate',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
  {
    headerName: 'Discount Status',
    field: 'discountStatus',
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
    },
  },
];
