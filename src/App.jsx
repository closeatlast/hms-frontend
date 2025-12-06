import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import axios from "axios";


const API = import.meta.env.VITE_API_URL;


const Home = () => {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/api/health`)
      .then((r) => setHealth(r.data.status))
      .catch(() => setHealth("offline"));
  }, []);

  return (
    <div>
      <h2>Hospital Management System</h2>
      <p>
        API Health Status: <strong>{String(health)}</strong>
      </p>
    </div>
  );
};


const Admin = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/patients`).then((r) => setPatients(r.data));
  }, []);

  return (
    <div>
      <h3>Admin Dashboard</h3>
      <h4>All Patients</h4>
      <pre>{JSON.stringify(patients, null, 2)}</pre>
    </div>
  );
};


const Patient = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/patients`).then((r) => setPatients(r.data));
  }, []);

  return (
    <div>
      <h3>Patient Portal</h3>
      <p>Below are currently admitted patients:</p>

      <ul>
        {patients.map((p) => (
          <li key={p.Patient_ID}>
            <strong>{p.Name}</strong> — Status:{" "}
            {p.Admitted ? "Admitted" : "Not Admitted"}
          </li>
        ))}
      </ul>
    </div>
  );
};


const Employee = () => {
  const employeeId = 5; 

  const [employees, setEmployees] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function loadEmployeeData() {
      try {
        const empRes = await axios.get(`${API}/api/employees`);
        const schedRes = await axios.get(`${API}/api/schedule/${employeeId}`);
        const resRes = await axios.get(`${API}/api/resources`);

        setEmployees(empRes.data);
        setSchedule(schedRes.data);
        setResources(resRes.data);
      } catch (err) {
        console.error("Employee Portal Error:", err);
      }
    }

    loadEmployeeData();
  }, []);


  const doctors = employees.filter((e) => e.Type === "Doctor");
  const nurses = employees.filter((e) => e.Type === "Nurse");
  const receptionists = employees.filter((e) => e.Type === "Receptionist");

  return (
    <div style={{ padding: "20px" }}>
      <h3>Employee Portal</h3>

      {/* DOCTORS */}
      <h4>Doctors</h4>
      {doctors.length ? (
        doctors.map((d) => (
          <div key={d.Employee_ID}>
            <strong>{d.Name}</strong> — {d.Specialty}
            <br /> Contact: {d.Contact}
            <hr />
          </div>
        ))
      ) : (
        <p>No doctors found.</p>
      )}

      {/* NURSES */}
      <h4>Nurses</h4>
      {nurses.length ? (
        nurses.map((n) => (
          <div key={n.Employee_ID}>
            <strong>{n.Name}</strong> — {n.Contact}
            <hr />
          </div>
        ))
      ) : (
        <p>No nurses found.</p>
      )}

      {/* RECEPTIONISTS */}
      <h4>Receptionists</h4>
      {receptionists.length ? (
        receptionists.map((r) => (
          <div key={r.Employee_ID}>
            <strong>{r.Name}</strong> — {r.Contact}
            <hr />
          </div>
        ))
      ) : (
        <p>No receptionists found.</p>
      )}

      {/* SCHEDULE */}
      <h4>Your Schedule</h4>
      <pre>{JSON.stringify(schedule, null, 2)}</pre>

      {/* RESOURCES */}
      <h4>Available Resources</h4>
      <pre>{JSON.stringify(resources, null, 2)}</pre>
    </div>
  );
};


export default function App() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: 12,
          padding: 12,
          borderBottom: "1px solid #444",
        }}
      >
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/patient">Patient</NavLink>
        <NavLink to="/employee">Employee</NavLink>
      </nav>
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </div>
  );
}
