import fleetIcon from "../../../../assets/images/Fleet.svg";
import crowdIcon from "../../../../assets/images/crowd.svg";
import FleetInfoMiniCard from "./FleetInfoMiniCard";
import walledIcon from "../../../../assets/images/wallet.svg";
import captainIcon from "../../../../assets/images/captain.svg";
import StarsRate from "../../../ui/StarsRate";
import hashIcon from "../../../../assets/images/hash.svg";
import RateModal from "../RateModal";
import { useState } from "react";

export default function FleetProfileInfo({ fleet }) {
  const [isOpen, setIsOpen] = useState(false);
  const getCrewGenders = () => {
    const genders = fleet?.crews?.map((crew) => crew?.gender);
    const allMale = genders?.every((gender) => gender.toLowerCase() === "male");
    const allFemale = genders?.every(
      (gender) => gender.toLowerCase() === "female"
    );
    if (allMale) {
      return "male";
    } else if (allFemale) {
      return "female";
    } else {
      return "both";
    }
  };

  return (
    <div className="col-12 p-2">
      <div className="fleet-part">
        <div className="fleet-info-row">
          <div className="d-flex align-items-center justify-content-between">
            <button onClick={() => setIsOpen(true)}>
              <StarsRate rate={"4.2"} reviewsCount={"25"} />
            </button>
            <div className="fleet_tag">
              <img src={hashIcon} alt="hash" /> <p>{"564231"}</p>
            </div>
          </div>
          <RateModal isOpen={isOpen} setIsOpen={setIsOpen} />
          <h2 className="text-capitalize">{fleet?.name_en}</h2>
          <div className="fleet_details">
            <FleetInfoMiniCard
              icon={fleetIcon}
              title="Boat Type"
              text={fleet?.type}
            />
            <FleetInfoMiniCard
              icon={crowdIcon}
              title="Capacity"
              text={fleet?.capacity}
            />
            <FleetInfoMiniCard
              icon={walledIcon}
              title="Price"
              text={"100$"}
              per={"hour"}
            />
            <FleetInfoMiniCard
              icon={captainIcon}
              title="Crew"
              text={fleet?.crews?.length}
              crewGenders={getCrewGenders()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
