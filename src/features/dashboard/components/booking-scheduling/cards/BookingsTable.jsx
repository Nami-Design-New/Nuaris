import { useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";
import useGetBookings from "../../../../../hooks/dashboard/useGetBookings";
import Pagination from "../../../../../ui/Pagination";

const BookingsTable = () => {
  const [filter, setFilter] = useState("upcoming");
  const { data: bookings } = useGetBookings();
  const [, setShowBoatBookingModal] = useState(false);
  const [, setShowActivityBookingModal] = useState(false);
  const [, setShowTripPackageBookingModal] = useState(false);
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";

  const ActionTemplate = (rowData) => {
    return (
      <div className="actions_cell">
        <Button>
          <img src="/images/icons/delete.svg" alt="delete" />
        </Button>
        <Button>
          <img src="/images/icons/edit.svg" alt="edit" />
        </Button>
        <Button
          onClick={() => {
            if (rowData?.path === "Trip package path") {
              setShowTripPackageBookingModal(true);
            } else if (rowData?.path === "Boats Path") {
              setShowBoatBookingModal(true);
            } else if (rowData?.path === "Activities Path") {
              setShowActivityBookingModal(true);
            }
          }}
        >
          <img src="/images/icons/eye.svg" alt="view" />
        </Button>
      </div>
    );
  };

  const priceTemplate = (item) => {
    return (
      <div className="price_template">
        <h4>
          {item?.total_addons
            ? +item?.total_price + +item?.total_addons
            : +item?.total_price}{" "}
          {currency}
        </h4>
      </div>
    );
  };

  const pathTemplate = (item) => {
    let path;
    if (!item?.yacht_id && !item?.trip_package_id) {
      path = "Activity";
    }

    if (item?.yacht_id) {
      path = "Boat";
    }

    if (item?.trip_package_id) {
      path = "Trip package";
    }

    return (
      <div className="path_template">
        <h6>{path}</h6>
      </div>
    );
  };

  const paymentTemplate = (item) => {
    return (
      <div className="status_template">
        <h6>
          {item?.payment_type === 1
            ? "Cash"
            : item?.payment_type === 2
            ? "Card"
            : ""}
        </h6>
      </div>
    );
  };

  return (
    <>
      <div className="col-12 p-2">
        <div className="bookings_filter">
          <span className={`activeTab ${filter}`} />
          <div
            className={`tab ${filter === "upcoming" ? "active" : ""}`}
            onClick={() => setFilter("upcoming")}
          >
            <h6>Upcoming</h6>
          </div>
          <div
            className={`tab ${filter === "previous" ? "active" : ""}`}
            onClick={() => setFilter("previous")}
          >
            <h6>Previous</h6>
          </div>
          <div
            className={`tab ${filter === "canceled" ? "active" : ""}`}
            onClick={() => setFilter("canceled")}
          >
            <h6>Canceled</h6>
          </div>
        </div>
      </div>

      <div className="col-12 p-2">
        <div className="table-container p-relative">
          <DataTable value={bookings?.data}>
            <Column field="booking_reservation.name" header="Name" />
            <Column field="date_of_booking" header="Date" />
            <Column body={pathTemplate} header="Path" />
            <Column
              field="booking_reservation.booked_seats"
              header="Number of clients"
            />
            <Column body={paymentTemplate} header="Payment" />
            <Column body={priceTemplate} header="Price" />
            <Column body={ActionTemplate} header="Actions" />
          </DataTable>
          {bookings?.count > 5 && (
            <Pagination count={bookings?.count} pageSize={5} />
          )}
        </div>
      </div>
    </>
  );
};

export default BookingsTable;
