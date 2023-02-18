import { useState, useContext } from "react";

import { ConditionsContext } from "./Home";

// props:
// array of item objects that contain item.name and item.id
// the array property that contains all the included items of that type
// the array property that contains all the excluded items of that type
export default function ItemSelection(props) {
  const { currentConditions, setCurrentConditions } =
    useContext(ConditionsContext);

  const [includedOrExcludedItem, setIncludedOrExcludedItem] =
    useState("included");

  const conditionArrays = {
    included: props.includedArray,
    excluded: props.excludedArray,
  };

  const itemCheckStatus = {};
  props.items.forEach((item) => {
    itemCheckStatus[item.itemName] = {
      excluded: false,
      included: false,
    };

    if (currentConditions[props.excludedArray].includes(item)) {
      itemCheckStatus[item.itemName].excluded = true;
    } else if (currentConditions[props.includedArray].includes(item)) {
      itemCheckStatus[item.itemName].included = true;
    }
  });

  const [checkedStatus, setCheckedStatus] = useState(itemCheckStatus);

  const [opacity, setOpacity] = useState({
    included: 1,
    excluded: 0.5,
  });

  const handleIncludeExcludeToggle = (includeOrExclude) => {
    if (includeOrExclude === "included") {
      setIncludedOrExcludedItem("included");
      setOpacity({
        included: 1,
        excluded: 0.5,
      });
    } else if (includeOrExclude === "excluded") {
      setIncludedOrExcludedItem("excluded");
      setOpacity({
        included: 0.5,
        excluded: 1,
      });
    }
  };

  const checkBox = (itemSelection) => {
    if (
      !currentConditions[conditionArrays[includedOrExcludedItem]].includes(
        itemSelection
      )
    ) {
      addToConditions(itemSelection);
    } else if (
      currentConditions[conditionArrays[includedOrExcludedItem]].includes(
        itemSelection
      )
    ) {
      removeFromConditions(itemSelection);
    }
  };

  const addToConditions = (itemSelection) => {
    let newConditions = { ...currentConditions };

    if (
      !newConditions[conditionArrays[includedOrExcludedItem]].includes(
        itemSelection
      )
    ) {
      newConditions[conditionArrays[includedOrExcludedItem]].push(
        itemSelection
      );
      setCurrentConditions(newConditions);
      toggleChecked(itemSelection, true);
    }
  };

  const removeFromConditions = (itemSelection) => {
    let newConditions = { ...currentConditions };

    if (
      newConditions[conditionArrays[includedOrExcludedItem]].includes(
        itemSelection
      )
    ) {
      newConditions[conditionArrays[includedOrExcludedItem]].splice(
        newConditions[conditionArrays[includedOrExcludedItem]].indexOf(
          itemSelection
        ),
        1
      );
      setCurrentConditions(newConditions);
      toggleChecked(itemSelection, false);
    }
  };

  const toggleChecked = (item, checked) => {
    const newCheckedStatus = { ...checkedStatus };
    newCheckedStatus[item.itemName][includedOrExcludedItem] = checked;
    setCheckedStatus(newCheckedStatus);
  };

  const toggleAll = (addOrRemove) => {
    props.items.forEach((item) => {
      if (addOrRemove === "add") {
        addToConditions(item);
      } else if (addOrRemove === "remove") {
        removeFromConditions(item);
      }
    });
  };

  return (
    <div className="select-race-section">
      <h3>
        <span
          onClick={() => handleIncludeExcludeToggle("included")}
          style={{ opacity: opacity.included }}
        >
          Add Items
        </span>
        ||
        <span
          onClick={() => handleIncludeExcludeToggle("excluded")}
          style={{ opacity: opacity.excluded }}
        >
          Exclude Items
        </span>
      </h3>
      <div>
        <button
          onClick={() => {
            toggleAll("add");
          }}
        >
          Select All
        </button>
        <button
          onClick={() => {
            toggleAll("remove");
          }}
        >
          Remove All
        </button>
      </div>
      {props.items.map((item) => (
        <label key={item.itemName}>
          <input
            type="checkbox"
            checked={checkedStatus[item.itemName][includedOrExcludedItem]}
            onChange={() => checkBox(item)}
          />
          {item.itemName}
        </label>
      ))}
    </div>
  );
}
