import { useEffect, useState } from "react";
import useGetBookings from "../../../../../hooks/dashboard/useGetBookings";
import FullCalender from "../../../../../ui/FullCalender";

const SchedulingCalender = () => {
  const { data: bookings } = useGetBookings();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (bookings) {
      setEvents(
        bookings?.data?.map((booking) => ({
          title: `#${booking?.id} - ${booking?.booking_reservation?.name}`,
          start: booking?.date_of_booking,
          end: booking?.date_of_booking,
        }))
      );
    }
  }, [bookings]);

  return (
    <div className="bg_white_card">
      <div className="m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Scheduling</h6>
        </div>
        <div className="col-12 p-2">
          <FullCalender events={events} />
        </div>
      </div>
    </div>
  );
};

export default SchedulingCalender;
