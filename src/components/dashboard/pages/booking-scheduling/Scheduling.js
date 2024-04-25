import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../layout/shared/PageHeader";
import SchedulingCalender from "../../layout/scheduling/SchedulingCalender";
import Bookings from "../../layout/scheduling/Bookings";

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
            <div className="bg_white_card">
              <div className="m-0">
                <div className="col-12 p-2">
                  <h6 className="form_title">Scheduling</h6>
                </div>
                <div className="col-12 p-2">
                  <SchedulingCalender />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="bg_white_card">
              <div className="m-0">
                <div className="col-12 p-2">
                  <h6 className="form_title">Bookings</h6>
                </div>
              </div>
              <Bookings />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Scheduling;
