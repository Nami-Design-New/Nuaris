import React from "react";
import ReactFlagsSelect from "react-flags-select";

const LocationForm = ({ formData, setFormData, setForm }) => {
  return (
    <div className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Location</h6>
        </div>
        {/* country */}
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="companyLocation">Company Location. (Country)</label>
            <ReactFlagsSelect searchable={true} selectedSize={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
