import { CLUSTERS_VIEW } from './types';

export const tabsConfiguration = (Details?: CLUSTERS_VIEW) => {
  const stores = Details?.clusterStores;
  const storeKeys = stores?.map((item: any) => {
    return item?.store?.name;
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
