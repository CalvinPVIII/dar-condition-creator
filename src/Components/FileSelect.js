import { useState } from "react";

// import { v4 as uuidv4 } from "uuid";

// import WeaponFileSelect from "./WeaponFileSelect";
// import ArmorFileSelect from "./ArmorFileSelect";
const { ipcRenderer } = window.require("electron");

export default function FileSelect(props) {
  // const [fileSelectResult, setFileSelectResult] = useState(false);
  const [error, setError] = useState("");

  // const [excludeVisibility, setExcludeVisibility] = useState("none");
  // const [addVisibility, setAddVisibility] = useState("inline");

  const onFileUpload = async (e) => {
    ipcRenderer.invoke("convertFile", e.target.files[0].path).then((result) => {
      if (result === "Success") {
        setError("");
        ipcRenderer.invoke("getItemsFromXml", props.itemType).then((res) => {
          if (res !== "error") {
            props.setFileName(e.target.files[0].name);
            props.setFileSelectResult(res);
          } else {
            setError(
              `There was an issue loading the selected items for ${e.target.files[0].name}`
            );
            return "error";
          }
        });
      } else {
        return "error";
      }
    });
  };

  return (
    <>
      <h3>{error}</h3>
      Select File
      <input
        type="file"
        onChange={(e) => onFileUpload(e)}
        accept=".esp, .esl, .esm"
      />
      {/* {fileSelectResult && props.itemType === "WEAP" ? (
        <>
          <WeaponFileSelect
            key={uuidv4()}
            fileSelectResult={fileSelectResult}
            itemType={props.itemType}
            excludeVisibility={excludeVisibility}
            setExcludeVisibility={setExcludeVisibility}
            addVisibility={addVisibility}
            setAddVisibility={setAddVisibility}
          />
        </>
      ) : fileSelectResult && props.itemType === "ARMO" ? (
        <>
          <ArmorFileSelect
            key={uuidv4()}
            fileSelectResult={fileSelectResult}
            itemType={props.itemType}
            excludeVisibility={excludeVisibility}
            setExcludeVisibility={setExcludeVisibility}
            addVisibility={addVisibility}
            setAddVisibility={setAddVisibility}
          />
        </>
      ) : fileSelectResult && props.itemType === "SPEL" ? (
        <>
          <WeaponFileSelect
            key={uuidv4()}
            fileSelectResult={fileSelectResult}
            itemType={props.itemType}
            excludeVisibility={excludeVisibility}
            setExcludeVisibility={setExcludeVisibility}
            addVisibility={addVisibility}
            setAddVisibility={setAddVisibility}
          />
        </>
      ) : (
        <></>
      )} */}
    </>
  );
}
