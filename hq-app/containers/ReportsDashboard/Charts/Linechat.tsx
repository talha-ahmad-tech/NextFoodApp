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
import { Line } from 'react-chartjs-2';

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

const labels = [
  'Blank',
  ['Employee', 'Refferal'],
  ['Corporate', 'Website'],
  'Linkdin',
  'Headhunter',
  'Agency',
  'Facebook',
];

const dummyData = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: [42, 49, 43, 67, 34, 29, 64],
    },
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: 'rgb(53, 162, 235)',
      borderWidth: 2,
      fill: false,
      data: [2, 9, 73, 17, 94, 29, 96],
    },
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: [21, 28, 30, 54, 12, 46, 20],
    },
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderWidth: 2,
      fill: false,
      borderColor: 'rgb(255, 189, 214)',
      backgroundColor: 'rgb(255, 189, 214)',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LineChart = ({ data }: { data: any }) => {
  return <Line options={options} data={dummyData || data} />;
};
