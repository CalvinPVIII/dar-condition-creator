import { useState, useContext } from "react";

import { ConditionsContext } from "./Home";

import RaceSelection from "./RaceSelection";
import ItemSelection from "./ItemSelection";

import races from "../constants/races";

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
      <ItemSelection
        includedArray={"includedRaces"}
        excludedArray={"excludedRaces"}
        items={races}
      />
    </>
  );
}
