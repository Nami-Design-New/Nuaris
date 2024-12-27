import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetBookingsStats from "../../../../hooks/dashboard/useGetBookingsStats";

function BookingsStats() {
  const { data: bookingsStats } = useGetBookingsStats();
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";

  return (
    <div className="bg_white_card p-3 pt-4">
      <div className="m-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="form_title">Bookings</h6>
          <select className="styled_select">
            <option>Today</option>
            <option>Tomorrow</option>
            <option>Yesterday</option>
          </select>
        </div>
      </div>
      <div className="bookings-stats-content">
        <div className="bookings-stats-specific">
          <div className="bookings-stats-specific-boxes">
            <div className="bg-light-gray bookings-stats-box">
              <h5>{bookingsStats?.cash_bookings_count || 0}</h5>
              <p>Cash Bookings</p>
            </div>
            <div className="bg-light-gray bookings-stats-box">
              <h5>0</h5>
              <p>Agents Bookings</p>
            </div>
            <div className="bg-light-gray bookings-stats-box">
              <h5>{bookingsStats?.card_bookings_count || 0}</h5>
              <p>Card Booking</p>
            </div>
            <div className="bg-light-gray bookings-stats-box">
              <h5>0</h5>
              <p>Nuaris Partners</p>
            </div>
          </div>
          <div className="bg-light-gray bookings-stats-complaints-box">
            <div className="box-header">
              <p>Complaints</p>
              <Link href="" className="share-icon-box">
                <img
                  src="/images/icons/share-icon.svg"
                  alt="share complaints"
                />
              </Link>
            </div>
            <div className="box-content">
              <h5>0</h5>
              <p>3 Have been solved</p>
            </div>
            <button className="complaints-button">
              user-submitted complaints
            </button>
          </div>
        </div>
        <div className="bookings-stats-total">
          <div className="bg-gray bookings-stats-total-box">
            <p>Bookings</p>
            <h5>{bookingsStats?.total_bookings_count || 0}</h5>
          </div>
          <div className="bg-gray bookings-stats-total-box">
            <p>Revenue</p>
            <h5>
              {bookingsStats?.total_revenue || 0} {currency}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingsStats;
