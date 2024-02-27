export default function CustomRadioInput({ label, name, onChange }) {
  return (
    <div className="radio">
      <input checked type="radio" onChange={onChange} id={label} name={name} />
      <div className="check"></div>
      <label htmlFor={label}>{label}</label>
    </div>
  );
}
