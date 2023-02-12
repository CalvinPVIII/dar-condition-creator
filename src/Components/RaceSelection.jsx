import { useState, useContext } from "react";

import { ConditionsContext } from "./Home";

export default function RaceSelection() {
  const [checkedStatus, setCheckedStatus] = useState({
    Argonian: {
      excludedRaces: false,
      includedRaces: false,
    },
    Breton: {
      excludedRaces: false,
      includedRaces: false,
    },
    "Dark Elf": {
      excludedRaces: false,
      includedRaces: false,
    },
    "High Elf": {
      excludedRaces: false,
      includedRaces: false,
    },
    Imperial: {
      excludedRaces: false,
      includedRaces: false,
    },
    Khajiit: {
      excludedRaces: false,
      includedRaces: false,
    },
    Nord: {
      excludedRaces: false,
      includedRaces: false,
    },
    Orc: {
      excludedRaces: false,
      includedRaces: false,
    },
    Redguard: {
      excludedRaces: false,
      includedRaces: false,
    },
    "Wood Elf": {
      excludedRaces: false,
      includedRaces: false,
    },
  });

  const [includedOrExcludedRaces, setIncludedOrExcludedRaces] =
    useState("includedRaces");

  const [opacity, setOpacity] = useState({
    included: 1,
    excluded: 0.5,
  });

  const handleIncludeExcludeRaceToggle = (includeOrExclude) => {
    if (includeOrExclude === "includedRaces") {
      setIncludedOrExcludedRaces("includedRaces");
      setOpacity({
        included: 1,
        excluded: 0.5,
      });
    } else if (includeOrExclude === "excludedRaces") {
      setIncludedOrExcludedRaces("excludedRaces");
      setOpacity({
        included: 0.5,
        excluded: 1,
      });
    }
  };

  const { currentConditions, setCurrentConditions } =
    useContext(ConditionsContext);

  const addToConditions = (raceSelection) => {
    let newConditions = { ...currentConditions };
    toggleChecked(raceSelection);
    if (!currentConditions[includedOrExcludedRaces].includes(raceSelection)) {
      newConditions[includedOrExcludedRaces].push(raceSelection);
    } else {
      newConditions[includedOrExcludedRaces].splice(
        newConditions[includedOrExcludedRaces].indexOf(raceSelection),
        1
      );
    }
    setCurrentConditions(newConditions);
  };

  const toggleChecked = (raceSelection) => {
    const newCheckedStatus = { ...checkedStatus };
    newCheckedStatus[raceSelection][includedOrExcludedRaces] =
      !newCheckedStatus[raceSelection][includedOrExcludedRaces];
    setCheckedStatus(newCheckedStatus);
  };

  return (
    <div className="select-race-section">
      <h3>
        <span
          onClick={() => handleIncludeExcludeRaceToggle("includedRaces")}
          style={{ opacity: opacity.included }}
        >
          Add Races
        </span>
        ||
        <span
          onClick={() => handleIncludeExcludeRaceToggle("excludedRaces")}
          style={{ opacity: opacity.excluded }}
        >
          Exclude Races
        </span>
      </h3>

      {Object.keys(checkedStatus).map((race) => (
        <label key={race}>
          <input
            type="checkbox"
            checked={checkedStatus[race][includedOrExcludedRaces]}
            onChange={() => addToConditions(race)}
          />
          {race}
        </label>
      ))}
    </div>
  );
}
