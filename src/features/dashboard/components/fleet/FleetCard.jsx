import { Link } from "react-router-dom";
import { COUNTRIES_NAMES } from "../../../../utils/contants";
import { useSelector } from "react-redux";
import Badge from "./../../../../ui/Badge";
import locationIcon from "../../../../assets/images/icons/pin.svg";
import passengersIcon from "../../../../assets/images/icons/crowd.svg";
import captainIcon from "../../../../assets/images/icons/captain.svg";
import walletIcon from "../../../../assets/images/icons/wallet.svg";
import male from "../../../../assets/images/icons/male.svg";
import female from "../../../../assets/images/icons/female.svg";

export default function FleetCard({ fleet }) {
  const currency = useSelector((state) => state.user?.user?.currency);
  let badge;
  const getCountryName = (countryCode) => {
    return COUNTRIES_NAMES[countryCode] || countryCode;
  };
  switch (fleet?.status) {
    case "active":
      badge = <Badge state={1} content={"Available"} />;
      break;
    case "hidden":
      badge = <Badge state={0} content={"Hidden"} />;
      break;
    case "inactive":
      badge = <Badge state={2} content={"Inactive"} />;
      break;
    default:
      break;
  }
  return (
    <Link className="fleet-card" to={`/dashboard/fleet/${fleet?.id}`}>
      {badge}
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
          <img src={walletIcon} alt="location pin" />{" "}
          {fleet?.prices[0]?.price +
            " " +
            currency +
            " / " +
            fleet?.prices[0]?.period_type}
        </p>
      </div>
    </Link>
  );
}
