export const ROLES = {
  ADMIN: "admin",
  HOST: "host",
  AGENT: "agent",
  EMPLOYEE: "employee",
  USER_SUPPORT: "user_support",
  SERVICE_PROVIDER: "service_provider",
};
export const BRANDS = [
  "Sea Ray",
  "Century",
  "Regal",
  "Chaparral",
  "Pro-Line",
  "Hurricane",
  "Baja",
  "Everglades",
  "Fountain",
  "NauticStar",
  "Yamaha Boats",
  "Tahoe",
  "Monterey",
  "Sea Fox",
  "Novurania",
  "Robalo",
  "Custom",
  "Carolina Classic",
  "Jupiter",
  "Trojan",
  "Azimut",
  "St. Francis",
  "Luhrs",
  "Patti Shipyard",
  "Regal",
  "Cheoy Lee",
  "Guy Couach",
  "Absolute",
  "Pronautica",
  "Lowland",
  "Southport",
  "Glacier Bay",
  "Leopard",
  "Island Hopper",
  "Mag Bay",
  "Local Manufacturers",
  "Other",
];
export const FUEL = ["Diesel", "Gasoline", "Electric", "Other"];
export const TYPE = ["motor", "sailing", "catamaran"];

// early years
const currentYear = new Date().getFullYear();
const startYear = 1980;
export const YRARS = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => currentYear - i
);

//days
export const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

// add ons categories
export const ADD_ONS_CATEGORIES = [
  "Food & Beverages",
  "Party Themes",
  "Expert Assistant",
  "Other",
];
