import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../layout/shared/PageHeader";

const BookingAndScheduling = () => {
  return (
    <div>
      <section className="section-main-content">
        <header className="flex-header">
          <PageHeader name="Booking & Scheduling" />
          <Link to="booking" className="button success">
            Add New Booking
          </Link>
        </header>
      </section>
    </div>
  );
};

export default BookingAndScheduling;
