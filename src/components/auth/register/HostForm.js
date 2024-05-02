import React, { useEffect, useState } from "react";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { State } from "country-state-city";
import { useNavigate } from "react-router";
import { uploadFile } from "react-s3";
import { S3Config } from "../../../constants";
import ReactFlagsSelect from "react-flags-select";
// ui elements
import MapModal from "./../../ui/map-modal/MapModal";
import InputField from "../../ui/form-elements/InputField";
import PhoneField from "../../ui/form-elements/PhoneField";
import BackButton from "./../../ui/form-elements/BackButton";
import SelectField from "./../../ui/form-elements/SelectField";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import MapLocationField from "./../../ui/form-elements/MapLocationField";
import CustomFileUpload from "./../../ui/form-elements/CustomFileUpload";

const HostForm = ({ setFormSelection }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cities, setCities] = useState([]);
  const [cityForCountry, setCityForCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("SA");
  const [serchedPlace, setSerchedPlace] = useState("Search on Map");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    registration_type: "Company",
    country: "SA",
    city: "'Asir",
    role: "host",
    lat: 24.7136,
    lng: 46.6753,
    location_on_map: ""
  });

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        location_on_map: serchedPlace
      };
    });
  }, [serchedPlace]);

  // ========= media ========== //
  const handleUploadMedia = async (file) => {
    if (fileLoading) {
      return "";
    }
    setFileLoading(true);
    try {
      const blob = file.slice(0, file.size, file.type);
      const newFile = new File([blob], `${Date.now()}${file.name.slice(-3)}`, {
        type: file.type
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
  const handleImagesChange = async (e, i) => {
    if (e?.length === 0) {
      setFormData((prev) => {
        return {
          ...prev,
          logo: null
        };
      });
      return;
    }
    if (fileLoading) {
      return;
    }
    try {
      const file = e[0].file;
      const link = await handleUploadMedia(file);
      setFormData((prev) => {
        return {
          ...prev,
          logo: link
        };
      });
    } catch (error) {
      console.error("Error handling image upload:", error);
      toast.error("Error uploading image");
    } finally {
      setFileLoading(false);
    }
  };

  const fetchCitiesForCountry = (countryCode) => {
    const citiesArray = State.getStatesOfCountry(countryCode);
    const citiesNames = citiesArray.map((city) => city.name);
    setCities(citiesArray);
    setCityForCountry(citiesNames);
    setFormData({ ...formData, country: countryCode });
  };
  useEffect(() => {
    fetchCitiesForCountry(selectedCountry);
    // eslint-disable-next-line
  }, []);
  // Handle country selection
  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    fetchCitiesForCountry(countryCode);
  };
  // Handle city selection
  const handleSelectCity = (cityName) => {
    const selectedCity = cities.find((city) => city.name === cityName);
    if (selectedCity) {
      setFormData({
        ...formData,
        city: cityName,
        lat: Number(selectedCity.latitude).toFixed(6),
        lng: Number(selectedCity.longitude).toFixed(6)
      });
    }
  };

  /* form Submit requirments [Host Register] */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/users/", formData, {
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          Authorization: null
        }
      });

      if (res?.response?.data?.non_field_errors) {
        toast.error(res.response.data.non_field_errors[0]);
        return;
      }

      if (res.status === 201) {
        toast.success("Account created successfully");
        navigate("/login");
      } else {
        setErrors(res.response.data);
        toast.error(`Something went wrong`);
      }
    } catch (error) {
      const errors = error.response.data;
      Object.keys(errors).forEach((field) => {
        errors[field].forEach((message) => {
          toast.error(`${field}: ${message}`);
        });
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-ui">
      <div className="container p-0">
        <div className="row m-0">
          {/* first and last name */}
          <div className="col-lg-6 col-12 p-2 d-flex flex-column gap-3">
            <InputField
              htmlFor="first_name"
              label="First Name"
              placeholder="Ex: mahmoud"
              id="firstName"
              formData={formData}
              setFormData={setFormData}
            />
            <InputField
              htmlFor="last_name"
              label="Family Name"
              placeholder="Ex: mahmoud"
              id="lastName"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* logo */}
          <div className="col-lg-6 col-12 p-2">
            <CustomFileUpload
              pannelRatio={0.3666}
              label="Upload Your Logo"
              labelIdle={"LOGO"}
              companyLogo={true}
              hint="(PNG or JPG)"
              accept={["image/png", "image/jpeg"]}
              files={formData.logo ? [formData.logo] : []}
              onUpdateFiles={handleImagesChange}
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
            {errors?.email && (
              <small className="error">{errors?.email[0]}</small>
            )}
          </div>
          {/* phone number */}
          <div className="col-lg-6 col-12 p-2">
            <PhoneField
              formData={formData}
              setFormData={setFormData}
              id="mobile_number"
            />
            {errors?.phone && (
              <small className="error">{errors?.phone[0]}</small>
            )}
          </div>
          {/* username */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="username"
              label="Username"
              placeholder="EX: mahmoudgmal"
              id="userName"
              formData={formData}
              setFormData={setFormData}
            />
            {errors?.username && (
              <small className="error">{errors?.username[0]}</small>
            )}
          </div>
          {/* password */}
          <div className="col-lg-6 col-12 p-2">
            <PasswordField
              htmlFor="password"
              label="Password"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* commercial name */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="commercial_name"
              label="Commercial Name"
              placeholder="EX: luxury "
              id="commercialName"
              formData={formData}
              setFormData={setFormData}
            />
            {errors?.commercial_name && (
              <small className="error">{errors?.commercial_name[0]}</small>
            )}
          </div>
          {/* registration type */}
          <div className="col-lg-6 col-12 p-2">
            <SelectField
              htmlFor="registration_type"
              label="Registration Type"
              options={["Company", "Freelancer"]}
              formData={formData}
              setFormData={setFormData}
              id="registrationType"
            />
            {errors?.registration_type && (
              <small className="error">{errors?.registration_type[0]}</small>
            )}
          </div>
          {/*registration number */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              type="number"
              formData={formData}
              setFormData={setFormData}
              htmlFor={
                formData.registration_type === "Company"
                  ? "registration_number"
                  : "licence_number"
              }
              label={
                formData.registration_type === "Company"
                  ? "Registration Number"
                  : "License Number"
              }
              placeholder="XXXX XXXX XXXX XXXX"
              id="registrationNumber"
            />
            {errors?.registration_number && (
              <small className="error">{errors?.registration_number[0]}</small>
            )}
          </div>
          {/* country */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="companyLocation">
                Company Location. <span>(Country)</span>
              </label>
              <ReactFlagsSelect
                searchable={true}
                selectedSize={false}
                selected={selectedCountry}
                onSelect={(code) => {
                  handleSelectCountry(code);
                }}
              />
            </div>
          </div>
          {/* City */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="city">
                Company Location <span>(City)</span>
              </label>
              <select
                name="city"
                id="city"
                onChange={(e) => handleSelectCity(e.target.value)}
              >
                {cityForCountry ? (
                  cityForCountry.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))
                ) : (
                  <option value={""}>Please select a country</option>
                )}
              </select>
            </div>
          </div>
          {/* longitude latitude */}
          <div className="col-lg-6 col-12 p-2">
            <MapLocationField
              htmlFor="companyLocationOnMap"
              label="Company Location"
              hint="(on map)"
              name={serchedPlace}
              setShowModal={setShowModal}
            />
          </div>
          {/* map modal */}
          <MapModal
            showModal={showModal}
            setShowModal={setShowModal}
            setFormData={setFormData}
            title="Company Location"
            formData={formData}
            setSerchedPlace={setSerchedPlace}
          />
          <div className="col-12 p-2 mt-3">
            <div className="buttons">
              <BackButton setFormSelection={setFormSelection} />
              <SubmitButton loading={loading} name="Confirm" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HostForm;
