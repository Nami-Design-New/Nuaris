import React from "react";
import Announcements from "../layout/Home/Announcements";
import SchedulingCalender from "../layout/scheduling/SchedulingCalender";
import Bookings from "../layout/scheduling/Bookings";
import Weather from "../layout/Home/Weather";
import BookingsStats from "../layout/Home/BookingsStats";

const Home = () => {
  return (
    <section className="homePage">
      <div className="row m-0">
        <div className="col-lg-8 co-12 p-2">
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
          <Bookings />
        </div>
      </div>
    </section>
  );
};

export default Home;
