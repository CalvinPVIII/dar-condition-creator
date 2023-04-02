import { useState, useContext } from "react";
import { ConditionsContext } from "./Home";

export default function PopoutMenu() {
  const { currentConditions } = useContext(ConditionsContext);

  const [menuAnimation, setMenuAnimation] = useState("slide-out");

  const toggleVisibility = (target) => {
    if (target.classList.contains("item-hidden")) {
      target.classList.remove("item-hidden");
      target.classList.add("item-visible");
    } else if (target.classList.contains("item-visible")) {
      target.classList.remove("item-visible");
      target.classList.add("item-hidden");
    }
  };

  const includedItemsArray = [
    {
      displayText: "Equipped Right Hand Weapons",
      value: currentConditions.rightHandWeapons,
      type: "array",
    },
    {
      displayText: "Equipped Left Hand Weapons",
      value: currentConditions.leftHandWeapons,
      type: "array",
    },
    {
      displayText: "Equipped Right Hand Weapon Types",
      value: currentConditions.rightHandWeaponTypes,
      type: "array",
    },
    {
      displayText: "Equipped Left Hand Weapon Types",
      value: currentConditions.leftHandWeaponTypes,
      type: "array",
    },
    {
      displayText: "Equipped Right Hand Spells",
      value: currentConditions.rightHandSpells,
      type: "array",
    },
    {
      displayText: "Equipped Left Hand Spells",
      value: currentConditions.leftHandSpells,
      type: "array",
    },
    {
      displayText: "Equipped Armor",
      value: currentConditions.equippedArmor,
      type: "array",
    },
    {
      displayText: "Selected Races",
      value: currentConditions.includedRaces,
      type: "array",
    },
  ];

  const excludedItemsArray = [
    {
      displayText: "Excluded Right Hand Weapons",
      value: currentConditions.excludedRightHandWeapons,
      type: "array",
    },
    {
      displayText: "Excluded Left Hand Weapons",
      value: currentConditions.excludedLeftHandWeapons,
      type: "array",
    },
    {
      displayText: "Excluded Right Hand Weapon Types",
      value: currentConditions.excludedRightHandWeaponTypes,
      type: "array",
    },
    {
      displayText: "Excluded Left Hand Weapon Types",
      value: currentConditions.excludedLeftHandWeaponTypes,
      type: "array",
    },
    {
      displayText: "Excluded Right Hand Spells",
      value: currentConditions.excludedRightHandSpells,
      type: "array",
    },
    {
      displayText: "Excluded Left Hand Spells",
      value: currentConditions.excludedLeftHandSpells,
      type: "array",
    },
    {
      displayText: "Excluded Armor",
      value: currentConditions.excludedArmor,
      type: "array",
    },
    {
      displayText: "Excluded Races",
      value: currentConditions.excludedRaces,
      type: "array",
    },
  ];

  const miscArray = [
    {
      displayText: "Max Level",
      value: currentConditions.maxLevel,
      type: "text",
    },
    {
      displayText: "Min Level",
      value: currentConditions.minLevel,
      type: "text",
    },
    {
      displayText: "Gender",
      value: currentConditions.specificGender,
      type: "text",
    },
    {
      displayText: "Stance",
      value: currentConditions.stance,
      type: "text",
    },
  ];

  const [visibleConditions, setVisibleConditions] =
    useState(includedItemsArray);

  return (
    <div id="hamburger-menu">
      {menuAnimation === "slide-in" ? (
        <p id="menu-toggle" onClick={() => setMenuAnimation("slide-out")}>
          ☰
        </p>
      ) : (
        <p id="menu-toggle" onClick={() => setMenuAnimation("slide-in")}>
          ☰
        </p>
      )}

      <div id="menu-box" className={menuAnimation}>
        <p id="menu-header">Current Conditions</p>
        <p>
          <span onClick={() => setVisibleConditions(includedItemsArray)}>
            Included Item
          </span>{" "}
          |{" "}
          <span onClick={() => setVisibleConditions(excludedItemsArray)}>
            {" "}
            Excluded Items
          </span>{" "}
          | <span onClick={() => setVisibleConditions(miscArray)}>Misc</span>
        </p>
        {visibleConditions.map((condition) => (
          <div>
            <p
              className="menu-item"
              onClick={(e) => toggleVisibility(e.target.nextSibling)}
            >
              {condition.displayText}
            </p>
            <div className="drop-down-items item-hidden">
              {condition.type === "array" ? (
                <>
                  {condition.value.map((item) => (
                    <p className="titleized">
                      {item.itemName} - {item.fileName}
                    </p>
                  ))}
                </>
              ) : (
                <p className="titleized">{condition.value}</p>
              )}
            </div>
          </div>
        ))}
        {/* <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Equipped Right Hand Weapons
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.rightHandWeapons.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
          <p> </p>
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Equipped Left Hand Weapons
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.leftHandWeapons.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Excluded Weapons in left hand:
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.excludedLeftHandWeapons.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>
        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Excluded Weapons in right hand:
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.excludedRightHandWeapons.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Equipped Armor
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.equippedArmor.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>
        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Excluded Armor
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.excludedArmor.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>
        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Equipped Spells in right hand:
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.rightHandSpells.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>
        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Equipped Spells in left hand:
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.leftHandSpells.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Excluded Spells in left hand:
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.excludedLeftHandSpells.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Excluded Spells in right hand:
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.excludedRightHandSpells.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Selected Races:
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.includedRaces.map((race) => (
            <p key={`included-${race.itemName}`}>{race.itemName}</p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Excluded Races:
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.excludedRaces.map((race) => (
            <p key={`excluded-${race.itemName}`}>{race.itemName}</p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Specific Gender
        </p>
        <div className="drop-down-items item-hidden">
          <p>{currentConditions.specificGender}</p>
        </div>

       
        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Min Level
        </p>
        <div className="drop-down-items item-hidden">
          <p>{currentConditions.minLevel}</p>
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Equipped Right Hand Weapon Types
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.rightHandWeaponTypes.map((item) => (
            <p key={item.itemId}>{item.itemName}</p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Equipped Left Hand Weapon Types
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.leftHandWeaponTypes.map((item) => (
            <p key={item.itemId}>{item.itemName}</p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Excluded Right Hand Weapon Types
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.excludedRightHandWeaponTypes.map((item) => (
            <p key={item.itemId}>{item.itemName}</p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Excluded Left Hand Weapon Types
        </p>
        <div className="drop-down-items item-hidden">
          {currentConditions.excludedLeftHandWeaponTypes.map((item) => (
            <p key={item.itemId}>{item.itemName}</p>
          ))}
        </div>

        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Stances
        </p>
        <div className="drop-down-items item-hidden">
          <p style={{ textTransform: "capitalize" }}>
            {currentConditions.stance}
          </p>
        </div> */}
        <p
          className="menu-item"
          onClick={(e) => toggleVisibility(e.target.nextSibling)}
        >
          Stances
        </p>
        <div className="drop-down-items item-hidden">
          <p style={{ textTransform: "capitalize" }}>
            {currentConditions.stance}
          </p>
        </div>{" "}
      </div>
    </div>
  );
}
