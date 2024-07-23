import handWave from "../../../assets/images/icons/waving-hand.svg";

export default function UserTypeSelection({
  setShowLoginForm,
  setUserTypeSelected,
  userTypeSelected
}) {
  return (
    <div className="form">
      <h2 className="head">
        Welcome Back ! <img src={handWave} alt="hand-wave" />
      </h2>
      <p className="sub-head">Please select the user type.</p>
      <div className="selection-grid">
        {["host", "agent", "service provider", "employee"].map((type) => (
          <button
            key={type}
            className={`select ${userTypeSelected === type ? "active" : ""}`}
            onClick={() => setUserTypeSelected(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <button className="next" onClick={() => setShowLoginForm(true)}>
        Next
      </button>
    </div>
  );
}
