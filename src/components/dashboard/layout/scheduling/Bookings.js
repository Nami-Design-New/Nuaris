import React from "react";
import BookingsTable from "./BookingsTable";

const Bookings = () => {
  return (
    <div className="bg_white_card">
      <div className="m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Bookings</h6>
        </div>
      </div>
      <BookingsTable />
    </div>
  );
};

export default Bookings;
