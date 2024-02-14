import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import NameField from "./../form-elements/NameField";
import SelectField from "../form-elements/SelectField";
import ReactFlagsSelect from "react-flags-select";
import InputField from "../form-elements/InputField";
import PhoneField from "../form-elements/PhoneField";
import { useSelector } from "react-redux";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import SubmitButton from "../form-elements/SubmitButton";

const CreateUser = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, parent: user.id });
    }
  }, [user]);

  const backLinks = [
    { name: "Dashboard", to: "/host-dashboard" },
    { name: "Invite User", to: "/host-dashboard/invite-user" },
  ];
  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    url: "/users/invite-user/",
    headers: headersList,
    data: formData,
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.request(requestOptions);
      toast.success("invitation sent successfully");
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((field) => {
          errors[field].forEach((message) => {
            toast.error(`${field}: ${message}`);
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <PageHeader
        name="Create a User"
        backLinks={backLinks}
        hint="(employee)"
      />
      <div className="inner_card">
        <form onSubmit={handleSubmit} className="row m-0 form-ui">
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
                "Operator",
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
                  setFormData({ ...formData, nationality: code });
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
          <div className="col-lg-6 col-12 p-2">
            <PhoneField formData={formData} setFormData={setFormData} />
          </div>
          <div className="col-12 p-2 d-flex">
            <SubmitButton loading={loading} name="Create" />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateUser;
