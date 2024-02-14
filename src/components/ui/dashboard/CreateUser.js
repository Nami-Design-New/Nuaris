import React, { useState } from "react";
import PageHeader from "./PageHeader";
import NameField from "./../form-elements/NameField";
import SelectField from "../form-elements/SelectField";
import ReactFlagsSelect from "react-flags-select";
import InputField from "../form-elements/InputField";

const CreateUser = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({});
  const backLinks = [
    { name: "Dashboard", to: "/host-dashboard" },
    { name: "Invite User", to: "/host-dashboard/invite-user" },
  ];
  return (
    <React.Fragment>
      <PageHeader
        name="Create a User"
        backLinks={backLinks}
        hint="(employee)"
      />
      <div className="inner_card">
        <form className="row m-0 form-ui">
          <div className="col-lg-4  col-12 p-2">
            <NameField formData={formData} setFormData={setFormData} />
          </div>
          <div className="col-lg-4  col-12 p-2">
            <SelectField
              htmlFor="position"
              label="Position"
              options={[
                "Admin",
                "Supervisor",
                "Oprator",
                "Financial",
                "Yacht Management",
                "Marketing and Promotions",
                "Analytics and Reporting",
                "Customer Interaction",
              ]}
              formData={formData}
              setFormData={setFormData}
              id="position"
            />
          </div>
          <div className="col-lg-4  col-12 p-2">
            <div className="input-field">
              <label htmlFor="Nationality">Nationality</label>
              <ReactFlagsSelect
                searchable={true}
                selectedSize={false}
                onSelect={(code) => {
                  setSelectedCountry(code);
                }}
                selected={selectedCountry}
                defaultCountry="AE"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="email"
              label="Email Address"
              placeholder="EX: mail@mail.com"
              type="email"
              id="email"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateUser;
