import { useEffect, useState } from "react";
import { DAYS, PERIOD_TYPES } from "../../../../../utils/constants";
import { handleChange } from "../../../../../utils/helper";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import ActivityCard from "../cards/ActivityCard";
import ActivityModal from "../modals/ActivityModal";
import TableLoader from "../../../../../ui/loaders/TableLoader";
import useGetActivitiesForBooking from "../../../../../hooks/activities/useGetActivitiesForBooking";
import SelectField from "../../../../../ui/form-elements/SelectField";
import useGetPeriodTypes from "../../../../../hooks/app/useGetPeriodTypes";
import CustomTimePicker from "../../../../../ui/working-hours/CustomTimePicker";
import axiosInstance from "../../../../../utils/axiosInstance";
import useGetActivityBooking from "../../../../../hooks/activities/useGetActivityBooking";
import ActivityPaymentModal from "../modals/ActivityPaymentModal";

const ActivitiesPath = ({ setScreenView, setFormData, formData }) => {
  const queryClient = useQueryClient();
  const [filteredDurations, setFilteredDurations] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState({});
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState({});

  const date = new Date(formData.date_of_booking);
  const dayIndex = date.getDay();
  const bookingDay = DAYS[dayIndex];

  const { data: durations } = useGetPeriodTypes(2);
  const { data: activities, isLoading } = useGetActivitiesForBooking(formData);
  const { data: activitiesBooking } = useGetActivityBooking(
    booking?.id,
    !!booking?.id
  );

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(formData?.type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, formData?.type]);

  const confirmBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payLoad = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      date_of_booking: formData.date_of_booking,
      price_id: formData.price_id,
      price_type: formData.price_type,
      quantity: formData.quantity,
      booking_starts_at: formData.booking_starts_at,
      location_id: formData.location_id,
      notes: formData.notes,
      activity_id: target?.id,
      number_of_seats: formData.number_of_seats,
      booking_day: bookingDay,
    };

    if (booking?.id) {
      payLoad.booking_id = booking?.id;
    }

    try {
      const response = await axiosInstance.post("/activity/book", payLoad);
      if (response?.status === 200 || response?.status === 201) {
        setShowModal(false);
        toast.success("Booking Confirmed");
        setBooking(response?.data?.booking);
        queryClient.invalidateQueries({
          queryKey: ["activity-booking", booking?.id],
        });
        setFormData((prev) => ({
          ...prev,
          notes: "",
          number_of_seats: "",
          quantity: "",
        }));
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
                <h6 className="form_title">Activities Path</h6>
              </div>

              <div className="col-lg-3 col-md-6  col-12 p-2">
                <SelectField
                  label="Rental type"
                  id="rental_type"
                  name="rental_type"
                  required
                  value={formData?.type}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      type: e.target.value,
                      period_id: "",
                    });
                  }}
                  options={PERIOD_TYPES?.map((period) => ({
                    name: period?.name,
                    value: period?.id,
                  }))}
                />
              </div>

              <div className="col-lg-3 col-md-6  col-12 p-2">
                <SelectField
                  label="Rental period"
                  id="period_id"
                  name="period_id"
                  required
                  value={formData?.period_id}
                  onChange={(e) => handleChange(e, setFormData)}
                  options={filteredDurations?.map((period) => ({
                    name: period?.display_duration,
                    value: period?.id,
                  }))}
                />
              </div>

              <div className="col-lg-3 col-md-6 col-12 p-2">
                <div className="input-field">
                  <label htmlFor="booking_starts_at">Booking start at</label>
                  <CustomTimePicker
                    value={formData?.booking_starts_at}
                    onChange={(newValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        booking_starts_at: newValue,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-12 p-2">
                <SelectField
                  label="Catagory"
                  name="category"
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => handleChange(e, setFormData)}
                  options={[
                    {
                      name: "Water activities",
                      value: "water",
                    },
                    {
                      name: "Shore activities",
                      value: "shore",
                    },
                  ]}
                />
              </div>

              {isLoading ? (
                <TableLoader />
              ) : (
                <>
                  {!activities || activities?.count === 0 ? (
                    <div className="col-12 p-2">
                      <div className="empty_wrap">
                        <img src="/images/icons/empty_fleets.svg" alt="empty" />
                        <h3>No Activities Found</h3>
                      </div>
                    </div>
                  ) : (
                    <>
                      {activities?.data?.map((activity) => (
                        <div
                          className="col-lg-3 col-md-6 col-12 p-2"
                          key={activity?.id}
                        >
                          <ActivityCard
                            activity={activity}
                            formData={formData}
                            bookedActivities={
                              activitiesBooking?.booked_activities
                            }
                            handleBook={() => {
                              setShowModal(true);
                              setTarget(activity);
                            }}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}

              {/* footer */}
              <div className="col-12 p-2">
                <div className="path_footer">
                  <button
                    className="stroked"
                    onClick={() => setScreenView("main")}
                  >
                    Back
                  </button>
                  {booking?.id && (
                    <button
                      className="stroked"
                      onClick={() => setShowPaymentModal(true)}
                    >
                      Preview
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActivityModal
        activity={target}
        loading={loading}
        showModal={showModal}
        formData={formData}
        setFormData={setFormData}
        setShowModal={setShowModal}
        confirmBooking={confirmBooking}
      />

      <ActivityPaymentModal
        setScreenView={setScreenView}
        setBooking={setBooking}
        booking={activitiesBooking}
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
      />
    </div>
  );
};

export default ActivitiesPath;
