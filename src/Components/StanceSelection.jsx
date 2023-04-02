import { useContext } from "react";
import { ConditionsContext } from "./Home";

export default function StanceSelection() {
  const { currentConditions, setCurrentConditions } =
    useContext(ConditionsContext);

  const pickStance = (stance) => {
    let conditions = { ...currentConditions };
    conditions.stance = stance;
    setCurrentConditions(conditions);
  };
  return (
    <>
      <h3>Stance Support</h3>
      <label>
        <input
          type="radio"
          name="stance"
          value="none"
          defaultChecked={true}
          onChange={(e) => {
            pickStance(e.target.value);
          }}
        />
        None
      </label>
      <label>
        <input
          type="radio"
          name="stance"
          value="high"
          onChange={(e) => {
            pickStance(e.target.value);
          }}
        />
        High
      </label>
      <label>
        <input
          type="radio"
          name="stance"
          value="mid"
          onChange={(e) => {
            pickStance(e.target.value);
          }}
        />
        Mid
      </label>
      <label>
        <input
          type="radio"
          name="stance"
          value="low"
          onChange={(e) => {
            pickStance(e.target.value);
          }}
        />
        Low
      </label>
    </>
  );
}
