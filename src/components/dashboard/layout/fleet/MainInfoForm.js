import React from "react";
import InputField from "../../../ui/form-elements/InputField";
import SelectField from "./../../../ui/form-elements/SelectField";
import CommentField from "./../../../ui/form-elements/CommentField";
import TimeWithUnit from "../../../ui/form-elements/TimeWithUnit";
import FilesUpload from "../../../ui/form-elements/FilesUpload";

const MainInfoForm = ({ formData, setFormData, setForm }) => {
  const handleNext = (e) => {
    e.preventDefault();
    setForm("Location");
  };
  return (
    <div className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Main Info</h6>
        </div>
        {/* boat type */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            htmlFor="boatType"
            label="Boat Type"
            id="boatType"
            options={["t1", "t2", "t3"]}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel brand */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            htmlFor="vesselBrand"
            label="Vessel Brand"
            id="vesselBrand"
            options={["t1", "t2", "t3"]}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel name */}
        <div className="col-12 p-2">
          <InputField
            htmlFor="vesselName"
            label="Vessel Name"
            placeholder="Write here"
            id="vesselName"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel number */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            htmlFor="vesselNumber"
            label="Vessel Number"
            placeholder="Write here"
            id="vesselNumber"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel license number */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            htmlFor="vesselLicenseNumber"
            label="Vessel license Number"
            placeholder="Write here"
            id="vesselLicenseNumber"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* Vessel License and registration */}
        <div className="col-12 p-2">
          <FilesUpload
            htmlFor="files"
            label="Vessel License and registration"
            setFormData={setFormData}
          />
        </div>
        {/* license expiration date */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="date"
            htmlFor="licenseExpireDate"
            label="License expiration date"
            id="licenseExpireDate"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* preparation time */}
        <div className="col-lg-6 col-12 p-2">
          <TimeWithUnit
            htmlFor="boatType"
            label="Preparation Time"
            hint="(Time Between trips needed)"
            id="preparationTime"
            options={["00", "02", "03"]}
            units={["Minutes", "Houres"]}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* description */}
        <div className="col-12 p-2">
          <CommentField
            htmlFor="description"
            label="Description"
            placeholder="Write here"
            id="description"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="save_btn ms-auto">Save</button>
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainInfoForm;
