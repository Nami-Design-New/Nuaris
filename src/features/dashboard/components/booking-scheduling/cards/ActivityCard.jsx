import { useEffect, useState } from "react";
import { checkIfDateOfBookingInSeason } from "../../../../../utils/helper";
import { s3Url } from "../../../../../utils/constants";
import { useSelector } from "react-redux";
import Badge from "../../../../../ui/Badge";

const ActivityCard = ({ handleBook, activity, formData, bookedActivities }) => {
  let badge;

  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  const [price, setPrice] = useState({});
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const periodId = formData?.period_id;

    const seasons = checkIfDateOfBookingInSeason(
      activity?.season_prices,
      FormData?.date_of_booking
    );

    if (seasons && seasons?.length > 0) {
      const prices = seasons?.flatMap((season) => season?.prices);
      setPrice(prices?.find((price) => price?.period?.id === Number(periodId)));
    } else {
      setPrice(
        activity?.prices?.find(
          (price) => price?.period?.id === Number(periodId)
        )
      );
    }
  }, [activity, formData]);

  useEffect(() => {
    setIsBooked(
      bookedActivities?.find((ac) => ac?.activity?.id === activity?.id) || false
    );
  }, [activity?.id, bookedActivities]);

  switch (activity?.state) {
    case "active":
      badge = <Badge state={1} content={"Available"} position={"top-left"} />;
      break;
    case "inactive":
      badge = <Badge state={2} content={"Inactive"} position={"top-left"} />;
      break;
  }

  return (
    <div className="booking_card">
      <div className="img">
        {badge}
        <Badge
          state={0}
          content={`Capacity: ${activity?.capacity}`}
          position={"top-right"}
        />
        <img
          src={
            s3Url +
              activity?.media?.filter(
                (media) => media?.type === "IMAGE" && media?.is_active
              )?.[0]?.path || "/images/yacht1.jpeg"
          }
          alt="activity"
        />
      </div>
      <div className="about_card">
        <h6 className="title">{activity?.name}</h6>
        <div className="price">
          <img src="/images/icons/wallet.svg" alt="wallet" />
          <p>
            <span className="value">
              {Number(price?.price)} {currency}
            </span>{" "}
            <span>/ {price?.period?.name}</span>
          </p>
        </div>
        <button
          className={isBooked ? "second" : "stroked"}
          onClick={handleBook}
          disabled={isBooked}
        >
          <span>{isBooked ? "Booked" : "Book"}</span>
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
