import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

let options = {
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

const chartData = [64, 25, 11, 36, 84, 0];
const data: any = {
  labels: [],
  datasets: [
    {
      label: '# of Votes',
      data: chartData,
      backgroundColor: [
        'rgb(101, 204, 175)',
        'rgb(183, 237, 222)',
        'rgb(173, 210, 255)',
        'rgb(99, 166, 247)',
        'rgb(255, 189, 214)',
        'rgb(255, 92, 154)',
        'rgb(253, 212, 159)',
      ],
      borderColor: [
        'rgb(101, 204, 175)',
        'rgb(183, 237, 222)',
        'rgb(173, 210, 255)',
        'rgb(99, 166, 247)',
        'rgb(255, 189, 214)',
        'rgb(255, 92, 154)',
        'rgb(253, 212, 159)',
      ],
      borderWidth: 1,
    },
  ],
  hoverOffset: 4,
};
const labels: string[] = [
  'Social Network -> Linkdin',
  'Website -> Corprate Website',
  'Social Network -> Facebook',
  'Refferal ->  Employee Refferal',
  'Recuirement Agency',
  'Webstie -> Mostar',
  'Employees -> Current Employees',
];
export const DoughnutChart = ({ noLabels }: { noLabels?: boolean }) => {
  const withLabelsData = { ...data };
  withLabelsData['labels'] = labels;
  const formattedData = noLabels ? data : withLabelsData;
  const plugins = [
    {
      id: 'doughnutId',
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
      data={formattedData}
      options={options}
      plugins={noLabels ? plugins : []}
    />
  );
};
