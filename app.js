import React, { useState } from "react";
import Conditions from "./src/models/Conditions";

import { Window, App, Text, Button } from "proton-native";

export default function Main() {
  const chosenConditions = new Conditions();
  const [currentState, setCurrentState] = useState("home");
  console.log();

  const render = () => {
    switch (currentState) {
      case "weapon":
        return <Text>Weapon</Text>;
      default:
        <Text>Home</Text>;
    }
  };

  return (
    <App>
      <Window style={{ width: 800, height: 600 }}>
        <Text style={{ fontSize: "20px" }}>DAR CONDITION MAKER</Text>
        <Button onPress={() => setCurrentState("weapon")} title="Switch" />
        {render()}
      </Window>
    </App>
  );
}
