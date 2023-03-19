import { useState, useContext } from "react";
import { ConditionsContext } from "./Home";

export default function PopoutMenu() {
  const { currentConditions } = useContext(ConditionsContext);

  const [menuAnimation, setMenuAnimation] = useState("slide-out");
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

        <p className="menu-item">Equipped Right Hand Weapons</p>
        <div className="drop-down-items">
          {currentConditions.rightHandWeapons.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p className="menu-item">Equipped Left Hand Weapons</p>
        <div className="drop-down-items">
          {currentConditions.leftHandWeapons.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p className="menu-item">Excluded Weapons in left hand:</p>
        <div className="drop-down-items">
          {currentConditions.excludedLeftHandWeapons.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>
        <p className="menu-item">Excluded Weapons in right hand:</p>
        <div className="drop-down-items">
          {currentConditions.excludedRightHandWeapons.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p className="menu-item">Equipped Armor</p>
        <div className="drop-down-items">
          {currentConditions.equippedArmor.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>
        <p className="menu-item">Excluded Armor</p>
        <div className="drop-down-items">
          {currentConditions.excludedArmor.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>
        <p className="menu-item">Equipped Spells in right hand:</p>
        <div className="drop-down-items">
          {currentConditions.rightHandSpells.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>
        <p className="menu-item">Equipped Spells in left hand:</p>
        <div className="drop-down-items">
          {currentConditions.leftHandSpells.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p className="menu-item">Excluded Spells in left hand:</p>
        <div className="drop-down-items">
          {currentConditions.excludedLeftHandSpells.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p className="menu-item">Excluded Spells in right hand:</p>
        <div className="drop-down-items">
          {currentConditions.excludedRightHandSpells.map((item) => (
            <p key={item.itemId}>
              {item.itemName} - {item.fileName}
            </p>
          ))}
        </div>

        <p className="menu-item">Selected Races:</p>
        <div className="drop-down-items">
          {currentConditions.includedRaces.map((race) => (
            <p key={`included-${race.itemName}`}>{race.itemName}</p>
          ))}
        </div>

        <p className="menu-item">Excluded Races:</p>
        <div className="drop-down-items">
          {currentConditions.excludedRaces.map((race) => (
            <p key={`excluded-${race.itemName}`}>{race.itemName}</p>
          ))}
        </div>

        <p className="menu-item">Specific Gender</p>
        <div className="drop-down-items">
          <p>{currentConditions.specificGender}</p>
        </div>

        <p className="menu-item">Max Level:</p>
        <div className="drop-down-items">
          <p>{currentConditions.maxLevel}</p>
        </div>

        <p className="menu-item">Min Level</p>
        <div className="drop-down-items">
          <p>{currentConditions.minLevel}</p>
        </div>

        <p className="menu-item">Equipped Right Hand Weapon Types</p>
        <div className="drop-down-items">
          {currentConditions.rightHandWeaponTypes.map((item) => (
            <p key={item.itemId}>{item.itemName}</p>
          ))}
        </div>

        <p className="menu-item">Equipped Left Hand Weapon Types</p>
        <div className="drop-down-items">
          {currentConditions.leftHandWeaponTypes.map((item) => (
            <p key={item.itemId}>{item.itemName}</p>
          ))}
        </div>

        <p className="menu-item">Excluded Right Hand Weapon Types</p>
        <div className="drop-down-items">
          {currentConditions.excludedRightHandWeaponTypes.map((item) => (
            <p key={item.itemId}>{item.itemName}</p>
          ))}
        </div>

        <p className="menu-item">Excluded Left Hand Weapon Types</p>
        <div className="drop-down-items">
          {currentConditions.excludedLeftHandWeaponTypes.map((item) => (
            <p key={item.itemId}>{item.itemName}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
