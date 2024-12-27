import {
  handleChange,
  handlePhoneChange,
  checkPasswordStrength,
  filterEmptyKeys,
  formatNumber,
  stripSpaces,
  handleFileUpload,
} from "../../../utils/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EXCEPTION_MESSAGES } from "../../../utils/constants";
import InputField from "./../../../ui/form-elements/InputField";
import BackButton from "./../../../ui/form-elements/BackButton";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import PhoneField from "../../../ui/form-elements/PhoneField";
import PasswordField from "../../../ui/form-elements/PasswordField";
import SelectField from "./../../../ui/form-elements/SelectField";
import MapLocationField from "../../../ui/form-elements/MapLocationField";
import MapModal from "../../../ui/modals/MapModal";
import MediaUploadField from "../../../ui/form-elements/MediaUploadField";
import axiosInstance from "../../../utils/axiosInstance";
import useGetCountries from "../../../hooks/app/useGetCountries";

export default function HostForm({
  setShowRegisterForm,
  setShowOtpForm,
  formData,
  setFormData,
}) {
  const [loading, setLoading] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState("search on map");
  const [showMapModal, setShowMapModal] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const { data: countries } = useGetCountries();

  useEffect(() => {
    if (searchedPlace !== "search on map") {
      setFormData((prev) => ({
        ...prev,
        location_on_map: searchedPlace,
      }));
    }
  }, [searchedPlace, setFormData]);

  const handleNumberChange = (e) => {
    let { value } = e.target;
    value = stripSpaces(value);
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const formattedValue = formatNumber(value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
    e.target.value = formattedValue;
  };

  const handleSelectCity = (city) => {
    const cities = countries.find((c) => c.name === formData.country)?.cities;

    const selected = cities?.find((c) => c.name === city);

    setFormData((prev) => ({
      ...prev,
      city: city,
      lat: Number(selected.lat).toFixed(6),
      lng: Number(selected.lng).toFixed(6),
    }));
    setSearchedPlace(selected.name);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!checkPasswordStrength(formData.password)) {
      toast.error(EXCEPTION_MESSAGES[1][5]);
      setLoading(false);
      return;
    }
    try {
      const filteredData = filterEmptyKeys(formData);
      await axiosInstance.post("/user/signup", filteredData);
      toast.success("Verify your email to continue");
      setShowOtpForm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-12 p-2 d-flex flex-column gap-3">
          <InputField
            label="First Name"
            placeholder="Ex: james"
            required
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={(e) => handleChange(e, setFormData)}
          />
          <InputField
            label="Family Name"
            placeholder="Ex: brian"
            required
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <MediaUploadField
            label="Upload Your Logo"
            hint="(PNG or JPG)"
            labelIdle="LOGO"
            allowMultiple={false}
            companyLogo={true}
            pannelRatio={0.3666}
            accept={["image/png", "image/jpeg"]}
            files={formData.logo ? [formData.logo] : null}
            handleFileUpload={(fileItems) =>
              handleFileUpload(
                fileItems,
                "logos",
                null,
                setFormData,
                "logo",
                setFileLoading,
                fileLoading
              )
            }
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="Email Address"
            placeholder="EX: mail@mail.com"
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <PhoneField
            label="Mobile Number"
            placeholder="Enter phone number"
            required
            id="mobile_number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={(e) => handlePhoneChange(e, "mobile_number", setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="User Name"
            placeholder="EX: jamesbrian"
            type="text"
            required
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <PasswordField
            label="Password"
            placeholder="Enter password"
            required
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="Commercial Name"
            placeholder="EX: Ocean Network Express."
            type="text"
            id="commercial_name"
            name="commercial_name"
            value={formData.commercial_name}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label="Registration Type"
            options={[
              { value: "company", name: "Company" },
              { value: "freelancer", name: "Freelancer" },
            ]}
            id="registration_type"
            name="registration_type"
            value={formData.registration_type}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label={
              formData.registration_type === "company"
                ? "Registration Number"
                : "License Number"
            }
            name={
              formData.registration_type === "company"
                ? "registration_number"
                : "licence_number"
            }
            id={
              formData.registration_type === "company"
                ? "registration_number"
                : "licence_number"
            }
            type="text"
            pattern="\d{4} \d{4} \d{4} \d{4}"
            placeholder="XXXX XXXX XXXX XXXX"
            value={
              formData.registration_type === "company"
                ? formatNumber(formData.registration_number)
                : formatNumber(formData.licence_number)
            }
            onChange={handleNumberChange}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label="Company Location"
            required
            id="country"
            name="country"
            value={formData.country}
            options={countries?.map((country) => ({
              name: country?.name,
              value: country?.name,
            }))}
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value, city: "" });
            }}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label="City"
            required
            name="city"
            id="city"
            value={formData.city}
            options={countries
              ?.find((c) => c?.name === formData?.country)
              ?.cities?.map((city) => ({
                name: city?.name,
                value: city?.name,
              }))}
            onChange={(e) => handleSelectCity(e.target.value)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <MapLocationField
            htmlFor="companyLocationOnMap"
            label="Company Location"
            hint="(on map)"
            name={searchedPlace}
            setShowModal={setShowMapModal}
          />
        </div>
        <div className="col-12 p-2 mt-3">
          <div className="buttons">
            <BackButton onClick={() => setShowRegisterForm(false)} />
            <SubmitButton
              loading={loading || fileLoading}
              name={fileLoading ? "Logo Uploading" : "Confirm"}
            />
          </div>
        </div>
      </div>
      <MapModal
        formData={formData}
        setFormData={setFormData}
        title="Company Location"
        showModal={showMapModal}
        setShowModal={setShowMapModal}
        setSearchedPlace={setSearchedPlace}
      />
    </form>
  );
}
