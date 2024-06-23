import { CheckboxInput } from "./CheckboxInput";

function SelectFieldWithCheckbox({
  htmlFor,
  className,
  label,
  options,
  formData,
  setFormData,
  value,
}) {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>{label}</label>
      <div className="col-12">
        <select
          name={htmlFor}
          className={`${className} col-8`}
          id={htmlFor}
          required
          value={value}
          onChange={(e) => {
            setFormData({ ...formData, [htmlFor]: e.target.value });
          }}
        >
          <option value="select" disabled>
            Select
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div></div>
      </div>
    </div>
  );
}

export default SelectFieldWithCheckbox;
