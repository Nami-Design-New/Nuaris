const TextField = ({ label, hint, ...props }) => {
  return (
    <div className="input-field">
      <label>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <textarea {...props}></textarea>
    </div>
  );
};

export default TextField;
