export default function PatientCard({ patient, onMark, isLocked }) {
  return (
    <div>
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

      <div>
        <button disabled={isLocked} onClick={() => onMark("treated")}>
          Treated
        </button>
        <button disabled={isLocked} onClick={() => onMark("not")}>
          Non-Treated
        </button>
      </div>
      {isLocked && <p>Status Locked</p>}
    </div>
  );
}
