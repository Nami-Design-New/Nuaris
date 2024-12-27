import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { s3Url } from "./../../../../../utils/constants";
import Badge from ".././../../../../ui/Badge";
import useGetDirections from "../../../../../hooks/location-destination/useGetDirections";

export default function FleetCard({ fleet }) {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  const [crewGender, setCrewGender] = useState(null);
  const { data: loacations } = useGetDirections("Location");
  let badge;

  switch (fleet?.state) {
    case "Active":
      badge = <Badge state={1} content={"Available"} />;
      break;
    case "Hidden":
      badge = <Badge state={0} content={"Hidden"} />;
      break;
    case "Inactive":
      badge = <Badge state={2} content={"Inactive"} />;
      break;
  }

  useEffect(() => {
    if (fleet?.crews?.length > 0) {
      const genders = fleet.crews.map((crew) => crew.gender);
      if (genders.includes("male") && genders.includes("female")) {
        setCrewGender("all");
      } else if (genders.includes("male")) {
        setCrewGender("male");
      } else if (genders.includes("female")) {
        setCrewGender("female");
      }
    }
  }, [fleet?.crews]);

  return (
    <Link className="fleet-card" to={`/dashboard/fleet/${fleet?.id}`}>
      {badge}
      <div className="image-container">
        <img
          loading="lazy"
          className="fleet_image"
          src={
            s3Url +
              fleet?.media?.filter(
                (media) => media?.type === "IMAGE" && media?.is_active
              )?.[0]?.path || "/images/yacht1.jpeg"
          }
          alt="fleet"
        />
      </div>
      <div className="card-content">
        <h3>{fleet?.name_en}</h3>
        <p className="card-location">
          <img src="/images/icons/pin.svg" alt="location pin" />{" "}
          {
            loacations?.data?.find(
              (location) => location?.id === fleet?.fleet_location_id
            )?.name
          }
        </p>
        <p className="card-location">
          <img src="/images/icons/crowd.svg" alt="passengers" />{" "}
          {fleet?.capacity}
        </p>
        <div className="d-flex justify-content-between">
          <p className="card-location">
            <img src="/images/icons/captain.svg" alt="captain" /> Crew (
            {fleet?.crews?.length})
          </p>
          <div className="crew_gender">
            {crewGender === "all" ? (
              <>
                <img src="/images/icons/male.svg" alt="male" />
                <img src="/images/icons/female.svg" alt="female" />
              </>
            ) : crewGender === "male" ? (
              <img src="/images/icons/male.svg" alt="male" />
            ) : (
              <img src="/images/icons/female.svg" alt="female" />
            )}
          </div>
        </div>
        <p className="card-location">
          <img src="/images/icons/wallet.svg" alt="wallet" />{" "}
          {`${Number(fleet?.prices[0]?.price) || ""} ${currency} / ${
            fleet?.prices[0]?.period?.name || ""
          }`}
        </p>
      </div>
    </Link>
  );
}
