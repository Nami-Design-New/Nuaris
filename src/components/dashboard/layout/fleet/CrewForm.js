import { useState } from "react";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import CrewCard from "./CrewCard";
import { toast } from "react-toastify";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import axios from "../../../../util/axios";

const CrewForm = ({ setForm }) => {
  const createdYacht = sessionStorage.getItem("yacht_id");
  const [loading, setLoading] = useState(false);
  const initialMemberData = {
    name: "",
    nationality: "EG",
    gender: "male"
  };

  const [formData, setFormData] = useState({
    number: 1,
    crew_members: [initialMemberData]
  });

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Policy");
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Location");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (+value > 20) {
      toast.warning("Maximum crew members allowed is 20");
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(`/yachts/${createdYacht}/`, formData);
      if (response.status === 200) {
        toast.success("Crew Info Saved Successfully");
        setForm("Policy");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCrewNumberChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      number: value,
      crew_members: Array(+value)
        .fill(0)
        .map(() => ({ ...initialMemberData }))
    }));
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Crew</h6>
        </div>
        {/* Number of Crew */}
        <div className="col-12 p-2">
          <CustomInputField
            name="number"
            label="Number of Crew"
            placeholder="0"
            type="number"
            value={formData.number}
            onChange={handleCrewNumberChange}
          />
        </div>
        {Array(+formData?.number)
          .fill(0)
          .map((_, i) => {
            return (
              <CrewCard
                key={i}
                index={i}
                formData={formData.crew_members[i] || {}}
                setFormData={setFormData}
                handleChange={handleChange}
              />
            );
          })}
        <div className="col-12 p-2 pt-4 d-flex gap-3 ">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            className="save_btn ms-auto"
            name={"Save"}
            loading={loading}
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default CrewForm;
