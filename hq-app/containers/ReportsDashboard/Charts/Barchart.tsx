// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// const labels = [
//   ['Apple', 'Exective', 'Group'],
//   ['Apple', 'Hospitals', 'BS22'],
//   ['Benifits', 'Department'],
//   ['HR Service', 'Department'],
//   ['Payroll', 'Department'],
//   ['Recruiting', 'Department'],
// ];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Filled - Contingent Worker',
//       data: [3500, 283, 375, 127, 281, 429],
//       backgroundColor: 'rgb(183, 237, 222)',
//       // stack: 'Stack 0',
//     },
//     {
//       label: 'Filled Employees',
//       data: [928, 129, 52, 219, 582, 4500],
//       backgroundColor: 'rgb(101, 204, 175)',
//       // stack: 'Stack 0',
//     },
//     {
//       label: 'Open',
//       data: [832, 208, 475, 527, 971, 828],
//       backgroundColor: 'rgb(173, 210, 255)',
//       // stack: 'Stack 0',
//     },
//   ],
//   // hoverOffset: 4,
// };

// const options = {
//   plugins: {
//     title: {
//       display: false,
//     },
//     legend: {
//       position: 'bottom' as const,
//     },
//   },
//   responsive: true,
//   interaction: {
//     mode: 'index' as const,
//     intersect: false,
//   },
//   scales: {
//     x: {
//       beginAtZero: true,
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       beginAtZero: true,
//       grid: {
//         display: false,
//       },
//     },
//   },
// };

// export const BarChart = ({ horizontal }: { horizontal?: boolean }) => {
//   const option = horizontal ? { ...options, indexAxis: 'y' as const } : options;
//   return <Bar options={option} data={data} />;
// };

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
    },
  },
};

export const BarChart = ({
  data,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) => {
  const records = [] as number[];
  data?.forEach((items: { orderCount: number }) => {
    records.push(items?.orderCount);
  });
  const formattedData = {
    labels: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
    ],
    datasets: [
      {
        type: 'bar' as const,
        label: ['Hourly'],
        backgroundColor: 'rgba(255, 231, 0, 1)',
        data: records,
        borderColor: 'white',
        borderWidth: 2,
        barThickness: 30,
        borderRadius: 30,
      },
    ],
  };

  return (
    <Bar
      options={options}
      data={formattedData as { datasets: []; labels: [] }}
    />
  );
};
