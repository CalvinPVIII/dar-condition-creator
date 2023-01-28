import { useState } from "react";
import PluginItems from "./PluginItems";
const { ipcRenderer } = window.require("electron");
export default function FileSelect() {
  const [fileSelectResult, setFileSelectResult] = useState(false);

  const onFileUpload = async (e) => {
    ipcRenderer.invoke("convertFile", e.target.files[0].path).then((result) => {
      console.log(result);
      if (result === "Success") {
        ipcRenderer.invoke("getItemsFromXml").then((res) => {
          // console.log(res);
          setFileSelectResult(res);
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
      {fileSelectResult ? <PluginItems items={fileSelectResult} /> : <></>}
    </>
  );
}
