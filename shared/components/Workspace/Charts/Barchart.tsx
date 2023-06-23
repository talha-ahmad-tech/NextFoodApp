import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  ["Apple", "Exective", "Group"],
  ["Apple", "Hospitals", "BS22"],
  ["Benifits", "Department"],
  ["HR Service", "Department"],
  ["Payroll", "Department"],
  ["Recruiting", "Department"],
];

const data = {
  labels,
  datasets: [
    {
      label: "Filled - Contingent Worker",
      data: [3500, 283, 375, 127, 281, 429],
      backgroundColor: "rgb(183, 237, 222)",
      stack: "Stack 0",
    },
    {
      label: "Filled Employees",
      data: [928, 129, 52, 219, 582, 4500],
      backgroundColor: "rgb(101, 204, 175)",
      stack: "Stack 0",
    },
    {
      label: "Open",
      data: [832, 208, 475, 527, 971, 828],
      backgroundColor: "rgb(173, 210, 255)",
      stack: "Stack 0",
    },
  ],
  hoverOffset: 4,
};

const options = {
  plugins: {
    title: {
      display: false,
    },
    legend: {
      position: "bottom" as const,
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const BarChart = () => {
  return <Bar options={options} data={data} />;
};
