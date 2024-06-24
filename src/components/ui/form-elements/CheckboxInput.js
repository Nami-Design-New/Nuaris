function CheckboxInput({ name, label, checked, onChange, hint }) {
  return (
    <div className="checkbox-row ">
      <input
        id={name}
        name={name}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={name}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
    </div>
  );
}

export default CheckboxInput;
