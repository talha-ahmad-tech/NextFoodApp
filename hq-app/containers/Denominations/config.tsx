import { DENOMINATIONS_VIEW } from './types';

export const tabsConfiguration = (Details: DENOMINATIONS_VIEW) => {
  return [
    {
      id: '',
      label: '',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Name', value: Details?.name },
        { name: 'Description', value: Details?.description },
        { name: 'Position', value: Details?.position },
      ],
      image: {},
    },
  ];
};
