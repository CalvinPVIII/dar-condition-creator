import { ConditionsContext } from "./Home";
import { useState, useContext } from "react";

export default function CurrentConditions() {
  const { currentConditions } = useContext(ConditionsContext);

  return (
    <>
      <h4>Equipped in right hand:</h4>
      {currentConditions.rightHandWeapons.map((item) => (
        <p key={item.itemId}>{item.itemName}</p>
      ))}
      <h4>Equipped in left hand:</h4>
      {currentConditions.leftHandWeapons.map((item) => (
        <p key={item.itemId}>{item.itemName}</p>
      ))}
      <h4>Excluded in left hand:</h4>
      {currentConditions.excludedLeftHandWeapons.map((item) => (
        <p key={item.itemId}>{item.itemName}</p>
      ))}
      <h4>Excluded in right hand:</h4>
      {currentConditions.excludedRightHandWeapons.map((item) => (
        <p key={item.itemId}>{item.itemName}</p>
      ))}
    </>
  );
}
