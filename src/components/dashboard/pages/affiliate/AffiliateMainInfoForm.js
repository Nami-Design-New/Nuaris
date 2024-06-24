import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputField from "../../../ui/form-elements/InputField";
import PhoneField from "../../../ui/form-elements/PhoneField";
import IBANInputField from "../../../ui/form-elements/IBANInputField";
import SelectField from "../../../ui/form-elements/SelectField";
import { OPTIONS } from "../../../../constants";

function AffiliateMainInfoForm({ setForm, affiliate }) {
  const [formData, setFormData] = useState({
    type: "select",
    brand: "select",
    name: "",
    number: "",
    license_number: "",
    license_file: "",
    license_expire_date: "",
    preparation_time: "",
  });

  useEffect(() => {
    if (affiliate) {
      setFormData({
        type: affiliate?.type,
        brand: affiliate?.brand,
        name: affiliate?.name,
        number: affiliate?.number,
        license_number: affiliate?.license_number,
        license_file: affiliate?.license_file,
        license_expire_date: affiliate?.license_expire_date,
        preparation_time: affiliate?.preparation_time,
      });
    }
  }, [affiliate]);

  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const subUserSet = user?.subuser_set;

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Services");
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
      const response = await axios.request({
        url: affiliate?.id ? `/affiliates/${affiliate.id}/` : "/affiliates/",
        method: affiliate ? "PATCH" : "POST",
        data,
      });
      if (response.status === 201 || response.status === 200) {
        setForm("Location");
        affiliate
          ? toast.success("Main Info Updated Successfully")
          : toast.success("Main Info Saved Successfully");
        sessionStorage.setItem("affiliate_id", response?.data?.id);
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
        <div className="row col-12 p-2">
          {/* Name */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="name"
              label="Name"
              id="Name"
              placeholder="EX: Mahmoud Gamal"
              value={formData.name}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* License Number */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              type="number"
              htmlFor="license_number"
              label="License Number"
              value={formData.license_number}
              placeholder="00"
              id="LicenseNumber"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* email */}
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
          {/* Phone Number */}
          <div className="col-lg-6 col-12 p-2">
            <PhoneField
              formData={formData}
              setFormData={setFormData}
              id="mobile_number"
            />
          </div>
          {/* WhatsApp Number */}
          <div className="col-lg-6 col-12 p-2">
            <PhoneField
              formData={formData}
              setFormData={setFormData}
              id="whatsapp_number"
            />
          </div>
          {/* Bank IBAN */}
          <div className="col-lg-6 col-12 p-2">
            <IBANInputField
              label={"Promoter Bank account IBAN"}
              tyoe="number"
              id="account_number"
              name="account_number"
              placeholder="EX: SA xxxxx"
              value={formData.iban}
              onChange={(e) =>
                setFormData({ ...formData, iban: e.target.value })
              }
            />
          </div>
          {/*  Affiliate link options */}
          <div className="col-lg-6 col-12 p-2">
            <SelectField
              htmlFor="type"
              label=" Affiliate link options"
              id="boatType"
              value={formData.link_options}
              formData={formData}
              setFormData={setFormData}
              options={OPTIONS}
            />
          </div>
          {/* Value */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              type="number"
              htmlFor="value"
              label="License Number"
              value={formData.value}
              placeholder="00"
              id="Value"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* Link period */}
          <div className="row col-12 p-2 m-0">
            <h6 className="col-12 m-0">Link period</h6>
            <div className="row col-12 p-0 row m-0">
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  type="date"
                  htmlFor="DateFrom"
                  label="From"
                  id="scheduleDateFrom"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  type="date"
                  htmlFor="DateTO"
                  label="TO"
                  id="scheduleDateTO"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          </div>
          {/* Next Button */}
          <div className="d-flex justify-content-end row col-12 m-0">
            <button className="next_btn" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AffiliateMainInfoForm;
