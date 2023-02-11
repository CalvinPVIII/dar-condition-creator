import BackButton from "./BackButton";
import FileSelect from "./FileSelect";
import Conditions from "../models/Conditions";
import CurrentConditions from "./CurrentConditions";
import { useState, createContext } from "react";
import ItemSelect from "./ItemSelect";

export const ConditionsContext = createContext({
  conditions: null,
  setConditions: () => {},
});

function Home() {
  const [currentState, setCurrentState] = useState("home");
  const [stateHistory, setStateHistory] = useState([]);
  const [itemType, setItemType] = useState("");
  const [currentConditions, setCurrentConditions] = useState(new Conditions());
  const [fileSelectResult, setFileSelectResult] = useState(false);

  const conditions = { currentConditions, setCurrentConditions };

  const handleTypeClick = (itemType) => {
    if (itemType === "misc") {
      setCurrentState("addMisc");
      addToStateHistory("addMisc");
    } else {
      setCurrentState("addItem");
      addToStateHistory("addItem");
      setItemType(itemType);
    }
  };

  const addToStateHistory = (state) => {
    const newHistory = [...stateHistory, state];
    setStateHistory(newHistory);
  };

  const handleBackClick = () => {
    if (stateHistory.length > 1) {
      // idk if this actually works
      setCurrentState(stateHistory[stateHistory.length - 2]);
      const newHistory = [...stateHistory];
      newHistory.pop();
      setStateHistory(newHistory);
    } else {
      setCurrentState("home");
      setStateHistory([]);
    }
  };

  return (
    <>
      <FileSelect
        itemType={itemType}
        setFileSelectResult={setFileSelectResult}
      />
      {currentState === "home" ? (
        <>
          <h1 onClick={() => handleTypeClick("WEAP")}>Weapons</h1>
          <h1 onClick={() => handleTypeClick("ARMO")}>Armor</h1>
          <h1 onClick={() => handleTypeClick("SPEL")}>Spells</h1>
          <h1 onClick={() => handleTypeClick("MISC")}>Misc.</h1>
        </>
      ) : currentState === "addItem" ? (
        <ConditionsContext.Provider value={conditions}>
          <ItemSelect fileSelectResult={fileSelectResult} itemType={itemType} />
          <BackButton onBackClick={handleBackClick} />
          <CurrentConditions />
        </ConditionsContext.Provider>
      ) : (
        <></>
      )}
    </>
  );
}
export default Home;
