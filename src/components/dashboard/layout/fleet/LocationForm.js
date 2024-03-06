import React, { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import { State } from "country-state-city";
import MapLocationField from "../../../ui/form-elements/MapLocationField";
import MapModal from "../../../ui/map-modal/MapModal";

const LocationForm = ({ setForm }) => {
  const [showModalVessel, setShowModalVessel] = useState(false);
  const [showModalMeeting, setShowModalMeeting] = useState(false);
  const [vesselLocation, setVesselLocation] = useState("Search on Map");
  const [meetingLocation, setMeetingLocation] = useState("Search on Map");

  const [formData, setFormData] = useState({});
  const [cities, setCities] = useState([]);
  const [cityForCountry, setCityForCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("SA");

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
  const handleNext = (e) => {
    e.preventDefault();
    setForm("Crew");
  };
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };

  return (
    <div className="form-ui">
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
          <button className="save_btn ms-auto">Save</button>
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
        title="Vessel Location"
        setSerchedPlace={setVesselLocation}
      />
      {/* map modal meeting location */}
      <MapModal
        showModal={showModalMeeting}
        setShowModal={setShowModalMeeting}
        setFormData={setFormData}
        formData={formData}
        title="Meeting Location"
        setSerchedPlace={setMeetingLocation}
      />
    </div>
  );
};

export default LocationForm;
