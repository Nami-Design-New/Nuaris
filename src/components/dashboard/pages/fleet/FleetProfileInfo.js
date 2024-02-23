import fleetIcon from "../../../../assets/images/Fleet.svg";
import crowdIcon from "../../../../assets/images/crowd.svg";
import FleetInfoMiniCard from "./FleetInfoMiniCard";
import walledIcon from "../../../../assets/images/wallet.svg";
import captainIcon from "../../../../assets/images/captain.svg";
import StarsRate from "../../../ui/StarsRate";
import hashIcon from "../../../../assets/images/hash.svg";

export default function FleetProfileInfo({ fleet }) {
  return (
    <>
      <div className="row container mx-auto">
        <div className="fleet-page-second-row">
          <div className="d-flex align-items-center justify-content-between">
            <StarsRate />
            <div className="fleet_tag">
              <img src={hashIcon} alt="hash" /> <p>{fleet?.tag || "564231"}</p>
            </div>
          </div>

          <h2 className="text-capitalize">{fleet?.name || "titanic"}</h2>

          <div className="row">
            <FleetInfoMiniCard
              icon={fleetIcon}
              title="boat type"
              text={fleet?.type || "yacht"}
            />
            <FleetInfoMiniCard
              icon={crowdIcon}
              title="capacity"
              text={fleet?.capacity || "25"}
            />
            <FleetInfoMiniCard
              icon={walledIcon}
              title="price"
              text={fleet?.price || "100$"}
              per={"hour"}
            />
            <FleetInfoMiniCard
              icon={captainIcon}
              title="crew size"
              text={fleet?.type || "3"}
              crewGenders={fleet?.crewGenders || ["male"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
