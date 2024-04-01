export default function CustomSelectField({ options, ...props }) {
  return (
    <div className="input-field">
      {props.label && <label>{props.label}</label>}
      <select {...props}>
        <option selected value={null} disabled>
          Select
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
