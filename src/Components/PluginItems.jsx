import { useState } from "react";

export default function PluginItems(props) {
  const [currentlySelectedItems, setCurrentlySelectedItems] = useState([]);
  const [itemsArray, setItemsArray] = useState(props.items);
  const [searchText, setSearchText] = useState("");

  const initialCheckBoxValues = {};
  props.items.forEach((item) => {
    initialCheckBoxValues[item.itemId] = false;
  });
  const [itemCheckBoxStatus, setItemCheckBoxStatus] = useState(
    initialCheckBoxValues
  );

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

  const handleItemInSelectedList = (itemSelectBox) => {
    // selecting/deselecting checkbox in internal system
    const newCheckBoxStatus = { ...itemCheckBoxStatus };
    newCheckBoxStatus[itemSelectBox.value] =
      !newCheckBoxStatus[itemSelectBox.value];
    setItemCheckBoxStatus(newCheckBoxStatus);

    // if the box is checked in the internal system
    if (newCheckBoxStatus[itemSelectBox.value]) {
      // add it to the list
      const selectedItems = [...currentlySelectedItems, itemSelectBox.value];
      setCurrentlySelectedItems(selectedItems);
    } else {
      const selectedItems = [...currentlySelectedItems];
      selectedItems.splice(selectedItems.indexOf(itemSelectBox.value), 1);
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
          <>
            <label htmlFor={item.itemId}>
              <input
                name={item.itemId}
                type="checkbox"
                value={item.itemId}
                onChange={(e) => handleItemInSelectedList(e.target)}
                checked={itemCheckBoxStatus[item.itemId]}
              />

              {item.itemName}
            </label>
          </>
        ))}
      </div>
      <div>
        <h1>Currently selected stuff</h1>
        {currentlySelectedItems.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </>
  );
}
