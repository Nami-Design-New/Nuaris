import { Link } from "react-router-dom";
import PageHeader from "./../layout/PageHeader";
import SchedulingCalender from "../layout/SchedulingCalender";


const Scheduling = () => {
  return (
    <div>
      <section className="section-main-content">
        <header className="flex-header">
          <PageHeader name="Booking & Scheduling" />
          <Link to="booking" className="button success">
            Add New Booking
          </Link>
        </header>
        <div className="row m-0">
          <div className="col-12 p-2">
            <SchedulingCalender />
          </div>
          {/* <div className="col-12 p-2">
            <Bookings />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Scheduling;
