import React, { useState } from "react";
import PageHeader from "../../layout/shared/PageHeader";
import BookingInfoForm from "./../../layout/booking/BookingInfoForm";
import ActivitiesPath from "../../layout/booking/ActivitiesPath";
import TripPackagesPath from "../../layout/booking/TripPackagesPath";
import BoatsPath from "../../layout/booking/BoatsPath";

const Booking = () => {
  const [path, setPath] = useState("main");
  let renderComponent;
  switch (path) {
    case "main":
      renderComponent = <BookingInfoForm setPath={setPath} />;
      break;
    case "activities":
      renderComponent = <ActivitiesPath setPath={setPath} />;
      break;
    case "boats":
      renderComponent = <BoatsPath setPath={setPath} />;
      break;
    case "trip-packages":
      renderComponent = <TripPackagesPath setPath={setPath} />;
      break;
    default:
      renderComponent = <BookingInfoForm setPath={setPath} />;
  }
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Booking" />
      </header>
      {renderComponent}
    </section>
  );
};

export default Booking;
