import { useState, useContext } from "react";

import { ConditionsContext } from "./Home";

import ItemSelection from "./ItemSelection";

import races from "../constants/races";
import LevelSelection from "./LevelSelection";
import GenderSelection from "./GenderSelection";
import StanceSelection from "./StanceSelection";

export default function MiscOptions() {
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
        <GenderSelection />
      </div>
      <div className="level-selection">
        <LevelSelection />
      </div>
      <div className="stance-selection">
        <StanceSelection />
      </div>
    </>
  );
}
