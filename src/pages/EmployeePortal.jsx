import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeePortal() {
  const employeeId = 5; // example logged-in employee

  const [employees, setEmployees] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL; // your backend

  useEffect(() => {
    async function loadPortalData() {
      try {
        // Load ALL employees (includes Doctor, Nurse, Receptionist)
        const employeeRes = await axios.get(`${API}/api/employees`);

        // Load schedule
        const scheduleRes = await axios.get(`${API}/api/schedule/${employeeId}`);

        // Load resources
        const resourcesRes = await axios.get(`${API}/api/resources`);

        setEmployees(employeeRes.data);
        setSchedule(scheduleRes.data);
        setResources(resourcesRes.data);
      } catch (err) {
        console.error("Employee Portal Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPortalData();
  }, [API]);

  if (loading) return <p>Loading employee portal...</p>;

  // Separate employee types
  const doctors = employees.filter(e => e.Type === "Doctor");
  const nurses = employees.filter(e => e.Type === "Nurse");
  const receptionists = employees.filter(e => e.Type === "Receptionist");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Portal</h2>

      {/* DOCTORS */}
      <h3>Doctors</h3>
      {doctors.length === 0 ? (
        <p>No doctors registered.</p>
      ) : (
        doctors.map(doc => (
          <div key={doc.Employee_ID} style={{ marginBottom: "10px" }}>
            <strong>{doc.Name}</strong> — {doc.Specialty}
            <br />
            Contact: {doc.Contact}
            <hr />
          </div>
        ))
      )}

      {/* NURSES */}
      <h3>Nurses</h3>
      {nurses.length === 0 ? (
        <p>No nurses registered.</p>
      ) : (
        nurses.map(n => (
          <div key={n.Employee_ID} style={{ marginBottom: "10px" }}>
            <strong>{n.Name}</strong>
            <br />
            Contact: {n.Contact}
            <hr />
          </div>
        ))
      )}

      {/* RECEPTIONISTS */}
      <h3>Receptionists</h3>
      {receptionists.length === 0 ? (
        <p>No receptionists registered.</p>
      ) : (
        receptionists.map(r => (
          <div key={r.Employee_ID} style={{ marginBottom: "10px" }}>
            <strong>{r.Name}</strong>
            <br />
            Contact: {r.Contact}
            <hr />
          </div>
        ))
      )}

      {/* SCHEDULE */}
      <h3>Your Schedule</h3>
      {schedule.length === 0 ? (
        <p>No schedule assigned.</p>
      ) : (
        <pre>{JSON.stringify(schedule, null, 2)}</pre>
      )}

      {/* RESOURCES */}
      <h3>Available Resources</h3>
      {resources.length === 0 ? (
        <p>No resources available.</p>
      ) : (
        <pre>{JSON.stringify(resources, null, 2)}</pre>
      )}
    </div>
  );
}
