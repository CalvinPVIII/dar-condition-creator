import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WeaponFileSelect from "./WeaponFileSelect";
import ArmorFileSelect from "./ArmorFileSelect";
export default function ItemSelect(props) {
  const [excludeVisibility, setExcludeVisibility] = useState("none");
  const [addVisibility, setAddVisibility] = useState("inline");

  return (
    <>
      {props.fileSelectResult && props.itemType === "ARMO" ? (
        <>
          <ArmorFileSelect
            key={uuidv4()}
            fileSelectResult={props.fileSelectResult["ARMO"]}
            itemType={props.itemType}
            excludeVisibility={excludeVisibility}
            setExcludeVisibility={setExcludeVisibility}
            addVisibility={addVisibility}
            setAddVisibility={setAddVisibility}
          />
        </>
      ) : props.fileSelectResult ? (
        <>
          <WeaponFileSelect
            key={uuidv4()}
            fileSelectResult={props.fileSelectResult[props.itemType]}
            itemType={props.itemType}
            excludeVisibility={excludeVisibility}
            setExcludeVisibility={setExcludeVisibility}
            addVisibility={addVisibility}
            setAddVisibility={setAddVisibility}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
