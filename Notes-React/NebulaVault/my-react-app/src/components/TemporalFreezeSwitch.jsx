import React from "react";

const TemporalFreezeSwitch = ({ freeze, setFreeze }) => {
  return (
    <div className="freeze-switch">
      <label>
        Temporal Freeze:
        <input
          type="checkbox"
          checked={freeze}
          onChange={() => setFreeze(!freeze)}
        />
      </label>
    </div>
  );
};

export default TemporalFreezeSwitch;
