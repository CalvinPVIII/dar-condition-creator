import PluginItems from "./PluginItems";

export default function ArmorFileSelect(props) {
  const handleExcludeClick = (excludeVisible) => {
    if (excludeVisible) {
      props.setExcludeVisibility("inline");
      props.setAddVisibility("none");
    } else if (!excludeVisible) {
      props.setExcludeVisibility("none");
      props.setAddVisibility("inline");
    }
  };

  return (
    <>
      <div>
        <label>
          {props.excludeVisibility === "none" ? (
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
          <div className="add-section" style={{ display: props.addVisibility }}>
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
            style={{ display: props.excludeVisibility }}
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
