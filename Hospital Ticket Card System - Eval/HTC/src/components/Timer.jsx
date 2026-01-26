export default function Timer({ time }) {
  const min = Math.floor(time / 60);
  const sec = String(time % 60).padStart(2, "0");

  return (
    <h3>
      Session Time Remaining:{" "}
      <b>
        {min}:{sec}
      </b>
    </h3>
  );
}
