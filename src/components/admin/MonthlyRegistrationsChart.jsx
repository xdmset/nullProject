import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyRegistrationsChart = ({ chartData }) => {
  const data = {
    labels: chartData.labels || [],
    datasets: [
      {
        label: 'Nuevos Usuarios por Mes',
        data: chartData.data || [],
        backgroundColor: '#412DB2',
        maxBarThickness: 50, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Registros Mensuales de Usuarios' },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1
            }
        }
    }
  };

  return <Bar data={data} options={options} />;
};

export default MonthlyRegistrationsChart;