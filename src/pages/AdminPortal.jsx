import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPortal() {
  const [patients, setPatients] = useState([]);
  const API = import.meta.env.VITE_API_URL;   

  useEffect(() => {
    axios.get(`${API}/api/patients`)
      .then(r => setPatients(r.data))
      .catch(err => console.error("Error loading patients:", err));
  }, [API]);

  return (
    <div>
      <h2>Admin Portal</h2>

      <h3>All Patients</h3>
      <pre>{JSON.stringify(patients, null, 2)}</pre>
    </div>
  );
}
