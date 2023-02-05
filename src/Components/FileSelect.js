import { useState } from "react";

import WeaponFileSelect from "./WeaponFileSelect";
import ArmorFileSelect from "./ArmorFileSelect";
const { ipcRenderer } = window.require("electron");

export default function FileSelect(props) {
  const [fileSelectResult, setFileSelectResult] = useState(false);

  const onFileUpload = async (e) => {
    ipcRenderer.invoke("convertFile", e.target.files[0].path).then((result) => {
      if (result === "Success") {
        ipcRenderer.invoke("getItemsFromXml", props.itemType).then((res) => {
          if (res != "error") {
            setFileSelectResult(res);
          } else {
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
      Select File
      <input
        type="file"
        onChange={(e) => onFileUpload(e)}
        accept=".esp, .esl, .esm"
      />
      {fileSelectResult && props.itemType === "WEAP" ? (
        <>
          <WeaponFileSelect
            fileSelectResult={fileSelectResult}
            itemType={props.itemType}
          />
        </>
      ) : fileSelectResult && props.itemType === "ARMO" ? (
        <>
          <ArmorFileSelect
            fileSelectResult={fileSelectResult}
            itemType={props.itemType}
          />
        </>
      ) : fileSelectResult && props.itemType === "SPEL" ? (
        <>
          <WeaponFileSelect
            fileSelectResult={fileSelectResult}
            itemType={props.itemType}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
