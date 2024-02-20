import { Link } from "react-router-dom";
import locationIcon from "../../../../assets/images/Clients.svg";
import passengersIcon from "../../../../assets/images/TripPackages.svg";
import captainIcon from "../../../../assets/images/manageAccount.svg";
import Badge from "../../../ui/Badge";

export default function FleetCard({ fleet }) {
  return (
    <article className="fleet-card">
      <Badge state={1} content={fleet?.state || "available"} />

      <Link to={""} className="image-container">
        <img src="/images/fleet.png" alt="flee" />
      </Link>

      <div className="card-content">
        <h3>{fleet?.fleetName || "Santa Maria"}</h3>
        <p className="card-location">
          <img src={locationIcon} alt="location pin" />{" "}
          {fleet?.location || "Riyadh, Saudi Arabia"}
        </p>
        <p className="card-location">
          <img src={passengersIcon} alt="location pin" />{" "}
          {fleet?.maxPassengers || "25"}
        </p>
        <p className="card-location">
          <img src={captainIcon} alt="location pin" /> Crew ({" "}
          {fleet?.crewSize || "8"} )
        </p>
        <p className="card-location">
          <img src={locationIcon} alt="location pin" /> {fleet?.price || "100"}$
          {(fleet?.pricePer && <span>/ {fleet?.pricePer}</span>) || (
            <span>/ hour</span>
          )}
        </p>
      </div>
    </article>
  );
}
