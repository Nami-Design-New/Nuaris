import {
  filterEmptyKeys,
  formatNumber,
  handleChange,
  handleFileUpload,
  handlePhoneChange,
  handleRemoveMedia,
  stripSpaces,
} from "../../../../utils/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MediaUploadField from "../../../../ui/form-elements/MediaUploadField";
import InputField from "../../../../ui/form-elements/InputField";
import PhoneField from "../../../../ui/form-elements/PhoneField";
import SelectField from "../../../../ui/form-elements/SelectField";
import TextField from "../../../../ui/form-elements/TextField";
import MapLocationField from "../../../../ui/form-elements/MapLocationField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import MapModal from "../../../../ui/modals/MapModal";
import axiosInstance from "../../../../utils/axiosInstance";
import useGetCountries from "../../../../hooks/app/useGetCountries";
import useGetOrganizationInfo from "../../../../hooks/user/useGetOrganizationInfo";
import { s3Url } from "../../../../utils/constants";

const ProfileInfoForm = () => {
  const [loading, setLoading] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState("search on map");
  const [showMapModal, setShowMapModal] = useState(false);
  const [formData, setFormData] = useState({});
  const { data: countries } = useGetCountries();
  const { data: organization } = useGetOrganizationInfo();

  const handleSelectCity = (city) => {
    const cities = countries.find(
      (c) => c.name === formData.company_country
    )?.cities;

    const selected = cities?.find((c) => c.name === city);

    setFormData((prev) => ({
      ...prev,
      company_city: city,
      company_location: {
        lat: Number(selected.lat).toFixed(6),
        lng: Number(selected.lng).toFixed(6),
        address: selected.name,
      },
    }));
  };

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        first_name: organization?.first_name || "",
        family_name: organization?.family_name || "",
        logo: organization?.logo || null,
        company_email: organization?.company_email || "",
        company_mobile: organization?.company_mobile || "",
        commercial_name: organization?.commercial_name || "",
        company_country: organization?.company_country || "",
        company_city: organization?.company_city || "",
        commercial_registration_number:
          organization?.commercial_registration_number || "",
        currency: organization?.currency || "",
        company_location: organization?.company_location || {},
        licence_number: organization?.licence_number || "",
        company_description: organization?.company_description || "",
      };
    });
    setSearchedPlace(
      organization?.company_location?.address || "search on map"
    );
  }, [organization]);

  useEffect(() => {
    if (searchedPlace !== "search on map") {
      const companyLocation = formData.company_location || {};
      companyLocation.address = searchedPlace;
      setFormData((prev) => ({
        ...prev,
        company_location: companyLocation,
      }));
    }
  }, [formData.company_location, searchedPlace, setFormData]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const filteredData = filterEmptyKeys(formData);
      const res = await axiosInstance.put(
        "/organization/update_organization_info",
        filteredData
      );
      if (res) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg_white_card">
      <form className="form_ui" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 p-2">
            <h6 className="form_title">Profile Info</h6>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <MediaUploadField
              label="Upload Your Logo"
              hint="(PNG or JPG)"
              labelIdle="LOGO"
              allowMultiple={false}
              companyLogo={true}
              pannelRatio={0.335}
              accept={["image/png", "image/jpeg"]}
              files={formData.logo ? [s3Url + formData.logo] : null}
              handleFileUpload={(file) =>
                handleFileUpload(organization?.id, "LOGO", file)
              }
              handleRemoveMedia={handleRemoveMedia}
              itemId={organization?.id}
              itemType="LOGO"
            />
          </div>
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
              id="family_name"
              name="family_name"
              value={formData.family_name}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              label="Email Address"
              placeholder="EX: mail@mail.com"
              required
              type="email"
              id="company_email"
              name="company_email"
              value={formData.company_email}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <PhoneField
              label="Mobile Number"
              placeholder="Enter phone number"
              required
              id="company_mobile"
              name="company_mobile"
              value={formData.company_mobile}
              onChange={(e) =>
                handlePhoneChange(e, "company_mobile", setFormData)
              }
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
            <InputField
              label={
                organization?.registration_type === "company"
                  ? "Registration Number"
                  : "License Number"
              }
              name={
                organization?.registration_type === "company"
                  ? "commercial_registration_number"
                  : "licence_number"
              }
              id={
                organization?.registration_type === "company"
                  ? "commercial_registration_number"
                  : "licence_number"
              }
              type="text"
              pattern="\d{4} \d{4} \d{4} \d{4}"
              placeholder="XXXX XXXX XXXX XXXX"
              value={
                organization && organization?.registration_type === "company"
                  ? formatNumber(formData?.commercial_registration_number || "")
                  : formatNumber(formData?.licence_number || "")
              }
              onChange={handleNumberChange}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <SelectField
              label="Company Location"
              hint={"( Country )"}
              required
              id="country"
              name="country"
              value={formData.company_country}
              options={countries?.map((country) => ({
                name: country?.name,
                value: country?.name,
              }))}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  company_country: e.target.value,
                  company_city: "",
                });
              }}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <SelectField
              label="City"
              required
              name="company_city"
              id="company_city"
              value={formData.company_city}
              options={countries
                ?.find((c) => c?.name === formData?.company_country)
                ?.cities?.map((city) => ({
                  name: city?.name,
                  value: city?.name,
                }))}
              onChange={(e) => handleSelectCity(e.target.value)}
            />
          </div>
          <div className="col-12 p-2">
            <SelectField
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
                { value: "EUR", name: "EUR" },
              ]}
            />
          </div>
          <div className="col-12 p-2">
            <MapLocationField
              htmlFor="companyLocationOnMap"
              label="Company Location"
              hint="(on map)"
              name={searchedPlace}
              setShowModal={setShowMapModal}
            />
          </div>
          <div className="col-12 p-2">
            <TextField
              label={"Something about your Company"}
              value={formData.company_description}
              id={"company_description"}
              name={"company_description"}
              placeholder={"Write Here"}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <MapModal
            formData={formData}
            setFormData={setFormData}
            title="Company Location"
            target={"company_location"}
            showModal={showMapModal}
            setShowModal={setShowMapModal}
            setSearchedPlace={setSearchedPlace}
          />
        </div>
        <div className="col-12 p-2">
          <SubmitButton loading={loading} name="Save" className={"mt-3"} />
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
