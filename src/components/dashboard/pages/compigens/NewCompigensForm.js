import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import CommentField from "../../../ui/form-elements/CommentField";
import InputWithUnit from "../../../ui/form-elements/InputWithUnit";
import InputField from "../../../ui/form-elements/InputField";
import { SEND_OPTIONS } from "../../../../constants";
import RadioInput from "../../../ui/form-elements/RadioInput";

function NewCompigensForm({ compigens }) {
  const [formData, setFormData] = useState({
    type: "select",
    brand: "select",
    campaign_name: "",
    name_ar: "",
    number: "",
    license_number: "",
    license_file: "",
    license_expire_date: "",
    preparation_time: "",
    description: "",
    description_ar: "",
  });
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const subUserSet = user?.subuser_set;

  useEffect(() => {
    if (compigens) {
      setFormData({
        type: compigens?.type,
        brand: compigens?.brand,
        campaign_name: compigens?.campaign_name,
        name_ar: compigens?.name_ar,
        number: compigens?.number,
        license_number: compigens?.license_number,
        license_file: compigens?.license_file,
        license_expire_date: compigens?.license_expire_date,
        preparation_time: compigens?.preparation_time,
        description: compigens?.description,
        description_ar: compigens?.description_ar,
      });
    }
  }, [compigens]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Marketing campaign</h6>
        </div>
        {/* Campaign name */}
        <div className="col-12 p-2">
          <InputField
            htmlFor="campaign_name"
            label="Campaign name"
            id="campaignName"
            placeholder="Write here"
            value={formData.campaign_name}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="row p-2">
          <h6 className="col-12 ">send campaign via</h6>
          {SEND_OPTIONS.map((option) => (
            <RadioInput name="send_option" key={option} label={option} />
          ))}
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
            value={formData.description}
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
            name="Save"
            className="save_btn ms-auto"
          />
        </div>
      </div>
    </form>
  );
}

export default NewCompigensForm;
