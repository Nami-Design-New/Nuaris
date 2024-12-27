import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useGetDirections from "../../../../hooks/location-destination/useGetDirections";
import StarsRate from "../../../../ui/StarsRate";
import { s3Url } from "../../../../utils/constants";

export default function FleetCard({ fleet }) {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  const [crewGender, setCrewGender] = useState(null);
  const { data: loacations } = useGetDirections("Location");

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
    <Link
      className="fleet-card"
      to={`/fleet/${fleet?.id || 1}`}
      data-aos="fade-up"
    >
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
        <h3>{fleet?.name_en || "Jurassic Park"}</h3>
        <StarsRate rate={fleet?.overall_rate || 5} />

        <p className="card-location">
          <img src="/images/icons/pin.svg" alt="location pin" />{" "}
          {loacations?.data?.find(
            (location) => location?.id === fleet?.fleet_location_id
          )?.name || "Dubai, United Arab Emirates"}
        </p>

        <p className="card-location">
          <img src="/images/icons/crowd.svg" alt="passengers" />{" "}
          {fleet?.capacity || 56}
        </p>

        <div className="d-flex justify-content-between">
          <p className="card-location">
            <img src="/images/icons/captain.svg" alt="captain" /> Crew (
            {fleet?.crews?.length || 4})
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
          {`${Number(fleet?.prices[0]?.price) || 230} ${currency} / ${
            fleet?.prices[0]?.period?.name || "2 hours"
          }`}
        </p>
      </div>
    </Link>
  );
}
