import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../../layout/PageHeader";
import BookingTopFilter from "./BookingTopFilter";
import BoatsPath from "./paths/BoatsPath";
import ActivitiesPath from "./paths/ActivitiesPath";
import TripPackagesPath from "./paths/TripPackagesPath";

const Booking = () => {
  const [screenView, setScreenView] = useState("main");
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    date_of_booking: "",
    location_id: "",
    destination_id: "",
    quantity: "",
    client_notes: "",
    booking_starts_at: "",
    period_id: "",
    type: "",
    price_type: "",
    category: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...Object.fromEntries([...searchParams]),
    }));
  }, [searchParams]);

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Booking" />
      </header>
      {screenView === "main" && (
        <BookingTopFilter
          formData={formData}
          setFormData={setFormData}
          setScreenView={setScreenView}
        />
      )}
      {screenView === "boats" && (
        <BoatsPath
          formData={formData}
          setFormData={setFormData}
          setScreenView={setScreenView}
        />
      )}
      {screenView === "activities" && (
        <ActivitiesPath
          formData={formData}
          setFormData={setFormData}
          setScreenView={setScreenView}
        />
      )}
      {screenView === "trip-packages" && (
        <TripPackagesPath
          formData={formData}
          setFormData={setFormData}
          setScreenView={setScreenView}
        />
      )}
    </section>
  );
};

export default Booking;
