import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";


import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);

  const API = import.meta.env.VITE_API_URL;   

  useEffect(() => {
    axios
      .get(`${API}/api/analytics/patient_flow`)
      .then(r => setData(r.data))
      .catch(err => console.error("Error loading analytics:", err));
  }, [API]);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div>
      <h2>Analytics Dashboard</h2>

      <Line
        data={{
          labels: data.history.map(e => e.date),
          datasets: [
            {
              label: "Admissions per Day",
              data: data.history.map(e => e.count),
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.2)"
            }
          ]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <h3>Predicted Next-Day Admissions</h3>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          {data.predicted_next_day}
        </p>
      </div>
    </div>
  );
}
