import { useState } from "react";
import PluginItems from "./PluginItems";
export default function WeaponFileSelect(props) {
  const [leftHandEquipVisibility, setLeftHandEquipVisibility] =
    useState("none");
  const [rightHandEquipVisibility, setRightHandEquipVisibility] =
    useState("inline");

  const [excludeVisibility, setExcludeVisibility] = useState("none");
  const [addVisibility, setAddVisibility] = useState("inline");

  const setVisibleHand = (hand) => {
    if (hand === "right") {
      setRightHandEquipVisibility("inline");
      setLeftHandEquipVisibility("none");
    } else if (hand === "left") {
      setRightHandEquipVisibility("none");
      setLeftHandEquipVisibility("inline");
    }
  };
  const handleExcludeClick = (excludeVisible) => {
    if (excludeVisible) {
      setExcludeVisibility("inline");
      setAddVisibility("none");
    } else if (!excludeVisible) {
      setExcludeVisibility("none");
      setAddVisibility("inline");
    }
  };
  return (
    <>
      {" "}
      <h3>
        <span onClick={() => setVisibleHand("right")}>
          Equipped in Right Hand ||
        </span>{" "}
        <span onClick={() => setVisibleHand("left")}>
          Equipped in Left Hand
        </span>
      </h3>
      <label>
        {excludeVisibility === "none" ? (
          <>
            Exclude Items
            <input type="checkbox" onClick={() => handleExcludeClick(true)} />
          </>
        ) : (
          <>
            Add Items
            <input type="checkbox" onClick={() => handleExcludeClick(false)} />
          </>
        )}
      </label>
      {props.fileSelectResult ? (
        <>
          <div className="add-section" style={{ display: addVisibility }}>
            <div
              className="select-right-hand-weapons"
              style={{ display: rightHandEquipVisibility }}
            >
              <h5>Right</h5>
              <PluginItems
                itemType={props.itemType}
                items={props.fileSelectResult}
                equippedHand={"right"}
              />
            </div>
            <div
              className="select-left-hand-weapons"
              style={{ display: leftHandEquipVisibility }}
            >
              <h5>Left</h5>
              <PluginItems
                itemType={props.itemType}
                items={props.fileSelectResult}
                equippedHand={"left"}
              />
            </div>
          </div>

          <div
            className="exclude-selection"
            style={{ display: excludeVisibility }}
          >
            <div
              className="select-right-hand-weapons"
              style={{ display: rightHandEquipVisibility }}
            >
              <h5>Right</h5>
              <PluginItems
                itemType={props.itemType}
                items={props.fileSelectResult}
                equippedHand={"right"}
                exclude={true}
              />
            </div>
            <div
              className="select-left-hand-weapons"
              style={{ display: leftHandEquipVisibility }}
            >
              <h5>Left</h5>
              <PluginItems
                itemType={props.itemType}
                items={props.fileSelectResult}
                equippedHand={"left"}
                exclude={true}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
