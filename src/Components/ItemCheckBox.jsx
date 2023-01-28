import { useState } from "react";

export default function ItemCheckBox(props) {
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      <span>
        <input
          type="checkbox"
          value={props.itemId}
          checked={checked}
          onClick={handleCheck}
        />
        {props.itemName}
      </span>
    </>
  );
}
