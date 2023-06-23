import { KITCHEN_DETAILS } from './types';
export const tabsConfiguration = (kitchenDetails: KITCHEN_DETAILS) => {
  const { name, description, categoryName } = kitchenDetails;

  return [
    {
      id: '',
      label: '',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Name', value: name },
        { name: 'Description', value: description },
        // {
        //   name: 'Item Group',
        //   value: itemGroupName,
        // },
        {
          name: 'Product Category',
          value: categoryName,
        },
      ],
      image: {},
    },
  ];
};
