import { useState, useContext } from "react";

import { ConditionsContext } from "./Home";

import ItemSelection from "./ItemSelection";

import races from "../constants/races";
import LevelSelection from "./LevelSelection";
import GenderSelection from "./GenderSelection";

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
      <div className="race-selection">
        <ItemSelection
          includedArray={"includedRaces"}
          excludedArray={"excludedRaces"}
          items={races}
        />
      </div>
      <div className="gender-selection">
        {/* <ItemSelection
          includedArray={"includedGenders"}
          excludedArray={"excludedGenders"}
          items={[
            { itemName: "male", itemId: 1 },
            { itemName: "female", itemId: 2 },
          ]}
        /> */}
        <GenderSelection />
      </div>
      <div className="level-selection">
        <LevelSelection />
      </div>
    </>
  );
}
