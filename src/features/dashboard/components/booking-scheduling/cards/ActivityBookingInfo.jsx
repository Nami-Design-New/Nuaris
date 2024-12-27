import { useSelector } from "react-redux";

export default function ActivityBookingInfo({ booking, priceData }) {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";

  return (
    <div className="strocked_wrapper">
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="title">Booking info</h6>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="list_info">
            <p>Name: </p>
            <h6>{booking?.reservation?.name}</h6>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="list_info">
            <p>Mobile Number: </p>
            <h6>{booking?.reservation?.phone_number}</h6>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="list_info">
            <p>Email Address: </p>
            <h6>{booking?.reservation?.email}</h6>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="list_info">
            <p>Date of Booking: </p>
            <h6>{booking?.date_of_booking}</h6>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="list_info">
            <p>Location: </p>
            <h6>{booking?.reservation?.location}</h6>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="list_info">
            <p>Total Price Before Vat: </p>
            <h6>
              {Number(priceData?.total_sum_before_vat)} {currency}
            </h6>
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="list_info">
            <p>Vat: </p>
            <h6>
              {Number(priceData?.vat_value)} {currency}
            </h6>
          </div>
        </div>
        {booking?.reservation?.notes && (
          <div className="col-12 p-2">
            <div className="list_info">
              <p>Client Notes: </p>
              <h6>{booking?.reservation?.notes}</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
