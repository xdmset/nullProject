// src/components/admin/MaterialChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MaterialChart = ({ chartData }) => {
  const data = {
    labels: chartData.labels || [],
    datasets: [
      {
        label: '# de Materiales',
        data: chartData.data || [],
        backgroundColor: [
          'rgba(65, 45, 178, 0.7)',  // Morado
          'rgba(0, 94, 184, 0.7)',   // Azul
          'rgba(34, 159, 169, 0.7)', // Verde
        ],
        borderColor: [
          '#FFFFFF',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Material Didáctico',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default MaterialChart;