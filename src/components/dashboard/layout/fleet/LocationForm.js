import React, { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import { State } from "country-state-city";
import MapLocationField from "../../../ui/form-elements/MapLocationField";
import MapModal from "../../../ui/map-modal/MapModal";
import { toast } from "react-toastify";
import axios from "./../../../../util/axios";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const LocationForm = ({ setForm, yacht }) => {
  const createdYacht = sessionStorage.getItem("yacht_id");
  const [showModalVessel, setShowModalVessel] = useState(false);
  const [showModalMeeting, setShowModalMeeting] = useState(false);
  const [vesselLocation, setVesselLocation] = useState("Search on Map");
  const [meetingLocation, setMeetingLocation] = useState("Search on Map");
  const [cityForCountry, setCityForCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("SA");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    city: "select",
    country: "SA",
    location: {
      lat: 24.7136,
      lng: 46.6753
    },
    meeting_location: {
      lat: 24.7136,
      lng: 46.6753
    }
  });

  const fetchCitiesForCountry = (countryCode) => {
    const citiesArray = State.getStatesOfCountry(countryCode);
    const citiesNames = citiesArray.map((city) => city.name);
    setCities(citiesArray);
    setCityForCountry(citiesNames);
  };

  // Handle country selection
  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    setFormData({ ...formData, country: countryCode });
    fetchCitiesForCountry(countryCode);
  };

  // Handle city selection
  const handleSelectCity = (cityName) => {
    const selectedCity = cities.find((city) => city.name === cityName);
    if (selectedCity) {
      setFormData({
        ...formData,
        city: cityName
      });
    }
  };

  useEffect(() => {
    if (
      yacht?.city &&
      yacht?.country &&
      yacht?.location &&
      yacht?.meeting_location
    ) {
      setFormData({
        city: yacht?.city,
        country: yacht?.country,
        location: yacht?.location,
        meeting_location: yacht?.meeting_location
      });
    }
    setSelectedCountry(yacht?.country);
    fetchCitiesForCountry(yacht?.country);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yacht]);

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Crew");
  };
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url = yacht?.id
        ? `/yachts/${yacht?.id}/`
        : `/yachts/${createdYacht}/`;
      const response = await axios.patch(url, formData);
      if (response.status === 200) {
        yacht
          ? toast.success("Location Updated Successfully")
          : toast.success("Location Saved Successfully");
        setForm("Crew");
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
          <h6 className="form_title">Location</h6>
        </div>
        {/* Country */}
        <div className="col-12 p-2">
          <div className="input-field">
            <label htmlFor="companyLocation">
              Vessel Location <span>(Country)</span>
            </label>
            <ReactFlagsSelect
              searchable={true}
              selectedSize={false}
              selected={selectedCountry}
              onSelect={(code) => handleSelectCountry(code)}
            />
          </div>
        </div>
        {/* City */}
        <div className="col-12 p-2">
          <div className="input-field">
            <label htmlFor="city">
              Vessel Location <span>(City)</span>
            </label>
            <select
              name="city"
              id="city"
              value={formData.city}
              onChange={(e) => handleSelectCity(e.target.value)}
            >
              <option disabled value="select">
                select
              </option>
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
        {/* marina */}
        <div className="col-12 p-2">
          <CustomInputField
            label="Vessel Location"
            hint="( Marina )"
            id="marina"
            name="marina"
            placeholder="write marina name"
          />
        </div>
        {/* vessel location lat & lng */}
        <div className="col-12 p-2">
          <MapLocationField
            htmlFor="vesselLocationOnMap"
            label="Vessel Location"
            hint="(map)"
            name={vesselLocation}
            setShowModal={setShowModalVessel}
          />
        </div>
        {/* meeting location lat & lng */}
        <div className="col-12 p-2">
          <MapLocationField
            htmlFor="meetingLocation"
            label="Meeting Location"
            name={meetingLocation}
            setShowModal={setShowModalMeeting}
          />
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3 ">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            name="Save"
            loading={loading}
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      {/* map modal vessel location */}
      <MapModal
        showModal={showModalVessel}
        setShowModal={setShowModalVessel}
        setFormData={setFormData}
        formData={formData}
        target="location"
        title="Vessel Location"
        showLocationFirst={yacht ? true : false}
        setSerchedPlace={setVesselLocation}
      />
      {/* map modal meeting location */}
      <MapModal
        showModal={showModalMeeting}
        setShowModal={setShowModalMeeting}
        setFormData={setFormData}
        formData={formData}
        target="meeting_location"
        title="Meeting Location"
        showLocationFirst={yacht ? true : false}
        setSerchedPlace={setMeetingLocation}
      />
    </form>
  );
};

export default LocationForm;
