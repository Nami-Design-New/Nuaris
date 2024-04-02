export default function CustomDatePicker({
  label,
  hint,
  beforeContent,
  afterContent,
  ...props
}) {
  return (
    <div className="input-field">
      {label && (
        <label>
          {label} {hint && <span className="hint">{hint}</span>}
        </label>
      )}
      <div className="main-elements">
        {beforeContent && <h6>{beforeContent}</h6>}
        <input {...props} type="date" />
        {afterContent && <h6>{afterContent}</h6>}
      </div>
    </div>
  );
}
