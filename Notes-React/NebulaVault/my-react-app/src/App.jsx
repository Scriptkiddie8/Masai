import { useState } from "react";
import "./App.css";
import universeTab from "./components/UniverseTab";
import TemporalFreezeSwitch from "./components/TemporalFreezeSwitch";
import TabBar from "./components/TabBar";
import "./style.css";

const universe = ["artifacts", "creatures", "logs"];

function App() {
  const [activeUniverse, setActiveUniverse] = useState(universe[0]);
  const [freeze, setFreeze] = useState(false);
  return (
    <>
      <div>
        <h1>NebulaVault</h1>
        <TemporalFreezeSwitch freeze={freeze} setFreeze={setFreeze} />
        <TabBar
          universe={universe}
          activeUniverse={activeUniverse}
          setActiveUniverse={setActiveUniverse}
        />
        {universe.map((u) => (
          <div key={u}>
            <UniverseTab universe={u} freeze={freeze} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
