import { toast } from "react-toastify";
import { useState } from "react";
import { DAYS } from "../../../../../utils/constants";
import BoatCard from "../cards/BoatCard";
import BoatModal from "../modals/BoatModal";
import axiosInstance from "../../../../../utils/axiosInstance";
import TableLoader from "../../../../../ui/loaders/TableLoader";
import useGetYachtsForBooking from "../../../../../hooks/yacht/useGetYachtsForBooking";
import AddonsClientsForm from "./AddonsClientsForm";

const BoatsPath = ({ formData, setFormData, setScreenView }) => {
  const { data: fleets, isLoading } = useGetYachtsForBooking(formData);

  const date = new Date(formData.date_of_booking);
  const dayIndex = date.getDay();
  const bookingDay = DAYS[dayIndex];

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState({});
  const [booking, setBooking] = useState({});

  const confirmBooking = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/yacht/book", {
        fleet_id: target?.id,
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        date_of_booking: formData.date_of_booking,
        booking_day: bookingDay,
        quantity: formData.quantity,
        booking_starts_at: formData.booking_starts_at,
        location_id: formData.location_id,
        period_id: formData.period_id,
        client_notes: formData.client_notes,
        price_id: formData.price_id,
        price_type: formData.price_type,
      });
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Booking Confirmed");
        setShowModal(false);
        setBooking(response?.data?.booking);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_ui">
      <div className="row">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            <div className="row">
              <div className="col-12 p-2">
                <h6 className="form_title">Boats Path</h6>
              </div>

              {isLoading ? (
                <TableLoader />
              ) : (
                <>
                  {!fleets || fleets?.count === 0 ? (
                    <div className="col-12 p-2">
                      <div className="empty_wrap">
                        <img src="/images/icons/empty_fleets.svg" alt="empty" />
                        <h3>No Boats Found</h3>
                      </div>
                    </div>
                  ) : (
                    <>
                      {fleets?.data?.map((yacht) => (
                        <div
                          className="col-lg-3 col-md-6 col-12 p-2"
                          key={yacht?.id}
                        >
                          <BoatCard
                            yacht={yacht}
                            formData={formData}
                            bookedBoat={booking?.yacht_id || null}
                            handleBook={() => {
                              setShowModal(true);
                              setTarget(yacht);
                            }}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}

              <AddonsClientsForm
                setScreenView={setScreenView}
                setBooking={setBooking}
                booking={booking}
              />
            </div>
          </div>
        </div>
      </div>

      <BoatModal
        yacht={target}
        showModal={showModal}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
        setShowModal={setShowModal}
        confirmBooking={confirmBooking}
      />
    </div>
  );
};

export default BoatsPath;
