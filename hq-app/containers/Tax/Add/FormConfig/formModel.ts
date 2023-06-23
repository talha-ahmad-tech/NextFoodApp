export const FormFormModel = {
  formId: 'Tax',
  formField: {
    taxId: {
      name: 'taxId',
      label: 'Tax ID',
      // requiredErrorMsg: 'Tax Id is required',
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
    taxRate: {
      name: 'taxRate',
      label: 'Tax Rate',
      requiredErrorMsg: 'tax rate is required',
    },
    taxStores: {
      name: 'stores',
      label: 'Stores',
      requiredErrorMsg: 'Store is required',
    },
    clusters: {
      name: 'clusters',
      label: 'Clusters',
      requiredErrorMsg: 'clusters is required',
    },
    taxItemGroups: {
      name: 'taxItemGroups',
      label: 'Item Groups',
      requiredErrorMsg: 'Item Group is required',
    },
    taxProducts: {
      name: 'taxProducts',
      label: 'Products',
      requiredErrorMsg: 'Product Name is required',
    },

    clustersId: {
      name: 'clustersId',
    },
    taxType: {
      name: 'taxType',
      label: 'Tax Type',
      requiredErrorMsg: 'Tax Rate required',
      options: [
        {
          label: 'SalesTax',
          name: 'SalesTax',
          value: 1,
        },
        {
          label: 'VAT',
          name: 'VAT',
          value: 2,
        },
        {
          label: ' WithholdingTax',
          name: ' WithholdingTax',
          value: 3,
        },
      ],
    },
  },
};
