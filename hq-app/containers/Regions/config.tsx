import { REGIONS_VIEW } from './types';

export const tabsConfiguration = (Details?: REGIONS_VIEW) => {
  const stores = Details?.regionStores;

  const storeKeys = stores?.map((item: { storeId: string }) => {
    return item.storeId;
  });
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
        {
          name: 'Stores',
          value: stores ? storeKeys.join() : '-',
        },
      ],
      image: {},
    },
  ];
};
