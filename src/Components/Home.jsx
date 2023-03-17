import { useState, createContext } from "react";
import BackButton from "./BackButton";
import FileSelect from "./FileSelect";
import Conditions from "../models/Conditions";
import CurrentConditions from "./CurrentConditions";
import ItemSelect from "./ItemSelect";
import MiscOptions from "./MiscOptions";
import weaponTypes from "../constants/weaponTypes";

export const ConditionsContext = createContext({
  conditions: null,
  setConditions: () => {},
});

export const FileNameContext = createContext();

function Home() {
  const [currentState, setCurrentState] = useState("home");
  const [fileName, setFileName] = useState("");
  const [stateHistory, setStateHistory] = useState([]);
  const [itemType, setItemType] = useState("");
  const [currentConditions, setCurrentConditions] = useState(new Conditions());
  const [fileSelectResult, setFileSelectResult] = useState(false);

  const conditions = { currentConditions, setCurrentConditions };

  const handleTypeClick = (itemType) => {
    if (itemType === "MISC") {
      setCurrentState("addMisc");
      addToStateHistory("addMisc");
    } else {
      setCurrentState("addItem");
      addToStateHistory("addItem");
      setItemType(itemType);
    }
    if (itemType === "TYPE") {
      setFileSelectResult(weaponTypes);
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
    <ConditionsContext.Provider value={conditions}>
      <>
        <FileSelect
          itemType={itemType}
          setFileSelectResult={setFileSelectResult}
          setFileName={setFileName}
        />
        {currentState === "home" ? (
          <>
            <h1 onClick={() => handleTypeClick("WEAP")}>Weapons</h1>
            <h1 onClick={() => handleTypeClick("TYPE")}>Weapon Type</h1>
            <h1 onClick={() => handleTypeClick("ARMO")}>Armor</h1>
            <h1 onClick={() => handleTypeClick("SPEL")}>Spells</h1>
            <h1 onClick={() => handleTypeClick("MISC")}>Misc.</h1>
          </>
        ) : currentState === "addItem" ? (
          <FileNameContext.Provider value={fileName}>
            <ItemSelect
              fileSelectResult={fileSelectResult}
              itemType={itemType}
            />
          </FileNameContext.Provider>
        ) : currentState === "addMisc" ? (
          <>
            <MiscOptions />
          </>
        ) : (
          <></>
        )}
        <>
          <BackButton onBackClick={handleBackClick} />
          <CurrentConditions />
        </>
      </>
    </ConditionsContext.Provider>
  );
}
export default Home;
