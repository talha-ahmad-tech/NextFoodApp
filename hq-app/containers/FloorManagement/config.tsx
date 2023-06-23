/* eslint-disable @typescript-eslint/no-explicit-any */
import { FLOOR_DETAILS } from './types';

export const tabsConfiguration = (Details?: FLOOR_DETAILS) => {
  return [
    {
      id: '',
      label: '',
      classes: 'active',
      actions: true,
      type: 'table',
      tableData: [
        { name: 'Floor Name', value: Details?.name },
        { name: 'Floor Area Hieght ', value: Details?.height },
        { name: 'Floor Area Width ', value: Details?.width },
        { name: 'Number of Tables ', value: Details?.noOfTables },
        { name: 'Number of Seats ', value: Details?.noOfSeats },
      ],
      image: {},
    },
  ];
};
