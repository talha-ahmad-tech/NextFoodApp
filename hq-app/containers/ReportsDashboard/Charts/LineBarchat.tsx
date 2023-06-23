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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LineBarChart = ({
  data = [],
}: {
  data: {
    type: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth: number;
    barThickness: number;
    borderRadius: number;
    data: [];
    label: [];
  }[];
}) => {
  const labels: { label: string[] } = (data?.length && data[0]) || {
    label: [],
  };

  const payload = data?.map((items: object, index: number) => {
    if (index === 0) {
      items = {
        ...items,
        type: 'bar' as const,
        backgroundColor: 'rgba(255, 231, 0, 1)',
        borderColor: 'white',
        borderWidth: 2,
        barThickness: 30,
        borderRadius: 30,
      };
    } else {
      items = {
        ...items,
        type: 'line' as const,
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
      };
    }
    return items;
  });
  const formattedData = {
    labels: [...(labels?.label as string[])],
    datasets: payload,
  };
  return (
    <Line
      options={options}
      data={formattedData as { datasets: []; labels: [] }}
    />
  );
};
