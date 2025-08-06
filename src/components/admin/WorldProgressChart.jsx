// src/components/admin/WorldProgressChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorldProgressChart = ({ chartData }) => {
  const data = {
    labels: chartData.labels || [],
    datasets: [
      {
        label: 'Progreso Promedio (%)',
        data: chartData.data || [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Hace el gráfico de barras horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Progreso Promedio por Mundo' },
    },
    scales: {
        x: {
            beginAtZero: true,
            max: 100, // El progreso máximo es 100%
        }
    }
  };

  return <Bar data={data} options={options} />;
};

export default WorldProgressChart;