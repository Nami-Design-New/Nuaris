import React, { useState } from "react";
import InputField from "../../../ui/form-elements/InputField";
import SelectField from "./../../../ui/form-elements/SelectField";
import CommentField from "./../../../ui/form-elements/CommentField";
import InputWithUnit from "../../../ui/form-elements/InputWithUnit";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { toast } from "react-toastify";
import axios from "./../../../../util/axios";
import { useSelector } from "react-redux";
import { BRANDS, S3Config, TYPE } from "../../../../constants";
import { uploadFile } from "react-s3";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
window.Buffer = window.Buffer || require("buffer").Buffer;

const MainInfoForm = ({ setForm }) => {
  // ======== start file upload configration =======//
  const [fileLoading, setFileLoading] = useState(false);
  const handleUploadMedia = async (file) => {
    setFileLoading(true);
    try {
      const blob = file.slice(0, file.size, file.type);
      const newFile = new File([blob], `${Date.now()}${file.name.slice(-5)}`, {
        type: file.type,
      });
      const data = await uploadFile(newFile, S3Config);
      return data.location;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    } finally {
      setFileLoading(false);
    }
  };

  const handleFileChange = async (e, i) => {
    try {
      if (!fileLoading) {
        const file = e[0].file;
        const link = await handleUploadMedia(file);
        setFormData((prev) => ({ ...prev, license_file: link }));
      }
    } catch (error) {
      console.error("Error handling image upload:", error);
      setFileLoading(false);
      toast.error("Error uploading image");
    }
  };
  // ======== end file upload configuration =======//

  const [formData, setFormData] = useState({
    type: "select",
    brand: "select",
    name_en: "",
    name_ar: "",
    number: "",
    license_number: "",
    license_file: "",
    license_expire_date: "",
    preparation_time: "",
    description_en: "",
    description_ar: "",
  });
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const subUserSet = user?.subuser_set;

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Location");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const subUser = subUserSet?.filter((u) => u.role === user.current_role);
      if (!subUser) {
        throw new Error("No matching sub user found");
      }
      const data = {
        ...formData,
        sub_user: subUser[0]?.id,
        type: formData.type.toLowerCase(),
      };
      const response = await axios.post("/yachts/", data);
      if (response.status === 201) {
        setForm("Location");
        toast.success("Main Info Saved Successfully");
        sessionStorage.setItem("yacht_id", response?.data?.id);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Main Info</h6>
        </div>
        {/* boat type */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            htmlFor="type"
            label="Boat Type"
            id="boatType"
            value={formData.type}
            formData={formData}
            setFormData={setFormData}
            options={TYPE}
          />
        </div>
        {/* vessel brand */}
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            htmlFor="brand"
            label="Vessel Brand"
            id="vesselBrand"
            value={formData.brand}
            formData={formData}
            setFormData={setFormData}
            options={BRANDS}
          />
        </div>
        {/* vessel name english */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            htmlFor="name_en"
            label="Vessel Name"
            hint="( English )"
            id="vesselName"
            placeholder="Write here"
            value={formData.name_en}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel name arabic */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            htmlFor="name_ar"
            label="Vessel Name"
            hint="( عربى )"
            id="vesselName"
            placeholder="Write here"
            value={formData.name_ar}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel number */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            htmlFor="number"
            label="Vessel Number"
            placeholder="Write here"
            id="vesselNumber"
            value={formData.number}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* vessel license number */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="number"
            htmlFor="license_number"
            label="Vessel license Number"
            value={formData.license_number}
            placeholder="Write here"
            id="vesselLicenseNumber"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* Vessel License and registration */}
        <div className="col-12 p-2">
          <CustomFileUpload
            label="Vessel License and registration"
            labelIdle="Drag & Drop your files or Browse"
            pannelRatio=".075"
            accept={["application/pdf"]}
            allowMultiple={false}
            onUpdateFiles={(e) => handleFileChange(e)}
          />
        </div>
        {/* license expiration date */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            type="date"
            htmlFor="license_expire_date"
            label="License expiration date"
            id="licenseExpireDate"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* preparation time */}
        <div className="col-lg-6 col-12 p-2">
          <InputWithUnit
            htmlFor="preparation_time"
            label="Preparation Time"
            hint="(Time Between trips needed)"
            id="preparationTime"
            units={["Minutes", "Houres"]}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        {/* description english */}
        <div className="col-lg-6 col-12 p-2">
          <CommentField
            htmlFor="description_en"
            hint="( English )"
            label="Description"
            placeholder="Write here"
            id="description"
            formData={formData}
            setFormData={setFormData}
            value={formData.description_en}
          />
        </div>
        {/* description arabic */}
        <div className="col-lg-6 col-12 p-2">
          <CommentField
            htmlFor="description_ar"
            hint="( عربى )"
            label="Description"
            placeholder="Write here"
            id="description"
            formData={formData}
            setFormData={setFormData}
            value={formData.description_ar}
          />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading}
            fileLoading={fileLoading}
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
