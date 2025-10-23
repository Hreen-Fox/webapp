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
import { useRef, useMemo } from 'react';
import type { ChartDataPoint } from '../../data/ChartDataPoint';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ProgressChartProps {
  data: ChartDataPoint[];
  title?: string;
}

export default function Chart({ data, title }: ProgressChartProps) {
  const chartRef = useRef<any>(null);

  const labels = data.map((d) => d.date);
  const weights = data.map((d) => d.weight);
  const reps = data.map((d) => d.reps || null);

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Вес',
        data: weights,
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.3,
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgb(139, 92, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Повторы',
        data: reps,
        borderColor: 'transparent',
        showLine: false,
      },
    ],
  }), [data]);

  // ⭐ Плагин для рисования звезды
  const recordPlugin = useMemo(() => ({
    id: 'recordMarker',
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;
      const recordIndex = data.findIndex(d => d.isRecord);
      if (recordIndex === -1) return;

      const meta = chart.getDatasetMeta(0);
      const point = meta.data[recordIndex];
      if (!point) return;

      ctx.save();
      ctx.translate(point.x, point.y);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(0, -10);
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, -4);
        ctx.rotate(Math.PI / 5);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },
  }), [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: !!title,
        text: title || '',
        color: '#d1d5db',
        font: {
          size: 12,
          weight: 'bold' as const,
        },
        padding: { top: 10, bottom: 20 },
        align: 'start' as const,
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#d1d5db',
          font: { size: 12 },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#d1d5db', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#d1d5db', font: { size: 12 }, precision: 0 },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line ref={chartRef} data={chartData} options={options} plugins={[recordPlugin]} />
    </div>
  );
}
