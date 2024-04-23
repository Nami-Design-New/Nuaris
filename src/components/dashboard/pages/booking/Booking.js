import React from "react";
import PageHeader from "../../layout/PageHeader";

const Booking = () => {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Booking" />
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            <h6>Your Destinations</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
