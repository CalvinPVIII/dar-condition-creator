import { useState, useContext } from "react";

import { ConditionsContext } from "./Home";

import RaceSelection from "./RaceSelection";

export default function MiscOptions() {
  //   const { currentConditions, setCurrentConditions } =
  //     useContext(ConditionsContext);

  //   const addToConditions = (conditions) => {
  //     const newConditions = { ...currentConditions, conditions };
  //     console.log(newConditions);
  //   };

  return (
    <>
      <h3>Add Misc Options</h3>
      <RaceSelection />
    </>
  );
}
