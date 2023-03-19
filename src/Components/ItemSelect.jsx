import { useState } from "react";
import ItemSelection from "./ItemSelection";

export default function ItemSelect(props) {
  const [rightHandStyles, setRightHandStyles] = useState({
    display: "inline",
    opacity: 1,
  });
  const [leftHandStyles, setLefHandStyles] = useState({
    display: "none",
    opacity: 0.5,
  });

  const handleLeftRightToggle = (leftOrRight) => {
    if (leftOrRight === "left") {
      setLefHandStyles({ display: "inline", opacity: 1 });
      setRightHandStyles({
        display: "none",
        opacity: 0.5,
      });
    } else if (leftOrRight === "right") {
      setLefHandStyles({
        display: "none",
        opacity: 0.5,
      });
      setRightHandStyles({ display: "inline", opacity: 1 });
    }
  };

  const conditionsArraysByType = {
    ARMO: {
      included: "equippedArmor",
      excluded: "excludedArmor",
    },
    WEAP: {
      right: {
        included: "rightHandWeapons",
        excluded: "excludedRightHandWeapons",
      },
      left: {
        included: "leftHandWeapons",
        excluded: "excludedLeftHandWeapons",
      },
    },
    SPEL: {
      right: {
        included: "rightHandSpells",
        excluded: "excludedRightHandSpells",
      },
      left: {
        included: "leftHandSpells",
        excluded: "excludedLeftHandSpells",
      },
    },
    TYPE: {
      right: {
        included: "rightHandWeaponTypes",
        excluded: "excludedRightHandWeaponTypes",
      },
      left: {
        included: "leftHandWeaponTypes",
        excluded: "excludedLeftHandWeaponTypes",
      },
    },
  };

  return (
    <>
      {props.fileSelectResult && props.itemType === "ARMO" ? (
        <>
          <ItemSelection
            items={props.fileSelectResult["ARMO"]}
            includedArray={conditionsArraysByType["ARMO"].included}
            excludedArray={conditionsArraysByType["ARMO"].excluded}
          />
        </>
      ) : props.fileSelectResult &&
        (props.itemType === "WEAP" ||
          props.itemType === "SPEL" ||
          props.itemType === "TYPE") ? (
        <>
          <h3>
            <span
              onClick={() => handleLeftRightToggle("right")}
              style={{ opacity: rightHandStyles.opacity }}
            >
              Right Hand
            </span>{" "}
            ||{" "}
            <span
              onClick={() => handleLeftRightToggle("left")}
              style={{ opacity: leftHandStyles.opacity }}
            >
              Left Hand
            </span>
          </h3>
          <div
            className="right-hand"
            style={{ display: rightHandStyles.display }}
          >
            <ItemSelection
              items={props.fileSelectResult[props.itemType]}
              includedArray={
                conditionsArraysByType[props.itemType].right.included
              }
              excludedArray={
                conditionsArraysByType[props.itemType].right.excluded
              }
            />
          </div>
          <div
            className="left-hand"
            style={{ display: leftHandStyles.display }}
          >
            <ItemSelection
              items={props.fileSelectResult[props.itemType]}
              includedArray={
                conditionsArraysByType[props.itemType].left.included
              }
              excludedArray={
                conditionsArraysByType[props.itemType].left.excluded
              }
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
