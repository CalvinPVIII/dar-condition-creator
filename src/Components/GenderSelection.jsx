import { useState, useContext } from "react";
import { ConditionsContext } from "./Home";
export default function LevelSelection() {
  const { currentConditions, setCurrentConditions } =
    useContext(ConditionsContext);

  const addGenders = (gender, checked) => {
    const newConditions = { ...currentConditions };
    if (checked) {
      newConditions.specificGender = gender;
    } else {
      newConditions.specificGender = "";
    }
    setCurrentConditions(newConditions);
  };

  return (
    <>
      <h3>Select Gender</h3>

      <div className="select-gender">
        <label>
          None Specified
          <input
            type="radio"
            name="gender"
            onChange={(e) => addGenders("none", e.target.checked)}
          />
        </label>
        <label>
          Male
          <input
            type="radio"
            name="gender"
            onChange={(e) => addGenders("male", e.target.checked)}
          />
        </label>
        <label>
          Female
          <input
            type="radio"
            name="gender"
            onChange={(e) => addGenders("female", e.target.checked)}
          />
        </label>
      </div>
    </>
  );
}
