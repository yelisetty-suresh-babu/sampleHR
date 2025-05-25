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
interface DepartmentWiseRatingsChartProps {
  values: Record<string, number> | undefined;
}
const DepartmentWiseRatingsChart = ({
  values,
}: DepartmentWiseRatingsChartProps) => {
  if (!values) return <></>;
  const data = {
    labels: Object.keys(values),
    datasets: [
      {
        label: "Ratings",
        data: Object.values(values),
        borderColor: "rgba(75, 192, 252, 1)",
        backgroundColor: "rgba(175, 92, 192, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This is key for full space usage
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
          text: "Department",
        },
      },
      y: {
        title: {
          display: true,
          text: "Ratings",
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

export default DepartmentWiseRatingsChart;
