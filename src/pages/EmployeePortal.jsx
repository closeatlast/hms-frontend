import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeePortal() {
  const employeeId = 5; // Example logged-in employee

  const [schedule, setSchedule] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;  // <<< REQUIRED FOR DEPLOYMENT

  useEffect(() => {
    async function loadEmployeeData() {
      try {
        const scheduleRes = await axios.get(`${API}/api/schedule/${employeeId}`);
        const resourcesRes = await axios.get(`${API}/api/resources`);

        setSchedule(scheduleRes.data);
        setResources(resourcesRes.data);
      } catch (err) {
        console.error("Employee Portal Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadEmployeeData();
  }, [API, employeeId]);

  if (loading) return <p>Loading employee portal...</p>;

  return (
    <div>
      <h2>Employee Portal</h2>

      <h3>Your Schedule</h3>
      {schedule.length === 0 ? (
        <p>No schedule assigned.</p>
      ) : (
        <pre>{JSON.stringify(schedule, null, 2)}</pre>
      )}

      <h3>Available Resources</h3>
      {resources.length === 0 ? (
        <p>No resources available.</p>
      ) : (
        <pre>{JSON.stringify(resources, null, 2)}</pre>
      )}
    </div>
  );
}
