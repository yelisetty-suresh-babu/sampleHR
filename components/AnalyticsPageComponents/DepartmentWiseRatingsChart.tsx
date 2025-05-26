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
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";
  console.log("dark", isDark);

  if (!values) return <></>;

  const data = {
    labels: Object.keys(values),
    datasets: [
      {
        label: "Ratings",
        data: Object.values(values),
        borderColor: isDark ? "rgba(96, 165, 250, 1)" : "rgba(75, 192, 252, 1)",
        backgroundColor: isDark
          ? "rgba(96, 165, 250, 0.1)"
          : "rgba(175, 92, 192, 0.2)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: isDark
          ? "rgba(96, 165, 250, 1)"
          : "rgba(75, 192, 252, 1)",
        pointBorderColor: isDark
          ? "rgba(147, 197, 253, 1)"
          : "rgba(59, 130, 246, 1)",
        pointHoverBackgroundColor: isDark
          ? "rgba(147, 197, 253, 1)"
          : "rgba(59, 130, 246, 1)",
        pointHoverBorderColor: isDark
          ? "rgba(96, 165, 250, 1)"
          : "rgba(75, 192, 252, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "rgba(243, 244, 246, 1)" : "rgba(55, 65, 81, 1)",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: isDark
          ? "rgba(31, 41, 55, 0.9)"
          : "rgba(255, 255, 255, 0.95)",
        titleColor: isDark ? "rgba(243, 244, 246, 1)" : "rgba(55, 65, 81, 1)",
        bodyColor: isDark ? "rgba(209, 213, 219, 1)" : "rgba(75, 85, 99, 1)",
        borderColor: isDark ? "rgba(75, 85, 99, 1)" : "rgba(209, 213, 219, 1)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Department",
          color: isDark ? "rgba(209, 213, 219, 1)" : "rgba(75, 85, 99, 1)",
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
        ticks: {
          color: isDark ? "rgba(156, 163, 175, 1)" : "rgba(107, 114, 128, 1)",
          font: {
            size: 11,
          },
        },
        grid: {
          color: isDark ? "rgba(75, 85, 99, 0.3)" : "rgba(229, 231, 235, 0.8)",
          borderColor: isDark
            ? "rgba(107, 114, 128, 0.5)"
            : "rgba(209, 213, 219, 1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Ratings",
          color: isDark ? "rgba(209, 213, 219, 1)" : "rgba(75, 85, 99, 1)",
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
        ticks: {
          color: isDark ? "rgba(156, 163, 175, 1)" : "rgba(107, 114, 128, 1)",
          font: {
            size: 11,
          },
        },
        grid: {
          color: isDark ? "rgba(75, 85, 99, 0.3)" : "rgba(229, 231, 235, 0.8)",
          borderColor: isDark
            ? "rgba(107, 114, 128, 0.5)"
            : "rgba(209, 213, 219, 1)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[600px] shadow-xl dark:shadow-2xl p-10 rounded-2xl  transition-colors duration-200 ">
      <Line data={data} options={options} />
    </div>
  );
};

export default DepartmentWiseRatingsChart;
