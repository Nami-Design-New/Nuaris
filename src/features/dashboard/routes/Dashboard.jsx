import Bookings from "../components/booking-scheduling/Bookings";
import SchedulingCalender from "../components/booking-scheduling/cards/SchedulingCalender";
import Announcements from "../components/home/Announcements";
import BookingsStats from "../components/home/BookingsStats";
import DashboardStats from "../components/home/DashboardStats";
import SupplyDemand from "../components/home/SupplyDemand";
import Weather from "../components/home/Weather";

export default function Dashboard() {
  return (
    <section className="homePage">
      <div className="row">
        <div className="col-lg-8 co-12 p-2 d-flex">
          <Announcements />
        </div>
        <div className="col-lg-4 col-12 p-2">
          <Weather />
        </div>
        <div className="col-12 p-2">
          <SchedulingCalender />
        </div>
        <div className="col-12 p-2">
          <BookingsStats />
        </div>
        <div className="col-12 p-2">
          <SupplyDemand />
        </div>
        <div className="col-12 p-2">
          <DashboardStats />
        </div>
        <div className="col-12 p-2">
          <Bookings />
        </div>
      </div>
    </section>
  );
}
