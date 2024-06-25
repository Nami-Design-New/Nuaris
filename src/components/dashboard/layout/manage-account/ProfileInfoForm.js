import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import CustomFileUpload from "../../../ui/form-elements/CustomFileUpload";
import PhoneField from "../../../ui/form-elements/PhoneField";
import CustomSelectField from "./../../../ui/form-elements/CustomSelectField";
import MapModal from "../../../ui/map-modal/MapModal";
import MapLocationField from "../../../ui/form-elements/MapLocationField";
import CommentField from "./../../../ui/form-elements/CommentField";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { handleUploadMedia } from "../../../../util/helpers";
import { toast } from "react-toastify";
import { setUser } from "../../../../redux/slices/authenticatedUserSlice";

const ProfileInfoForm = () => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("SA");
  const [formData, setFormData] = useState({});
  const [serchedPlace, setSerchedPlace] = useState("Search on Map");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        location_on_map: serchedPlace
      };
    });
  }, [serchedPlace]);

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        logo: user.logo || null,
        email: user.email || "",
        mobile_number: user.mobile_number || "",
        commercial_name: user.commercial_name || "",
        country: user.country || "SA",
        city: user.city || "",
        licence_number: user.licence_number || "",
        registration_number: user.registration_number || "",
        lat: user.lat || 24.7136,
        lng: user.lng || 46.6753,
        about: user.about || "",
        currency: user.currency || "SAR",
        location_on_map: user.location_on_map || ""
      };
    });

    setSelectedCountry(user.country || "SA");
  }, [user]);

  const fetchCitiesForCountry = async (countryCode) => {
    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "dW5kZXJwYXNzLXVzZXItdmVyaWZpY2F0aW9uLXByb3ZpZGVycy1jYXJkLW9uZQ=="
    );

    var requestOptions = {
      method: "GET",
      url: ` https://api.countrystatecity.in/v1/countries/${countryCode}/cities`,
      headers: headers,
      redirect: "follow"
    };

    try {
      const response = await axios.request(requestOptions);
      const citiesData = response.data.results[0].address_components;
      const citiesNames = citiesData.map((city) => city.long_name);
      setCities(citiesNames);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCitiesForCountry(selectedCountry);
  }, [selectedCountry]);

  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const handleSelectCity = (cityName) => {
    setFormData({
      ...formData,
      city: cityName
    });
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
      const link = await handleUploadMedia(file, setFileLoading, fileLoading);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`/users/${user.id}/`, formData);
      if (res.status === 200 || res.status === 201) {
        dispatch(setUser(res.data));
        toast.success("Profile updated successfully");
      } else {
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
    <div className="bg_white_card">
      <form className="form-ui" onSubmit={handleSubmit}>
        <div className="row m-0">
          <div className="col-12 p-2">
            <h6 className="form_title">Profile Info</h6>
          </div>
          {/* logo */}
          <div className="col-lg-6 col-12 p-2">
            <CustomFileUpload
              pannelRatio={0.43}
              label="Upload Your Logo"
              labelIdle={"LOGO"}
              accept={["image/png", "image/jpeg"]}
              files={formData.logo ? [formData.logo] : []}
              onUpdateFiles={handleImagesChange}
            />
          </div>
          {/* first and last name */}
          <div className="col-lg-6 col-12 p-2 d-flex flex-column gap-3">
            <CustomInputField
              htmlFor="first_name"
              label="First Name"
              placeholder="Ex: mahmoud"
              id="firstName"
              value={formData.first_name}
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    first_name: e.target.value
                  };
                })
              }
            />
            <CustomInputField
              htmlFor="last_name"
              label="Family Name"
              placeholder="Ex: mahmoud"
              id="lastName"
              value={formData.last_name}
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    last_name: e.target.value
                  };
                })
              }
            />
          </div>
          {/* email */}
          <div className="col-lg-6 col-12 p-2">
            <CustomInputField
              htmlFor="email"
              label="Email Address"
              placeholder="EX: mail@mail.com"
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    email: e.target.value
                  };
                })
              }
            />
          </div>
          {/* phone number */}
          <div className="col-lg-6 col-12 p-2">
            <PhoneField
              formData={formData}
              setFormData={setFormData}
              id="mobile_number"
              value={formData.mobile_number}
            />
          </div>
          {/* commercial name */}
          <div className="col-lg-6 col-12 p-2">
            <CustomInputField
              htmlFor="commercial_name"
              label="Commercial Name"
              placeholder="EX: luxury "
              id="commercialName"
              value={formData.commercial_name}
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    commercial_name: e.target.value
                  };
                })
              }
            />
          </div>
          {/*registration number */}
          <div className="col-lg-6 col-12 p-2">
            <CustomInputField
              type="number"
              placeholder="XXXX XXXX XXXX XXXX"
              id="registrationNumber"
              htmlFor={
                user.registration_type === "Company"
                  ? "registration_number"
                  : "licence_number"
              }
              label={
                user.registration_type === "Company"
                  ? "Registration Number"
                  : "License Number"
              }
              value={
                user.registration_type === "Company"
                  ? formData.registration_number
                  : formData.licence_number
              }
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    [user.registration_type === "Company"
                      ? "registration_number"
                      : "licence_number"]: e.target.value
                  };
                })
              }
            />
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
                value={formData.city}
                onChange={(e) => handleSelectCity(e.target.value)}
              >
                <option value={""}>select city</option>
                {cities ? (
                  cities.map((city, index) => (
                    <option key={index} value={city?.name}>
                      {city?.name}
                    </option>
                  ))
                ) : (
                  <option value={""}>Please select a country</option>
                )}
              </select>
            </div>
          </div>
          {/* currency */}
          <div className="col-12 p-2">
            <CustomSelectField
              label="Currency"
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              name="currency"
              id="currency"
              options={[
                { value: "SAR", name: "SAR" },
                { value: "AED", name: "AED " },
                { value: "USD", name: "USD" },
                { value: "EUR", name: "EUR" }
              ]}
            />
          </div>
          {/* longitude latitude */}
          <div className="col-12 p-2">
            <MapLocationField
              htmlFor="companyLocationOnMap"
              label="Company Location"
              hint="(on map)"
              name={formData.location_on_map}
              setShowModal={setShowModal}
            />
          </div>
          {/* Something about your Company */}
          <div className="col-12 p-2">
            <CommentField
              label={"Something about your Company"}
              value={formData.about}
              formData={formData}
              htmlFor={"about"}
              setFormData={setFormData}
              id={"about"}
              placeholder={"Write Here"}
            />
          </div>
          {/* map modal */}
          <MapModal
            showModal={showModal}
            setShowModal={setShowModal}
            setFormData={setFormData}
            title="Company Location"
            formData={formData}
            showLocationFirst={true}
            setSerchedPlace={setSerchedPlace}
          />
        </div>
        {/* submit btn */}
        <div className="col-12 p-2">
          <SubmitButton loading={loading} name="Save" className={"mt-2"} />
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
