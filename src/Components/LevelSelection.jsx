import { useState, useContext } from "react";
import { ConditionsContext } from "./Home";
export default function LevelSelection() {
  const { currentConditions, setCurrentConditions } =
    useContext(ConditionsContext);

  const setLevel = (minOrMax, level) => {
    const newConditions = { ...currentConditions };
    newConditions[minOrMax] = level;
    setCurrentConditions(newConditions);
  };

  return (
    <>
      <h3>Set Min or Max Level</h3>
      <p>Set to 0 for no min or max </p>
      <div className="min-level">
        <p>Min Level</p>
        <input
          type="range"
          min="0"
          max="200"
          value={currentConditions.minLevel}
          onChange={(e) => setLevel("minLevel", e.target.value)}
        />
        <span>{currentConditions.minLevel}</span>
      </div>
      <div className="max-level">
        <p>Max Level</p>
        <input
          type="range"
          min="0"
          max="200"
          value={currentConditions.maxLevel}
          onChange={(e) => setLevel("maxLevel", e.target.value)}
        />
        <span>{currentConditions.maxLevel}</span>
      </div>
    </>
  );
}
