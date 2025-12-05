// ------------------ EMPLOYEE VIEW ------------------
const Employee = () => {
  const employeeId = 5; // logged-in employee (placeholder)

  const [employees, setEmployees] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const empRes = await axios.get(`${API}/api/employees`);
        const schedRes = await axios.get(`${API}/api/schedule/${employeeId}`);
        const resRes = await axios.get(`${API}/api/resources`);

        setEmployees(empRes.data);
        setSchedule(schedRes.data);
        setResources(resRes.data);
      } catch (err) {
        console.error("Employee portal error:", err);
      }
    }

    loadData();
  }, []);

  // Split employees by type
  const doctors = employees.filter(e => e.Type === "Doctor");
  const nurses = employees.filter(e => e.Type === "Nurse");
  const receptionists = employees.filter(e => e.Type === "Receptionist");

  return (
    <div style={{ padding: "20px" }}>
      <h3>Employee Portal</h3>

      {/* Doctors */}
      <h4>Doctors</h4>
      {doctors.length ? doctors.map(d => (
        <p key={d.Employee_ID}><strong>{d.Name}</strong> — {d.Specialty}</p>
      )) : <p>No doctors found.</p>}

      {/* Nurses */}
      <h4>Nurses</h4>
      {nurses.length ? nurses.map(n => (
        <p key={n.Employee_ID}><strong>{n.Name}</strong> — {n.Contact}</p>
      )) : <p>No nurses found.</p>}

      {/* Receptionists */}
      <h4>Receptionists</h4>
      {receptionists.length ? receptionists.map(r => (
        <p key={r.Employee_ID}><strong>{r.Name}</strong> — {r.Contact}</p>
      )) : <p>No receptionists found.</p>}

      {/* Schedule */}
      <h4>Your Schedule</h4>
      <pre>{JSON.stringify(schedule, null, 2)}</pre>

      {/* Resources */}
      <h4>Available Resources</h4>
      <pre>{JSON.stringify(resources, null, 2)}</pre>
    </div>
  );
};
