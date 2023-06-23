import amountFormatter from '@/utils/helper';
import moment from 'moment';
import { DISCOUNT_VIEW } from './types';

export const tabsConfiguration = (Details?: DISCOUNT_VIEW) => {
  const stores = Details?.discountStores;
  const storeKeys = stores?.map((item: any) => {
    return '  ' + `${item?.store?.name}`;
  });
  const products = Details?.discountProducts;
  const productKeys = products?.map((item: any) => {
    return '  ' + `${item?.product?.name}`;
  });
  const itemGroup = Details?.discountItemGroups;
  const itemKeys = itemGroup?.map((item: any) => {
    return '  ' + `${item?.itemGroup?.name}`;
  });
  return [
    {
      id: 'discountCode',
      label: 'Discount Code',
      classes: 'active',
      actions: false,
      type: 'table',
      tableData: [
        { name: 'Name', value: Details?.name },
        { name: 'Code', value: Details?.code },
        { name: 'Type', value: Details?.discountTypeValue },
        {
          name: 'Amount',
          value: amountFormatter(parseInt(Details?.amount ?? '')),
        },
        {
          name: 'Products',
          value: productKeys ? productKeys.join() : '-',
        },
        {
          name: 'Item Groups',
          value: itemGroup ? itemKeys.join() : '-',
        },
        {
          name: 'Stores',
          value: stores ? storeKeys.join() : '-',
        },
        { name: 'Customer Amount', value: Details?.customerLimit },

        {
          name: 'Maximum Amount',
          value: amountFormatter(parseInt(Details?.maximumAmount ?? '')),
        },
        {
          name: 'Maximum Limit',
          value: amountFormatter(parseInt(Details?.maximumLimit ?? '')),
        },
        {
          name: 'Start Date',
          value: moment(Details?.startDate).format('MM/DD/YYYY'),
        },
        {
          name: 'End Date',
          value: moment(Details?.endDate).format('MM/DD/YYYY'),
        },
      ],
      image: {},
    },
  ];
};
