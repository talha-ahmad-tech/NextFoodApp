import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: 98,
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
    },
  },
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
};

const chartData = [1, 1, 0];
const backgroundColor = [
  'rgba(255, 231, 0, 1)',
  'rgb(183, 237, 222)',
  'rgb(173, 210, 255)',
  'rgb(99, 166, 247)',
  'rgb(255, 189, 214)',
  'rgb(255, 92, 154)',
  'rgb(253, 212, 159)',
];
const borderColor = [
  'rgba(255, 231, 0, 1)',
  'rgb(183, 237, 222)',
  'rgb(173, 210, 255)',
  'rgb(99, 166, 247)',
  'rgb(255, 189, 214)',
  'rgb(255, 92, 154)',
  'rgb(253, 212, 159)',
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dummyData: any = (data: []) => ({
  labels: [],
  datasets: [
    {
      label: '# of sales by order type',
      data,
      backgroundColor,
      borderColor,
      borderWidth: 1,
    },
  ],
  hoverOffset: 4,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DoughnutChart = ({
  noLabels,
  data,
}: {
  noLabels?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) => {
  const withLabelsData = { ...dummyData(data?.data) };
  withLabelsData['labels'] = data?.label?.length ? data?.label : [];
  const formattedData = noLabels ? dummyData() : withLabelsData;
  const plugins = [
    {
      id: 'doughnutId',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      beforeDraw(chart: any) {
        const { width } = chart;
        const { height } = chart;
        const { ctx } = chart;
        ctx.restore();
        const fontSize = (height / 100).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'top';
        const text = chartData.reduce((prev: number, current: number) => {
          prev += current;
          return prev;
        }, 0);
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2.5;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];
  return (
    <Doughnut
      data={formattedData || data}
      options={options}
      plugins={noLabels ? plugins : []}
    />
  );
};
