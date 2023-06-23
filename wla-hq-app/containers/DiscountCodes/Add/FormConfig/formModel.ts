export const FormFormModel = {
  formId: 'discount',
  formField: {
    name: {
      name: 'name',
      label: 'Name',
    },
    code: {
      name: 'code',
      label: 'Code',
    },
    type: {
      name: 'type',
      label: 'Type',
      options: [
        {
          name: 'Fixed',
          value: 1,
        },
        {
          name: 'Percentage',
          value: 2,
        },
      ],
    },
    amount: {
      name: 'amount',
      label: 'Amount',
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
    customerLimit: {
      name: 'customerLimit',
      label: 'Customer Limit',
    },
    maximumAmount: {
      name: 'maximumAmount',
      label: 'Maximum Discount Amount',
    },
    maximumLimit: {
      name: 'maximumLimit',
      label: 'Maximum Usage Limit',
    },
    startDate: {
      name: 'startDate',
      label: 'Start Date',
    },
    endDate: {
      name: 'endDate',
      label: 'End Date',
    },
    isActive: {
      name: 'isActive',
    },
    tenantId: {
      name: 'tenantId',
    },
  },
};
