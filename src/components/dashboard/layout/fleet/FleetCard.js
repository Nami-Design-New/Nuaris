import { Link } from "react-router-dom";
import locationIcon from "../../../../assets/images/pin.svg";
import passengersIcon from "../../../../assets/images/crowd.svg";
import captainIcon from "../../../../assets/images/captain.svg";
import Badge from "../../../ui/Badge";
import male from "../../../../assets/images/male.svg";
import female from "../../../../assets/images/female.svg";
import { COUNTRIES_NAMES } from "../../../../constants";

export default function FleetCard({ fleet }) {
  const getCountryName = (countryCode) => {
    return COUNTRIES_NAMES[countryCode] || countryCode;
  };
  return (
    <Link className="fleet-card" to={`/dashboard/fleet/${fleet?.id}`}>
      <Badge state={1} content={"available"} />
      <div className="image-container">
        <img
          loading="lazy"
          className="fleet_image"
          src={fleet?.images[0]}
          alt="fleet"
        />
      </div>
      <div className="card-content">
        <h3>{fleet?.name_en}</h3>
        <p className="card-location">
          <img src={locationIcon} alt="location pin" />{" "}
          {`${fleet?.city}, ${getCountryName(fleet?.country)}`}
        </p>
        <p className="card-location">
          <img src={passengersIcon} alt="location pin" /> {fleet?.capacity}
        </p>
        <div className="d-flex justify-content-between">
          <p className="card-location">
            <img src={captainIcon} alt="location pin" /> Crew (
            {fleet?.crews?.length} )
          </p>
          <div className="crew_gender">
            <img src={male} alt="male" />
            <img src={female} alt="female" />
          </div>
        </div>
        <p className="card-location">
          <img src={locationIcon} alt="location pin" />{" "}
          {fleet?.prices[0]?.price + " / " + fleet?.prices[0]?.period_type}
        </p>
      </div>
    </Link>
  );
}
