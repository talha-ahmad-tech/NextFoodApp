import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: false,
    },
  },
};

const labels = [
  "Blank",
  ["Employee", "Refferal"],
  ["Corporate", "Website"],
  "Linkdin",
  "Headhunter",
  "Agency",
  "Facebook",
];

const data = {
  labels,
  datasets: [
    {
      label: "1 - Unsatisfactory",
      data: [42, 49, 43, 67, 34, 29, 64],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "2 - Need Improvement",
      data: [40, 23, 25, 23, 34, 25, 20],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgb(53, 162, 235)",
    },
    {
      label: "3 - Meet Expectations",
      data: [21, 28, 30, 54, 12, 46, 20],
      borderColor: "rgb(173, 210, 255)",
      backgroundColor: "rgb(173, 210, 255)",
    },
    {
      label: "3 - Exceeds Expectations",
      data: [25, 42, 50, 25, 23, 50, 25],
      borderColor: "rgb(99, 166, 247)",
      backgroundColor: "rgb(99, 166, 247)",
    },
    {
      label: "3 - Outstanding Performance",
      data: [33, 12, 77, 29, 21, 48, 59],
      borderColor: "rgb(255, 189, 214)",
      backgroundColor: "rgb(255, 189, 214)",
    },
  ],
};

export const LineChart = () => {
  return <Line options={options} data={data} />;
};
