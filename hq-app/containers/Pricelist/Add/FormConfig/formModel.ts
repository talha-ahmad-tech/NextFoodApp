export const FormFormModel = {
  formId: 'kit',
  formField: {
    priceType: {
      name: 'priceType',
      label: 'Price Type',
      requiredErrorMsg: 'Price Type is required',
      options: [
        {
          label: 'Price',
          name: 'Price',
          value: 1,
        },
        {
          label: 'Discount',
          name: 'Discount',
          value: 2,
        },
      ],
    },
    name: {
      name: 'name',
      label: 'Name',
      requiredErrorMsg: 'Name is required',
    },
    description: {
      name: 'description',
      label: 'Description',
      requiredErrorMsg: 'description is required',
    },
    status: {
      name: 'status',
      label: 'Status',
      requiredErrorMsg: 'Status is required',
    },
    statusId: {
      name: 'statusId',
      label: 'Status',
    },

    dateFrom: {
      name: 'dateFrom',
      label: 'Date From',
      requiredErrorMsg: 'Date From is required',
    },
    dateTill: {
      name: 'dateTill',
      label: 'Date Till',
      requiredErrorMsg: 'Date Till From is required',
    },

    /////////////////////
    code: {
      name: 'code',
      label: 'code',
      requiredErrorMsg: 'Name is required',
    },

    kitName: {
      name: 'kitName',
      label: 'Name',
      requiredErrorMsg: 'Name is required',
    },
    itemGroupId: {
      name: 'itemGroupId',
      label: 'Select Item Group',
      requiredErrorMsg: 'Item Group is required',
    },
    activeFrom: {
      name: 'activeFrom',
      label: 'Active From',
      requiredErrorMsg: 'Active From is required',
    },
    activeTo: {
      name: 'activeTo',
      label: 'Active To',
      requiredErrorMsg: 'Active To is required',
    },
    standardCost: {
      name: 'standardCost',
      label: 'Standard Cost',
      requiredErrorMsg: 'Standard Cost is required',
    },
    totalRetailPrice: {
      name: 'totalRetailPrice',
      label: 'Retail Price',
      requiredErrorMsg: 'Retail Price is required',
    },
    purchaseTaxGroupId: {
      name: 'purchaseTaxGroupId',
      label: 'Purchase Tax Group',
      requiredErrorMsg: 'Purchase Tax Group is required',
    },
    saleTaxGroupId: {
      name: 'saleTaxGroupId',
      label: 'Sale Tax Group',
      requiredErrorMsg: 'Sale Tax Group is required',
    },
    kitDetails: {
      name: 'kitDetails',
      requiredErrorMsg: 'Kit Details/Lines are required',
    },
  },
};
