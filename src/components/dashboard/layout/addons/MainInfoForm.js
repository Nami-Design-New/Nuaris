import React, { useState } from "react";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import FilesUpload from "./../../../ui/form-elements/FilesUpload";
import fav from "../../../../assets/images/fav.png";
import InputField from "./../../../ui/form-elements/InputField";
import CommentField from "./../../../ui/form-elements/CommentField";
import SelectField from "./../../../ui/form-elements/SelectField";
import Vat from "../Vat";

const MainInfoForm = ({ setForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [loading] = useState(false);
  const handleNext = (e) => {
    e.preventDefault();
    setForm("Working Time");
  };
  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Main Info</h6>
        </div>
        {/* photo upload */}
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="photos">
              Upload Photos <span>( Maximum 3 Pictures )</span>
            </label>
            <div className="photos">
              {[0, 1, 2].map((f) => {
                return (
                  <FilesUpload
                    key={f}
                    labelIdle={`${
                      f === 0 ? '<label class="mainImg">Main Image</label>' : ""
                    } <img src=${fav} alt="fav"/>`}
                    pannelRatio=".88"
                    accept={["image/png", "image/jpeg"]}
                    allowMultiple={false}
                    setFormData={setFormData}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* video upload */}
        <div className="col-lg-6 col-12 p-2">
          <FilesUpload
            htmlFor="vidoe"
            label="Upload Video"
            hint="( Max Size 20MB )"
            labelIdle="Drag & Drop your files or Browse"
            pannelRatio=".283"
            accept={["video/*"]}
            allowMultiple={false}
            setFormData={setFormData}
          />
        </div>
        {/* addon name */}
        <div className="col-12 p-2">
          <InputField
            htmlFor="name"
            label="Addon Name"
            id="AddonName"
            placeholder="Write here"
            value={formData.name}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* description */}
        <div className="col-12 p-2">
          <CommentField
            htmlFor="description"
            label="Description"
            id="description"
            placeholder="Write here"
            value={formData.description}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* category */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            htmlFor="category"
            label="category"
            id="category"
            value={formData.category}
            formData={formData}
            setFormData={setFormData}
            options={["c1", "c2"]}
          />
        </div>
        {/* quantity */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            htmlFor="quantity"
            label="Quantity"
            id="quantity"
            placeholder="00"
            value={formData.quantity}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* <div className="col-12 p-2">
          <label htmlFor="parent_yacht">Parent Yacht </label>
        </div> */}
        {/* vat */}
        <div className="col-12 p-2">
          <Vat />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default MainInfoForm;
