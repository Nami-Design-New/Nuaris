import React, { useState } from "react";
import InputField from "../../../ui/form-elements/InputField";
import ReactFlagsSelect from "react-flags-select";
import GenderSelect from "../../../ui/GenderSelect";

const CrewCard = ({ index }) => {
  const [memberData, setMemberData] = useState({
    name: "",
    nationality: "EG",
    gender: "male"
  });

  return (
    <div className="col-12 p-2">
      <div className="member_card">
        <p className="card_header">Crew member {index || 1}</p>
        <div className="card_row">
          <div>
            <InputField
              htmlFor="name"
              label="Name"
              placeholder="Ex: mahmoud"
              type="text"
              id="crewName"
              formData={memberData}
              setFormData={setMemberData}
            />
          </div>
          <div>
            <label htmlFor="nationality">Nationality</label>
            <ReactFlagsSelect
              searchable={true}
              selectedSize={false}
              selected={memberData.nationality}
              id="nationality"
              blacklistCountries={["IL"]}
              className="flag-select"
              onSelect={(code) => {
                setMemberData((prev) => ({ ...prev, nationality: code }));
              }}
            />
          </div>
        </div>
        <div className="card_row">
          <GenderSelect formData={memberData} setFormData={setMemberData} />
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
