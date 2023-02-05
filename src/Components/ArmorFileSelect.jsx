import { useState } from "react";
import PluginItems from "./PluginItems";
export default function ArmorFileSelect(props) {
  const [excludeVisibility, setExcludeVisibility] = useState("none");
  const [addVisibility, setAddVisibility] = useState("inline");

  const handleExcludeClick = (excludeVisible) => {
    if (excludeVisible) {
      setExcludeVisibility("inline");
      setAddVisibility("none");
    } else if (!excludeVisible) {
      setExcludeVisibility("none");
      setAddVisibility("inline");
    }
  };
  return (
    <>
      <div>
        <label>
          {excludeVisibility === "none" ? (
            <>
              Exclude Items
              <input type="checkbox" onClick={() => handleExcludeClick(true)} />
            </>
          ) : (
            <>
              Add Items
              <input
                type="checkbox"
                onClick={() => handleExcludeClick(false)}
              />
            </>
          )}
        </label>
      </div>
      {props.fileSelectResult ? (
        <>
          <div className="add-section" style={{ display: addVisibility }}>
            <div className="select-add-armor">
              <PluginItems
                itemType={props.itemType}
                items={props.fileSelectResult}
                exclude={false}
              />
            </div>
          </div>

          <div
            className="exclude-selection"
            style={{ display: excludeVisibility }}
          >
            <div className="select-exclude-armor">
              <PluginItems
                itemType={props.itemType}
                items={props.fileSelectResult}
                exclude={true}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
