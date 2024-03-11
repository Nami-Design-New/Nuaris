export default function CustomInputField({ label, hint, ...props }) {
  return (
    <div className="input-field">
      <label>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <input {...props} />
    </div>
  );
}
