import React, { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import { State } from "country-state-city";

const LocationForm = ({ formData, setFormData, setForm }) => {
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
        lat: selectedCity.latitude,
        lng: selectedCity.longitude,
      });
    }
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
      </div>
    </div>
  );
};

export default LocationForm;
