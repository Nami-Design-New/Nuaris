import { useState } from "react";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import CrewCard from "./CrewCard";
import { toast } from "react-toastify";

const CrewForm = ({ setForm }) => {
  const [formData, setFormData] = useState({
    NumberOfCrew: "1",
  });
  const handleNext = (e) => {
    e.preventDefault();
    setForm("Policy");
  };
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Location");
  };

  function handleChange(e) {
    if (+e.target.value > 20) {
      toast.error("Maximum crew members count is 20");
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  return (
    <div className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Crew</h6>
        </div>
        {/* Number of Crew */}
        <div className="col-12 p-2">
          <CustomInputField
            name="NumberOfCrew"
            label="Number of Crew"
            placeholder="0"
            type="number"
            value={formData.NumberOfCrew}
            onChange={handleChange}
          />
        </div>
        {Array(+formData?.NumberOfCrew)
          .fill(0)
          .map((_, i) => {
            return <CrewCard key={i} index={i + 1} />;
          })}
        <div className="col-12 p-2 pt-4 d-flex gap-3 ">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <button className="save_btn ms-auto">Save</button>
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrewForm;
