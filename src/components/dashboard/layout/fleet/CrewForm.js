import { useEffect, useState } from "react";
import CrewCard from "./CrewCard";
import { toast } from "react-toastify";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import axios from "../../../../util/axios";
import addRow from "../../../../assets/images/add.svg";

const CrewForm = ({ setForm, yacht }) => {
  const createdYacht = sessionStorage.getItem("yacht_id");
  const [loading, setLoading] = useState(false);

  const initialMemberData = {
    name: "",
    nationality: "SA",
    gender: "male"
  };
  const [formData, setFormData] = useState({
    crew: [initialMemberData]
  });

  useEffect(() => {
    setFormData({
      crew: yacht?.crews || [initialMemberData]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yacht]);

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Policy");
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Location");
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      crew: [...prev.crew, initialMemberData]
    }));
  };

  const handleDeleteRow = (e, index) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      crew: prev.crew.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      crew: prev?.crew?.map((member, index) => {
        if (index === i) {
          return { ...member, [name]: value };
        }
        return member;
      })
    }));
  };

  const handleNationalityChange = (countryCode, i) => {
    setFormData((prev) => ({
      ...prev,
      crew: prev?.crew?.map((member, index) => {
        if (index === i) {
          return { ...member, nationality: countryCode };
        }
        return member;
      })
    }));
  };

  const handleGenderChange = (gender, i) => {
    setFormData((prev) => ({
      ...prev,
      crew: prev?.crew?.map((member, index) => {
        if (index === i) {
          return { ...member, gender };
        }
        return member;
      })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url = yacht?.id
        ? `/yachts/${yacht?.id}/`
        : `/yachts/${createdYacht}/`;
      const response = await axios.patch(url, formData);
      if (response.status === 200) {
        yacht
          ? toast.success("Crew Info Updated Successfully")
          : toast.success("Crew Info Saved Successfully");
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

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <h6 className="form_title m-0">Crew</h6>
          <button
            disabled={formData.crew.length === 20}
            onClick={(e) => handleAddRow(e)}
          >
            <img src={addRow} alt="add-row" />
          </button>
        </div>
        {formData?.crew?.map((member, i) => (
          <CrewCard
            key={i}
            index={i}
            member={member}
            onChange={handleChange}
            onDelete={handleDeleteRow}
            lenght={formData?.crew?.length}
            handleGenderChange={handleGenderChange}
            handleNationalityChange={handleNationalityChange}
          />
        ))}
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
