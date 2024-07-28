import {
  checkPasswordStrength,
  fetchCitiesForCountry,
  filterEmptyKeys,
  handleChange,
  handlePhoneChange,
  handleSelectCountry
} from "../../../utils/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/authedUser";
import axiosInstance from "../../../utils/axiosInstance";
import BackButton from "../../../ui/form-elements/BackButton";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import InputField from "../../../ui/form-elements/InputField";
import PhoneField from "../../../ui/form-elements/PhoneField";
import PasswordField from "../../../ui/form-elements/PasswordField";
import SelectField from "../../../ui/form-elements/SelectField";
import ReactFlagsSelect from "react-flags-select";
import MediaUploadField from "../../../ui/form-elements/MediaUploadField";

export default function AgentForm({ setFormSelection }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [cityNameList, setCityNameList] = useState(null);

  const [formData, setFormData] = useState({
    role: "agent",
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    username: "",
    password: "",
    commercial_name: "",
    registration_type: "freelancer",
    licence_number: "",
    country: "SA",
    city: ""
  });

  useEffect(() => {
    fetchCitiesForCountry(formData.country, setCityList, setCityNameList);
  }, [formData.country]);

  const handleSelectCity = (cityName) => {
    const selectedCity = cityList?.find((city) => city.name === cityName);
    if (selectedCity) {
      setFormData((prev) => ({
        ...prev,
        city: cityName
      }));
    }
  };

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
      const res = await axiosInstance.post("/api/v1/user/signup", filteredData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Account created successfully");
        try {
          const login = await axiosInstance.post("/api/v1/web_login", {
            username: formData.username,
            password: formData.password,
            role: formData?.role
          });
          if (login?.status === 200) {
            navigate("/dashboard");
            dispatch(setUser(res.data));
            axiosInstance.defaults.headers.common[
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
              { value: "freelancer", name: "Freelancer" },
              { value: "tour_guide", name: "Tour Guide" }
            ]}
            id="registration_type"
            name="registration_type"
            value={formData.registration_type}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <InputField
            label="License Number"
            name="licence_number"
            id="licence_number"
            type="number"
            placeholder="XXXX XXXX XXXX XXXX"
            value={formData.licence_number}
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
        <div className="col-12 p-2">
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
              handleSelectCity(e.target.value, setFormData, cityList)
            }
          />
        </div>
        <div className="col-12 p-2 mt-3">
          <div className="buttons">
            <BackButton onClick={() => setFormSelection("")} />
            <SubmitButton loading={loading} name="Confirm" />
          </div>
        </div>
      </div>
    </form>
  );
}
