import { useState } from "react";

function RadioInput({ label, hint, htmlFor, id }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className={`d-flex align-items-center gap-3 col-3`}>
      <input
        id={id}
        name={id}
        type="radio"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor={htmlFor}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
    </div>
  );
}

export default RadioInput;
