export default function PatientCard({ patient, onMark, isLocked }) {
  return (
    <div className="card">
      <h2>Patient Ticket</h2>
      <p>
        <b>Name:</b> {patient.name}
      </p>
      <p>
        <b>Age:</b> {patient.age}
      </p>
      <p>
        <b>Problem:</b> {patient.problem}
      </p>
      <p>
        <b>Doctor:</b> {patient.doctor}
      </p>

      <div className="actions">
        <button disabled={isLocked} onClick={() => onMark("treated")}>
          Treated
        </button>
        <button disabled={isLocked} onClick={() => onMark("not")}>
          Non-Treated
        </button>
      </div>
      {isLocked && <p className="locked">Status Locked</p>}
    </div>
  );
}
