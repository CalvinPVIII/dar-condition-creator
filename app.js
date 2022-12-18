import React from "react";
import Conditions from "./src/models/Conditions";

import { Window, App, Text } from "proton-native";

export default function Main() {
  const chosenConditions = new Conditions();
  console.log(chosenConditions);
  return (
    <App>
      <Window style={{ width: 800, height: 600 }}>
        <Text style={{ fontSize: "100px" }}>HELLO</Text>
      </Window>
    </App>
  );
}
