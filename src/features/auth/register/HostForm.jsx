import {
  checkPasswordStrength,
  fetchCitiesForCountry,
  filterEmptyKeys,
  handleChange,
  handlePhoneChange,
  handleSelectCity,
  handleSelectCountry
} from "../../../utils/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authedUser";
import axios from "./../../../utils/axios";
import InputField from "./../../../ui/form-elements/InputField";
import BackButton from "./../../../ui/form-elements/BackButton";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import PhoneField from "../../../ui/form-elements/PhoneField";
import PasswordField from "../../../ui/form-elements/PasswordField";
import SelectField from "./../../../ui/form-elements/SelectField";
import MapLocationField from "../../../ui/form-elements/MapLocationField";
import MapModal from "../../../ui/modals/MapModal";
import ReactFlagsSelect from "react-flags-select";
import MediaUploadField from "../../../ui/form-elements/MediaUploadField";

export default function HostForm({ setFormSelection }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState("search on map");
  const [showMapModal, setShowMapModal] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [cityNameList, setCityNameList] = useState(null);

  const [formData, setFormData] = useState({
    role: "host",
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    username: "",
    password: "",
    commercial_name: "",
    registration_type: "company",
    registration_number: "",
    licence_number: "",
    country: "SA",
    city: "",
    lat: 24.7136,
    lng: 46.6753,
    location_on_map: ""
  });

  useEffect(() => {
    if (searchedPlace !== "search on map") {
      setFormData((prev) => ({
        ...prev,
        location_on_map: searchedPlace
      }));
    }
  }, [searchedPlace]);

  useEffect(() => {
    fetchCitiesForCountry(formData.country, setCityList, setCityNameList);
  }, [formData.country]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!checkPasswordStrength(formData.password)) {
      toast.error(
        "Password is weak! Must contain at least 8 characters, a mix of letters, numbers, and symbols."
      );
      setLoading(false);
      return;
    }
    try {
      const filteredData = filterEmptyKeys(formData);
      const res = await axios.post("/api/v1/user/signup", filteredData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Account created successfully");
        try {
          const login = await axios.post("/api/v1/web_login", {
            username: formData.username,
            password: formData.password,
            role: formData?.role
          });
          if (login?.status === 200) {
            navigate("/dashboard");
            dispatch(setUser(res.data));
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.access_token}`;
          }
        } catch (error) {
          toast.error("error occurred please try again");
          throw new Error(error);
        }
      } else {
        toast.error("email already exists");
      }
    } catch (error) {
      toast.error("error occurred please try again");
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
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
            companyLogo={true}
            pannelRatio={0.3666}
            accept={["image/png", "image/jpeg"]}
            files={formData.logo ? [formData.logo] : []}
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
              { value: "freelancer", name: "Freelancer" }
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
            type="number"
            placeholder="XXXX XXXX XXXX XXXX"
            value={
              formData.registration_type === "company"
                ? formData.registration_number
                : formData.licence_number
            }
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="companyLocation">
              Company Location. <span>(Country)</span>
            </label>
            <ReactFlagsSelect
              searchable={true}
              selectedSize={false}
              selected={formData?.country}
              onSelect={(code) => {
                handleSelectCountry(code, setFormData);
              }}
            />
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <SelectField
            label="city"
            name="city"
            id="city"
            required
            options={cityNameList?.map((city) => ({
              name: city,
              value: city
            }))}
            value={formData.city}
            onChange={(e) =>
              handleSelectCity(
                e.target.value,
                setSearchedPlace,
                setFormData,
                cityList
              )
            }
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
            <BackButton onClick={() => setFormSelection("")} />
            <SubmitButton loading={loading} name="Confirm" />
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
