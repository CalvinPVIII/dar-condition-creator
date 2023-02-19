import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { ConditionsContext } from "./Home";
import { v4 as uuidv4 } from "uuid";

export default function ItemSelection(props) {
  const { currentConditions, setCurrentConditions } =
    useContext(ConditionsContext);

  const [includedOrExcludedItem, setIncludedOrExcludedItem] =
    useState("included");

  const [filteredItems, setFilteredItems] = useState(props.items);
  const [searchInput, setSearchInput] = useState("");

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
    filteredItems.forEach((item) => {
      if (addOrRemove === "add") {
        addToConditions(item);
      } else if (addOrRemove === "remove") {
        removeFromConditions(item);
      }
    });
  };

  const handleFilterItems = (input) => {
    setSearchInput(input);
    const newItems = props.items.filter((item) =>
      item.itemName.toUpperCase().includes(input.toUpperCase())
    );
    setFilteredItems(newItems);
  };

  const resetFilterItems = () => {
    setSearchInput("");
    setFilteredItems(props.items);
  };

  return (
    <div className="select-section">
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
      <div>
        <h3>Search:</h3>
        <input
          type="text"
          onChange={(e) => handleFilterItems(e.target.value)}
          value={searchInput}
        />
        <button onClick={resetFilterItems}>Reset</button>
      </div>
      {filteredItems.map((item) => (
        <label key={uuidv4()}>
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

ItemSelection.propTypes = {
  items: PropTypes.array, // array of items as objects, each element needs an itemName and itemId
  includedArray: PropTypes.string, // the string that corresponds to the property of Conditions.js, ex: armor would be the "equippedArmor" property
  excludedArray: PropTypes.string, // the string that corresponds to the property of Conditions.js, ex: armor would be the "excludedArmor" property
};
