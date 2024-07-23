import { City } from "country-state-city";

export const handleChange = (e, setFormData) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const handlePhoneChange = (value, name, setFormData) => {
  setFormData((prev) => ({ ...prev, [name]: value }));
};

export const filterEmptyKeys = (data) => {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ""));
};

// country state city helpers
export const handleSelectCountry = (countryCode, setFormData) => {
  setFormData((prev) => ({
    ...prev,
    country: countryCode
  }));
};

export const fetchCitiesForCountry = (
  countryCode,
  setCityList,
  setCityNameList
) => {
  const citiesArray = City.getCitiesOfCountry(countryCode);
  const uniqueCities = citiesArray.reduce((acc, city) => {
    if (!acc.some((existingCity) => existingCity.name === city.name)) {
      acc.push(city);
    }
    return acc;
  }, []);
  const citiesNames = uniqueCities?.map((city) => city.name);
  setCityList(uniqueCities);
  setCityNameList(citiesNames);
};

export const handleSelectCity = (
  cityName,
  setSearchedPlace,
  setFormData,
  cityList
) => {
  if (typeof setSearchedPlace === "function") setSearchedPlace(cityName);
  const selectedCity = cityList?.find((city) => city.name === cityName);
  if (selectedCity) {
    setFormData((prev) => ({
      ...prev,
      city: cityName,
      lat: Number(selectedCity.latitude).toFixed(6),
      lng: Number(selectedCity.longitude).toFixed(6)
    }));
  }
};

// string helpers
export function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1);
}
