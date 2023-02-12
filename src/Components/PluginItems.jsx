import { useState, useContext } from "react";
import { ConditionsContext } from "./Home";
import { FileNameContext } from "./Home";
export default function PluginItems(props) {
  const [currentlySelectedItems, setCurrentlySelectedItems] = useState([]);
  const [itemsArray, setItemsArray] = useState(props.items);
  const [searchText, setSearchText] = useState("");

  const { currentConditions, setCurrentConditions } =
    useContext(ConditionsContext);

  const fileName = useContext(FileNameContext);

  const initialCheckBoxValues = {};
  props.items.forEach((item) => {
    if (
      //if the item already has been checked to be added
      ((currentConditions.rightHandWeapons.some(
        (listItem) => item.itemId === listItem.itemId
      ) ||
        currentConditions.leftHandWeapons.some(
          (listItem) => item.itemId === listItem.itemId
        ) ||
        currentConditions.rightHandSpells.some(
          (listItem) => item.itemId === listItem.itemId
        ) ||
        currentConditions.leftHandSpells.some(
          (listItem) => item.itemId === listItem.itemId
        ) ||
        currentConditions.equippedArmor.some(
          (listItem) => item.itemId === listItem.itemId
        )) &&
        !props.exclude) || // or the item already has been checked to be excluded
      ((currentConditions.excludedRightHandWeapons.some(
        (listItem) => item.itemId === listItem.itemId
      ) ||
        currentConditions.excludedLeftHandWeapons.some(
          (listItem) => item.itemId === listItem.itemId
        ) ||
        currentConditions.excludedRightHandSpells.some(
          (listItem) => item.itemId === listItem.itemId
        ) ||
        currentConditions.excludedLeftHandSpells.some(
          (listItem) => item.itemId === listItem.itemId
        ) ||
        currentConditions.excludedArmor.some(
          (listItem) => item.itemId === listItem.itemId
        )) &&
        props.exclude)
    ) {
      initialCheckBoxValues[item.itemId] = true; // check it on the list
    } else {
      initialCheckBoxValues[item.itemId] = false;
    }
  });
  const [itemCheckBoxStatus, setItemCheckBoxStatus] = useState(
    initialCheckBoxValues
  );

  // takes in a DOM element or object that has a value and name
  // adjusts the Conditions object provided in the context
  const addSelectionToConditions = (item) => {
    item = { itemId: item.value, itemName: item.name, fileName: fileName };
    const newConditions = { ...currentConditions };

    if (props.itemType === "ARMO") {
      props.exclude
        ? newConditions.excludedArmor.push(item)
        : newConditions.equippedArmor.push(item);
    }

    if (props.itemType === "SPEL") {
      if (props.equippedHand === "right") {
        props.exclude
          ? newConditions.excludedRightHandSpells.push(item)
          : newConditions.rightHandSpells.push(item);
      } else if (props.equippedHand === "left") {
        props.exclude
          ? newConditions.excludedLeftHandSpells.push(item)
          : newConditions.leftHandSpells.push(item);
      }
    }

    if (props.itemType === "WEAP") {
      // For weapons  in either hand
      if (props.equippedHand === "right") {
        props.exclude
          ? newConditions.excludedRightHandWeapons.push(item)
          : newConditions.rightHandWeapons.push(item);
      } else if (props.equippedHand === "left") {
        props.exclude
          ? newConditions.excludedLeftHandWeapons.push(item)
          : newConditions.leftHandWeapons.push(item);
      }
    }
    setCurrentConditions(newConditions);
  };

  // takes in a DOM element or object that has a value and name
  // adjusts the Conditions object provided in the context
  const removeSelectionFromConditions = (item) => {
    item = { itemId: item.value, itemName: item.name, fileName: fileName };
    const newConditions = { ...currentConditions };

    if (props.itemType === "ARMO") {
      props.exclude
        ? newConditions.excludedArmor.splice(
            newConditions.excludedArmor.indexOf(item),
            1
          )
        : newConditions.equippedArmor.splice(
            newConditions.equippedArmor.indexOf(item),
            1
          );
    }

    if (props.itemType === "SPEL") {
      if (props.equippedHand === "right") {
        props.exclude
          ? newConditions.excludedRightHandSpells.splice(
              newConditions.excludedRightHandSpells.indexOf(item),
              1
            )
          : newConditions.rightHandSpells.splice(
              newConditions.rightHandSpells.indexOf(item),
              1
            );
      } else if (props.equippedHand === "left") {
        props.exclude
          ? newConditions.excludedLeftHandSpells.splice(
              newConditions.excludedLeftHandSpells.indexOf(item),
              1
            )
          : newConditions.leftHandSpells.splice(
              newConditions.leftHandSpells.indexOf(item),
              1
            );
      }
    }

    if (props.itemType === "WEAP") {
      if (props.equippedHand === "right") {
        props.exclude
          ? newConditions.excludedRightHandWeapons.splice(
              newConditions.excludedRightHandWeapons.indexOf(item),
              1
            )
          : newConditions.rightHandWeapons.splice(
              newConditions.rightHandWeapons.indexOf(item),
              1
            );
      } else if (props.equippedHand === "left") {
        props.exclude
          ? newConditions.excludedLeftHandWeapons.splice(
              newConditions.excludedLeftHandWeapons.indexOf(item),
              1
            )
          : newConditions.leftHandWeapons.splice(
              newConditions.leftHandWeapons.indexOf(item),
              1
            );
      }
    }
    setCurrentConditions(newConditions);
  };

  // filters list of items you can click
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const filteredArray = props.items.filter((item) =>
      item.itemName.toUpperCase().includes(e.target.value.toUpperCase())
    );
    setItemsArray(filteredArray);
  };
  const handleReset = () => {
    setItemsArray(props.items);
    setSearchText("");
  };

  // adds item to the conditions context, and updates the checkboxes, takes in input DOM node
  const handleItemInSelectedList = (itemSelectBox) => {
    // selecting/deselecting checkbox in internal system
    const newCheckBoxStatus = { ...itemCheckBoxStatus };
    console.log(itemSelectBox.value);
    newCheckBoxStatus[itemSelectBox.value] =
      !newCheckBoxStatus[itemSelectBox.value];
    setItemCheckBoxStatus(newCheckBoxStatus);

    // if the box is checked in the internal system
    if (newCheckBoxStatus[itemSelectBox.value]) {
      // add it to the list
      const selectedItems = [...currentlySelectedItems, itemSelectBox.value];
      addSelectionToConditions(itemSelectBox);
      setCurrentlySelectedItems(selectedItems);
    } else {
      const selectedItems = [...currentlySelectedItems];
      selectedItems.splice(selectedItems.indexOf(itemSelectBox.value), 1);
      removeSelectionFromConditions(itemSelectBox);
      setCurrentlySelectedItems(selectedItems);
    }
  };

  const selectAll = (select) => {
    if (select) {
      let newCheckBoxStatus = { ...itemCheckBoxStatus };
      let newCurrentlySelectedItems = [...currentlySelectedItems];
      itemsArray.forEach((item) => {
        newCheckBoxStatus[item.itemId] = true;
        if (!newCurrentlySelectedItems.includes(item.itemId)) {
          newCurrentlySelectedItems.push(item.itemId);
          addSelectionToConditions({
            value: item.itemId,
            name: item.itemName,
          });
        }
      });
      setCurrentlySelectedItems(newCurrentlySelectedItems);
      setItemCheckBoxStatus(newCheckBoxStatus);
    } else if (!select) {
      let newCheckBoxStatus = { ...itemCheckBoxStatus };
      let newCurrentlySelectedItems = [...currentlySelectedItems];
      itemsArray.forEach((item) => {
        newCheckBoxStatus[item.itemId] = false;
        if (newCurrentlySelectedItems.includes(item.itemId)) {
          removeSelectionFromConditions({
            value: item.itemId,
            name: item.itemName,
          });
          newCurrentlySelectedItems.splice(
            newCurrentlySelectedItems.indexOf(item.itemId),
            1
          );
        }
      });
      setCurrentlySelectedItems(newCurrentlySelectedItems);
      setItemCheckBoxStatus(newCheckBoxStatus);
    }
  };
  return (
    <>
      <h1>Items:</h1>
      <div className="utility-section">
        <span>Search</span>
        <input
          type="text"
          onChange={(e) => handleSearch(e)}
          value={searchText}
        />
        <button onClick={handleReset}>Reset</button>
        <br />
        <button onClick={() => selectAll(true)}>Check All</button>
        <button onClick={() => selectAll(false)}>Uncheck All</button>
      </div>
      <div className="item-list">
        {itemsArray.map((item) => (
          <div className="item" key={item.itemId}>
            <label
              htmlFor={item.itemId}
              // onClick={(e) => handleItemInSelectedList(e.target.children[0])}
            >
              <input
                name={item.itemName}
                type="checkbox"
                value={item.itemId}
                onChange={(e) => handleItemInSelectedList(e.target)}
                checked={itemCheckBoxStatus[item.itemId]}
              />
              {item.itemName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
