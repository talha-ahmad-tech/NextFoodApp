export const FormFormModel = {
  formId: 'paymentMethod',
  formField: {
    code: {
      name: 'code',
      label: 'Payment Method ID',
      // requiredErrorMsg: 'payment method is required',
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
    position: {
      name: 'position',
      label: 'Position',
      requiredErrorMsg: 'position is required',
    },
    orderSource: {
      name: 'orderSource',
      label: 'Order Source',
      requiredErrorMsg: 'Order Source required',
      options: [
        {
          label: 'WLA Web',
          name: 'WLA Web',
          value: 1,
        },
        {
          label: 'WLA Mobile',
          name: 'WLA Mobile',
          value: 2,
        },
        {
          label: 'POS',
          name: 'POS',
          value: 3,
        },
      ],
    },
  },
};
