export const FormFormModel = {
  formId: 'numberSeries',
  formField: {
    Module: {
      name: 'Module',
      label: 'Module',
      requiredErrorMsg: 'Module is required',
    },
    form: {
      name: 'form',
      label: 'Form',
      requiredErrorMsg: 'Form is required',
    },
    min: {
      name: 'min',
      label: 'To Number',
    },

    max: {
      name: 'max',
      label: 'Till Number',
      requiredErrorMsg: 'Till Number is required',
    },
    minNumber: {
      name: 'minNumber',
    },

    maxNumber: {
      name: 'maxNumber',
    },
    type: {
      name: 'type',
      label: 'Product Type',
      options: [
        {
          name: 'Finished Product',
          value: 1,
          id: 1,
        },
        {
          name: 'Ingredients',
          value: 2,
          id: 2,
        },
        {
          name: 'Packaging Material',
          value: 3,
          id: 3,
        },
        {
          name: 'Deal',
          value: 4,
          id: 4,
        },
      ],
      requiredErrorMsg: 'Product Type is required',
    },
    isOverwrite: {
      name: 'isOverwrite',
      label: 'Overwrite Number',
      requiredErrorMsg: 'OverwriteN umber is required',
    },
    category: {
      name: 'category',
      label: 'Category ',
      options: [
        {
          name: 'Burgers',
          value: 1,
          id: 1,
        },
        {
          name: 'Sandwiches',
          value: 2,
          id: 2,
        },
        {
          name: 'Pizza',
          value: 3,
          id: 3,
        },
        {
          name: 'Wraps',
          value: 4,
          id: 4,
        },
        {
          name: 'Drinks',
          value: 5,
          id: 5,
        },
      ],
      requiredErrorMsg: 'Category  is required',
    },
    continuous: {
      name: 'continuous',
      label: 'Continuous Number ',
      requiredErrorMsg: 'Continuous Number  is required',
    },
    prefix: {
      name: 'prefix',
      label: 'Prefix ',
      requiredErrorMsg: 'Prefix  is required',
    },
    suffix: {
      name: 'suffix',
      label: 'Suffix ',
      requiredErrorMsg: 'Suffix  is required',
    },
  },
};
