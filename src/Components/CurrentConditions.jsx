import { ConditionsContext } from "./Home";
import { useState, useContext } from "react";

export default function CurrentConditions() {
  const { currentConditions } = useContext(ConditionsContext);

  return (
    <>
      <h4>Equipped Weapons in right hand:</h4>
      {currentConditions.rightHandWeapons.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}
      <h4>Equipped Weapons in left hand:</h4>
      {currentConditions.leftHandWeapons.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}
      <h4>Excluded Weapons in left hand:</h4>
      {currentConditions.excludedLeftHandWeapons.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}
      <h4>Excluded Weapons in right hand:</h4>
      {currentConditions.excludedRightHandWeapons.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}

      <h4>Equipped Armor</h4>
      {currentConditions.equippedArmor.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}
      <h4>Excluded Armor</h4>
      {currentConditions.excludedArmor.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}

      <h4>Equipped Spells in right hand:</h4>
      {currentConditions.rightHandSpells.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}
      <h4>Equipped Spells in left hand:</h4>
      {currentConditions.leftHandSpells.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}
      <h4>Excluded Spells in left hand:</h4>
      {currentConditions.excludedLeftHandSpells.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}
      <h4>Excluded Spells in right hand:</h4>
      {currentConditions.excludedRightHandSpells.map((item) => (
        <p key={item.itemId}>
          {item.itemName} - {item.fileName}
        </p>
      ))}

      <h4>Selected Races:</h4>
      {currentConditions.includedRaces.map((race) => (
        <p key={`included-${race.itemName}`}>{race.itemName}</p>
      ))}

      <h4>Excluded Races:</h4>
      {currentConditions.excludedRaces.map((race) => (
        <p key={`excluded-${race.itemName}`}>{race.itemName}</p>
      ))}

      <h4>Specific Gender:</h4>
      <p>{currentConditions.specificGender}</p>

      <h4>Max Level:</h4>
      <p>{currentConditions.maxLevel}</p>

      <h4>Min Level:</h4>
      <p>{currentConditions.minLevel}</p>

      <h4>Equipped WeaponTypes in right hand:</h4>
      {currentConditions.rightHandWeaponTypes.map((item) => (
        <p key={item.itemId}>{item.itemName}</p>
      ))}
      <h4>Equipped WeaponTypes in left hand:</h4>
      {currentConditions.leftHandWeaponTypes.map((item) => (
        <p key={item.itemId}>{item.itemName}</p>
      ))}
      <h4>Excluded WeaponTypes in left hand:</h4>
      {currentConditions.excludedLeftHandWeaponTypes.map((item) => (
        <p key={item.itemId}>{item.itemName}</p>
      ))}
      <h4>Excluded WeaponTypes in right hand:</h4>
      {currentConditions.excludedRightHandWeaponTypes.map((item) => (
        <p key={item.itemId}>{item.itemName}</p>
      ))}
    </>
  );
}
