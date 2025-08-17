import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TaskAnalytics = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks",
        data: [5, 10, 8, 15, 20, 18, 25],
        fill: true,
        borderColor: "#ff4081",
        backgroundColor: "rgba(255,64,129,0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.2,
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 6,
        displayColors: false,
        padding: 8
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)',
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 5,
          font: {
            size: 11
          },
          color: '#666'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#666'
        }
      }
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="card-head d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Task Analytics</h5>
        <button className="link-viewall">View All</button>
      </div>
      <div className="flex-grow-1 analytics-chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TaskAnalytics;
