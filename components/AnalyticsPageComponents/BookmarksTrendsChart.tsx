import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const BookmarksTrendsChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Trends",
        data: [120, 190, 300, 500, 200],
        borderColor: "rgba(255,50, 100, 0.5)",
        backgroundColor: "rgba(175, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[600px] shadow-xl p-10 rounded-2xl bg-white">
      <Line data={data} options={options} />
    </div>
  );
};

export default BookmarksTrendsChart;
