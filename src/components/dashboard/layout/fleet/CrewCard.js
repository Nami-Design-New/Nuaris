import React, { useEffect, useState } from "react";
import InputField from "../../../ui/form-elements/InputField";
import ReactFlagsSelect from "react-flags-select";
import GenderSelect from "../../../ui/GenderSelect";

const CrewCard = ({ index, setFormData }) => {
  const [memberData, setMemberData] = useState({
    name: "",
    nationality: "SA",
    gender: "male"
  });

  useEffect(() => {
    setFormData((prev) => {
      const updatedCrewMembers = [...prev.crew];
      updatedCrewMembers[index] = memberData;
      return {
        ...prev,
        crew: updatedCrewMembers
      };
    });
  }, [index, memberData, setFormData]);

  const handleNameChange = (e) => {
    const { value } = e.target;
    setMemberData((prev) => ({
      ...prev,
      name: value
    }));
  };

  const handleNationalityChange = (code) => {
    setMemberData((prev) => ({
      ...prev,
      nationality: code
    }));
  };

  const handleGenderChange = (gender) => {
    setMemberData((prev) => ({
      ...prev,
      gender: gender
    }));
  };

  return (
    <div className="col-12 p-2">
      <div className="member_card">
        <p className="card_header">Crew member {index + 1}</p>
        <div className="card_row">
          <div>
            <InputField
              htmlFor="name"
              label="Name"
              placeholder="Ex: Mahmoud"
              type="text"
              id={`crewName_${index}`}
              value={memberData.name}
              formData={memberData}
              setFormData={setMemberData}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor={`nationality_${index}`}>Nationality</label>
            <ReactFlagsSelect
              searchable={true}
              selectedSize={false}
              selected={memberData.nationality}
              id={`nationality_${index}`}
              blacklistCountries={["IL"]}
              className="flag-select"
              onSelect={handleNationalityChange}
            />
          </div>
        </div>
        <div className="card_row">
          <GenderSelect
            index={index}
            formData={memberData}
            setFormData={setMemberData}
            onChange={handleGenderChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
