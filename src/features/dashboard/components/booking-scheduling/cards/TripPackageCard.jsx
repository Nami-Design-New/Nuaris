import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { timeDifferenceInHours } from "../../../../../utils/helper";
import Badge from "../../../../../ui/Badge";
import { s3Url } from "../../../../../utils/constants";

const TripPackageCard = ({ handleBook, tripPackage, bookingDay }) => {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  const [period, setPeriod] = useState();

  let badge;

  switch (tripPackage?.state) {
    case "active":
      badge = <Badge state={1} content={"Available"} position={"top-left"} />;
      break;
    case "inactive":
      badge = <Badge state={2} content={"Inactive"} position={"top-left"} />;
      break;
  }

  useEffect(() => {
    const period = tripPackage?.trip_package_days?.find(
      (day) => day?.day === bookingDay
    )?.trip_package_day_periods?.[0];

    setPeriod(period);
  }, [bookingDay, tripPackage?.trip_package_days]);

  return (
    <div className="booking_card">
      <div className="img">
        {badge}
        <Badge
          state={0}
          content={`Capacity: ${tripPackage?.capacity}`}
          position={"top-right"}
        />
        <img
          src={
            s3Url +
              tripPackage?.media?.filter(
                (media) => media?.type === "IMAGE" && media?.is_active
              )?.[0]?.path || "/images/yacht1.jpeg"
          }
          alt="package"
        />
      </div>
      <div className="about_card">
        <h6 className="title">{tripPackage?.name}</h6>
        <div className="price">
          <img src="/images/icons/wallet.svg" alt="wallet" />
          <p>
            <span className="value">
              {Number(period?.price)} {currency}
            </span>
            <span> / {period?.period?.name}</span>
          </p>
        </div>
        <div className="duration">
          <p>Duration: </p>
          {period?.start_time && period?.end_time ? (
            <b>{timeDifferenceInHours(period.start_time, period.end_time)}</b>
          ) : (
            <b>N/A</b>
          )}
        </div>
        <button className="stroked" onClick={handleBook}>
          <span>Book</span>
        </button>
      </div>
    </div>
  );
};

export default TripPackageCard;
