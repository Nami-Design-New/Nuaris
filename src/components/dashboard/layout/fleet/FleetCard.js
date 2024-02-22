import { Link } from "react-router-dom";
import locationIcon from "../../../../assets/images/pin.svg";
import passengersIcon from "../../../../assets/images/crowd.svg";
import captainIcon from "../../../../assets/images/captain.svg";
import Badge from "../../../ui/Badge";
import fleetImage from "../../../../assets/images/fleet.png";
import male from "../../../../assets/images/male.svg";
import female from "../../../../assets/images/female.svg";

export default function FleetCard({ fleet }) {
  return (
    <Link className="fleet-card" to={fleet?.id || ""}>
      <Badge state={1} content={fleet?.state || "available"} />
      <div className="image-container">
        <img
          loading="lazy"
          className="fleet_image"
          src={fleetImage}
          alt="flee"
        />
      </div>
      <div className="card-content">
        <h3>
          {fleet?.fleetName || "Santa Maria"}
        </h3>
        <p className="card-location">
          <img src={locationIcon} alt="location pin" />{" "}
          {fleet?.location || "Riyadh, Saudi Arabia"}
        </p>
        <p className="card-location">
          <img src={passengersIcon} alt="location pin" />{" "}
          {fleet?.maxPassengers || "25"}
        </p>
        <div className="d-flex justify-content-between">
          <p className="card-location">
            <img src={captainIcon} alt="location pin" /> Crew ({" "}
            {fleet?.crewSize || "8"} )
          </p>
          <div className="crew_gender">
            <img src={male} alt="male" />
            <img src={female} alt="female" />
          </div>
        </div>
        <p className="card-location">
          <img src={locationIcon} alt="location pin" /> {fleet?.price || "100"}$
          {(fleet?.pricePer &&
            <span>
              / {fleet?.pricePer}
            </span>) ||
            <span>/ hour</span>}
        </p>
      </div>
    </Link>
  );
}
