import female from "../../assets/images/female.svg";
import male from "../../assets/images/male.svg";
export default function GenderSelect({ formData, setFormData }) {
  return (
    <div className="gender_select">
      <label>Gender</label>
      <div>
        <label
          htmlFor="female"
          className={`gender_card ${formData.gender === "female" && "active"}`}
        >
          <input
            onChange={(e) => setFormData({ ...formData, gender: e.target.id })}
            type="radio"
            name="gender"
            id="female"
          />
          <img src={female} alt="female" /> Female
        </label>
        <label
          htmlFor="male"
          className={`gender_card ${formData.gender === "male" && "active"}`}
        >
          <input
            onChange={(e) => setFormData({ ...formData, gender: e.target.id })}
            type="radio"
            name="gender"
            id="male"
          />
          <img src={male} alt="female" /> Female
        </label>
      </div>
    </div>
  );
}
