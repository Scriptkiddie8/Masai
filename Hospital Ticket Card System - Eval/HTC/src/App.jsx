import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import { localStorageKeys } from "./utils/localStorageKeys";
import PatientCard from "./components/PatientCard";
import Summary from "./components/Summary";
import { patients } from "./data/Patients";
import "./App.css";

const Session_Time = 15 * 60;

function App() {
  const [currentIndex, setCurrentIndex] = useState(
    Number(localStorage.getItem(localStorageKeys.CURRENT_PATIENT)) || 0,
  );

  const [treated, setTreated] = useState(
    JSON.parse(localStorage.getItem(localStorageKeys.TREATED)) || [],
  );

  const [notTreated, setNotTreated] = useState(
    JSON.parse(localStorage.getItem(localStorageKeys.NOT_TREATED)) || [],
  );

  const [timer, setTimer] = useState(
    Number(localStorage.getItem(localStorageKeys.TIMER)) || Session_Time,
  );

  const [sessionEnded, setSessionEnded] = useState(false);

  const currentPatient = patients[currentIndex];

  useEffect(() => {
    if (timer <= 0) {
      setSessionEnded(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.CURRENT_PATIENT, currentIndex);
    localStorage.setItem(localStorageKeys.TREATED, JSON.stringify(treated));
    localStorage.setItem(
      localStorageKeys.NOT_TREATED,
      JSON.stringify(notTreated),
    );
    localStorage.setItem(localStorageKeys.TIMER, timer);
  }, [currentIndex, treated, notTreated, timer]);

  const markStatus = (status) => {
    if (
      treated.includes(currentPatient.id) ||
      notTreated.includes(currentPatient.id)
    ) {
      return;
    }

    status == "treated"
      ? setTreated([...treated, currentPatient.id])
      : setNotTreated([...notTreated, currentPatient.id]);
  };

  const pending = patients.length - treated.length - notTreated.length;

  const resetSession = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (sessionEnded || pending == 0) {
    return (
      <Summary
        total={patients.length}
        treated={treated.length}
        notTreated={notTreated.length}
        pending={pending}
        onReset={resetSession}
      />
    );
  }

  const isLocked =
    treated.includes(currentPatient.id) ||
    notTreated.includes(currentPatient.id);

  return (
    <div className="container">
      <h1>Hospital OPD System</h1>
      <Timer time={timer} />

      <p>
        Patient {currentIndex + 1} / {patients.length}
      </p>

      <PatientCard
        patient={currentPatient}
        onMark={markStatus}
        isLocked={isLocked}
      />

      <div className="navigation">
        <button
          disabled={currentIndex == 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          previous
        </button>
        <button
          disabled={currentIndex == patients.length}
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          Next
        </button>
      </div>

      <div className="stats">
        <p>Treated: {treated.length}</p>
        <p>Not-Treated: {notTreated.length}</p>
        <p>Pending: {pending}</p>
      </div>
    </div>
  );
}

export default App;
