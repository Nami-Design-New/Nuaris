export default function CustomInputField({ label, hint, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={props.id}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <input className="form-control" {...props} />
    </div>
  );
}
