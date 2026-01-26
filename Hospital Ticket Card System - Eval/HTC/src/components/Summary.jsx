export default function Summary({
  total,
  treated,
  notTreated,
  pending,
  onReset,
}) {
  return (
    <div>
      <h1>Session Summary</h1>
      <p>Total Patients: {total}</p>
      <p>Treated Patients: {treated}</p>
      <p>Non-Treated Patients: {notTreated}</p>
      <p>Pending Patients: {pending}</p>

      <button onClick={onReset}>Reset Session</button>
    </div>
  );
}
