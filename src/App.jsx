import React, { useEffect, useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import axios from 'axios'

// Use API URL from .env
const API = import.meta.env.VITE_API_URL;

// ------------------ HOME ------------------
const Home = () => {
  const [health, setHealth] = useState(null)
  
  useEffect(() => {
    axios.get(`${API}/api/health`)
         .then(r => setHealth(r.data.status))
         .catch(() => setHealth("offline"));
  }, [])

  return (
    <div>
      <h2>Hospital Management System</h2>
      <p>API Health Status: <strong>{String(health)}</strong></p>
    </div>
  )
}

// ------------------ ADMIN ------------------
const Admin = () => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    axios.get(`${API}/api/patients`)
         .then(r => setPatients(r.data))
  }, [])
  
  return (
    <div>
      <h3>Admin Dashboard</h3>
      <h4>All Patients</h4>
      <pre>{JSON.stringify(patients, null, 2)}</pre>
    </div>
  )
}

// ------------------ PATIENT VIEW ------------------
const Patient = () => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    axios.get(`${API}/api/patients`)
         .then(r => setPatients(r.data))
  }, [])

  return (
    <div>
      <h3>Patient Portal</h3>
      <p>Below are currently admitted patients:</p>
      <ul>
        {patients.map(p => (
          <li key={p.Patient_ID}>
            <strong>{p.Name}</strong> — Status: {p.Admitted ? "Admitted" : "Not Admitted"}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ------------------ EMPLOYEE VIEW ------------------
const Employee = () => {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    axios.get(`${API}/api/doctors`)
         .then(r => setDoctors(r.data))
  }, [])

  return (
    <div>
      <h3>Employee Portal</h3>
      <p>Hospital Doctors:</p>
      <ul>
        {doctors.map(d => (
          <li key={d.Doctor_ID}>
            <strong>{d.Name}</strong> — Specialty: {d.Specialty}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ------------------ MAIN APP ------------------
export default function App(){
  return (
    <div>
      <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd'}}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/patient">Patient</NavLink>
        <NavLink to="/employee">Employee</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/patient" element={<Patient/>}/>
        <Route path="/employee" element={<Employee/>}/>
      </Routes>
    </div>
  )
}
