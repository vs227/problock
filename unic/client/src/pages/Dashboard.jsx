import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const holdings = [
    { title: "Avenue City", value: "₹5,00,000", yield: 9 },
    { title: "PS Platina", value: "₹3,00,000", yield: 9 },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Portfolio Value",
        data: [800000, 820000, 860000, 880000, 900000, 940000],
        borderColor: "#0D47A1",
        backgroundColor: "rgba(13,71,161,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">My Investment Dashboard</h1>

        {/* Holdings Section */}
        <div className="holdings-section">
          {holdings.map((item, idx) => (
            <div key={idx} className="holding-card">
              <h3>{item.title}</h3>
              <p><strong>Value:</strong> {item.value}</p>
              <div className="yield-chart">
                <CircularProgressbar
                  value={item.yield}
                  maxValue={20}
                  text={`${item.yield}%`}
                  styles={buildStyles({
                    textSize: "16px",
                    pathColor: "#0D47A1",
                    textColor: "#000",
                    trailColor: "#eee",
                  })}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Growth */}
        <div className="chart-section">
          <h2>Portfolio Growth</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
