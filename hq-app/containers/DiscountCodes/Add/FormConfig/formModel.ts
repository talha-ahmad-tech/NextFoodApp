export const FormFormModel = {
  formId: 'discount',
  formField: {
    orderSource: {
      name: 'orderSource',
      label: 'Order Source',
      options: [
        {
          label: 'WLA Web',
          value: 1,
        },
        {
          label: 'WLA Mobile',
          value: 2,
        },
        {
          label: 'POS',
          value: 3,
        },
      ],
    },
    discountCategory: {
      name: 'discountCategory',
      label: 'Discount Category',
      options: [
        {
          name: 'Basic',
          value: 1,
        },
        {
          name: 'Customer Criteria',
          value: 2,
        },
        {
          name: 'Voucher POS',
          value: 3,
        },
        {
          name: 'Voucher WLA',
          value: 4,
        },
      ],
    },
    discountName: {
      name: 'discountName',
      label: 'Discount Name',
    },
    discountCode: {
      name: 'discountCode',
      label: 'Discount Code',
    },
    discountType: {
      name: 'discountType',
      label: 'Discount Type',
      options: [
        {
          name: 'Value',
          value: 1,
        },
        {
          name: 'Percentage',
          value: 2,
        },
      ],
    },
    customerLimit: {
      name: 'customerLimit',
      label: 'Customer Usage Limit',
    },
    maximumLimit: {
      name: 'maximumLimit',
      label: 'Discount Upper Limit',
    },
    voucherLimit: {
      name: 'voucherLimit',
      label: 'Voucher Usage Limit',
    },
    category: {
      name: 'category',
      label: 'Category',
    },
    products: {
      name: 'discountProducts',
      label: 'Products',
    },
    itemGroups: {
      name: 'discountItemGroups',
      label: 'Item Groups',
    },
    stores: {
      name: 'discountStores',
      label: 'Stores',
    },

    maximumAmount: {
      name: 'maximumAmount',
      label: 'Maximum Discount Amount',
    },

    startDate: {
      name: 'startDate',
      label: 'Start Date',
    },
    endDate: {
      name: 'endDate',
      label: 'End Date',
    },
    startTime: {
      name: 'startTime',
      label: 'Start Time',
    },
    endTime: {
      name: 'endTime',
      label: 'End Time',
    },
    isActive: {
      name: 'isActive',
    },
    tenantId: {
      name: 'tenantId',
    },
    region: {
      name: 'region',
      label: 'Region',
    },
    cluster: {
      name: 'cluster',
      label: 'Cluster',
    },
  },
};
