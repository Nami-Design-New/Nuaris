import { useState } from "react";
import { useSelector } from "react-redux";
import FleetInfoMiniCard from "./FleetInfoMiniCard";
import StarsRate from "./../../../../../ui/StarsRate";
import RateModal from "../../../../../ui/modals/RateModal";
import BookModal from "../../../../website/components/Fleet/BookModal";

export default function FleetProfileInfo({ fleet, showRequest = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";

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
            <div>
              <h2 className="text-capitalize m-0">
                {fleet?.name_en || "Titanic"}
              </h2>{" "}
              <button onClick={() => setIsOpen(true)}>
                <StarsRate rate={"4.2"} reviewsCount={"25"} />
              </button>
            </div>
            {showRequest && (
              <button
                onClick={() => setShowBookModal(true)}
                className="log fit"
              >
                Request a Quote
              </button>
            )}
          </div>
          <RateModal isOpen={isOpen} setIsOpen={setIsOpen} />

          <div className="fleet_details">
            <FleetInfoMiniCard
              icon="/images/icons/Fleet.svg"
              title="Boat Type"
              text={fleet?.type}
            />
            <FleetInfoMiniCard
              icon="/images/icons/crowd.svg"
              title="Capacity"
              text={fleet?.capacity}
            />
            <FleetInfoMiniCard
              icon="/images/icons/wallet.svg"
              title="Price"
              text={
                fleet?.prices?.length > 0
                  ? fleet.prices[0].price + " " + currency
                  : ""
              }
              per={fleet?.prices?.length > 0 ? fleet.prices[0].period_type : ""}
            />
            <FleetInfoMiniCard
              icon="/images/icons/captain.svg"
              title="Crew"
              text={fleet?.crews?.length}
              crewGenders={getCrewGenders()}
            />
          </div>
          <BookModal show={showBookModal} setShow={setShowBookModal} />
        </div>
      </div>
    </div>
  );
}
