import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PatientPortal() {
  const patientId = 1; // replace once login system exists

  const [visits, setVisits] = useState([]);
  const [bills, setBills] = useState([]);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL; // REQUIRED for deployment

  useEffect(() => {
    async function loadPatientData() {
      try {
        const v = await axios.get(`${API}/api/visits/${patientId}`);
        const b = await axios.get(`${API}/api/patients/${patientId}/bills`);
        const r = await axios.get(`${API}/api/recommendations/${patientId}`);

        setVisits(v.data);
        setBills(b.data);
        setRecs(r.data);
      } catch (err) {
        console.error("Patient Portal Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPatientData();
  }, [API, patientId]);

  if (loading) return <p>Loading patient portal...</p>;

  return (
    <div>
      <h2>Patient Portal</h2>

      <h3>Your Visits</h3>
      {visits.length === 0 ? (
        <p>No visits found.</p>
      ) : (
        <pre>{JSON.stringify(visits, null, 2)}</pre>
      )}

      <h3>Your Bills</h3>
      {bills.length === 0 ? (
        <p>No billing records.</p>
      ) : (
        <pre>{JSON.stringify(bills, null, 2)}</pre>
      )}

      <h3>Personalized Recommendations</h3>
      {recs.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <pre>{JSON.stringify(recs, null, 2)}</pre>
      )}
    </div>
  );
}
