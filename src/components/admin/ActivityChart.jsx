// src/components/admin/ActivityChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

const ActivityChart = ({ chartData }) => {
  const data = {
    labels: chartData.labels || [],
    datasets: [
      {
        label: 'Nuevos Usuarios',
        data: chartData.data || [],
        fill: true,
        backgroundColor: 'rgba(65, 45, 178, 0.2)',
        borderColor: '#412DB2',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Registros de Usuarios en los Últimos 7 Días' },
    },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  return <Line data={data} options={options} />;
};

export default ActivityChart;