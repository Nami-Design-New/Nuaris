import { useEffect, useState } from "react";
import { checkIfDateOfBookingInSeason } from "../../../../../utils/helper";
import { s3Url } from "../../../../../utils/constants";
import { useSelector } from "react-redux";
import Badge from "./../../../../../ui/Badge";

const BoatCard = ({ handleBook, yacht, formData, bookedBoat }) => {
  let badge;

  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  const [price, setPrice] = useState({});

  useEffect(() => {
    const seasons = checkIfDateOfBookingInSeason(
      yacht?.season_prices,
      formData?.date_of_booking
    );

    if (seasons && seasons?.length > 0) {
      const prices = seasons?.flatMap((season) => season?.prices);
      setPrice(
        prices?.find(
          (price) => price?.period?.id === Number(formData?.period_id)
        )
      );
    } else {
      setPrice(
        yacht?.prices?.find(
          (price) => price?.period?.id === Number(formData?.period_id)
        )
      );
    }
  }, [yacht, formData]);

  switch (yacht?.state) {
    case "Active":
      badge = <Badge state={1} content={"Available"} position={"top-left"} />;
      break;
    case "Hidden":
      badge = <Badge state={0} content={"Hidden"} position={"top-left"} />;
      break;
    case "Inactive":
      badge = <Badge state={2} content={"Inactive"} position={"top-left"} />;
      break;
  }

  return (
    <div className="booking_card" disabled={bookedBoat}>
      <div className="img">
        {badge}
        <Badge
          state={0}
          content={`Capacity: ${yacht?.capacity}`}
          position={"top-right"}
        />
        <img
          src={
            s3Url +
              yacht?.media?.filter(
                (media) => media?.type === "IMAGE" && media?.is_active
              )?.[0]?.path || "/images/yacht1.jpeg"
          }
          alt="yacht"
        />
      </div>
      <div className="about_card">
        <h6 className="title">{yacht?.name_en}</h6>
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
          className={bookedBoat === yacht?.id ? "second" : "stroked"}
          onClick={handleBook}
          disabled={bookedBoat}
        >
          <span>{bookedBoat === yacht?.id ? "Booked" : "Book"}</span>
        </button>
      </div>
    </div>
  );
};

export default BoatCard;
