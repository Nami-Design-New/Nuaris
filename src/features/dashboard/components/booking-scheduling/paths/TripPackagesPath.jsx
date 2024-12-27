import { useState } from "react";
import { DAYS } from "../../../../../utils/constants";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import IdRow from "./../cards/IdRow";
import TripPackageCard from "./../cards/TripPackageCard";
import TripPackagesModal from "./../modals/TripPackagesModal";
import TableLoader from "../../../../../ui/loaders/TableLoader";
import SelectField from "./../../../../../ui/form-elements/SelectField";
import useGetDirectionsAll from "../../../../../hooks/location-destination/useGetDirectionsAll";
import useGetTripPackegesForBooking from "../../../../../hooks/trip-packages/useGetTripPackegesForBooking";
import axiosInstance from "../../../../../utils/axiosInstance";

const TripPackagesPath = ({ formData, setFormData, setScreenView }) => {
  const [showModal, setShowModal] = useState(false);
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState({});

  const { data: tripPackages, isLoading } =
    useGetTripPackegesForBooking(formData);
  const { data: locations } = useGetDirectionsAll("Location");
  const { data: destinations } = useGetDirectionsAll("Destination");

  const date = new Date(formData.date_of_booking);
  const dayIndex = date.getDay();
  const bookingDay = DAYS[dayIndex];

  const [requiredId, setRequiredId] = useState(false);

  const [clientsData, setClientsData] = useState([
    { name: "", id_number: "", dob: "" },
  ]);

  const confirmBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.period_id) {
      toast.error("you must choose the wanted period");
      setLoading(false);
      return;
    }

    const payLoad = {
      trip_id: target?.id,
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      trip_day_period_id: formData.period_id,
      date_of_booking: formData.date_of_booking,
      notes: formData.notes,
      quantity: formData.quantity,
    };

    try {
      const response = await axiosInstance.post("/trip/book", payLoad);
      if (response?.status === 200 || response?.status === 201) {
        setShowModal(false);
        toast.success("Booking Confirmed");
        setBooking(response?.data?.booking);
        setFormData((prev) => ({
          ...prev,
          notes: "",
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
              {/* path name */}
              <div className="col-12 p-2">
                <h6 className="form_title">Trip Packages Path</h6>
              </div>

              {/*  filter */}
              <div className="col-lg-6 col-12 p-2">
                <SelectField
                  label="Choose Destination"
                  id="destination"
                  name="destination"
                  value={formData?.destination_id}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      destination_id: e.target.value,
                    });
                  }}
                  options={destinations?.map((destination) => ({
                    name: destination?.name,
                    value: destination?.id,
                  }))}
                />
              </div>

              <div className="col-lg-6 col-12 p-2">
                <SelectField
                  label="Location"
                  id="location"
                  name="location"
                  value={formData?.location_id}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      location_id: e.target.value,
                    });
                  }}
                  options={locations?.map((location) => ({
                    name: location?.name,
                    value: location?.id,
                  }))}
                />
              </div>

              {isLoading ? (
                <TableLoader />
              ) : (
                <>
                  {tripPackages?.count === 0 ? (
                    <div className="col-12 p-2">
                      <div className="empty_wrap">
                        <img src="/images/icons/empty_fleets.svg" alt="empty" />
                        <h3>No Trip Packages Found</h3>
                      </div>
                    </div>
                  ) : (
                    <>
                      {tripPackages?.data?.map((tripPackage) => (
                        <div
                          className="col-lg-3 col-md-6 col-12 p-2"
                          key={tripPackage?.id}
                        >
                          <TripPackageCard
                            bookingDay={bookingDay}
                            tripPackage={tripPackage}
                            handleBook={() => {
                              setShowModal(true);
                              setTarget(tripPackage);
                            }}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}

              {booking?.id && (
                <div className="col-12 p-2">
                  <div className="require_id_wrapper">
                    <div className="row">
                      <div className="col-12 p-2 d-flex align-items-center justify-content-between">
                        <label htmlFor="require_id" className="form_title">
                          Require ID
                        </label>
                        <Form.Check
                          name="require_id"
                          id="require_id"
                          type="switch"
                        />
                      </div>
                      <IdRow />
                    </div>
                  </div>
                </div>
              )}

              {/* footer */}

              <div className="col-12 p-2">
                <div className="require_id_wrapper">
                  <Form.Check
                    type="switch"
                    label="Require ID"
                    id="require_id"
                    checked={requiredId}
                    onChange={() => setRequiredId((prev) => !prev)}
                  />
                  {requiredId && (
                    <IdRow
                      formData={clientsData}
                      setFormData={setClientsData}
                    />
                  )}
                </div>
              </div>

              <div className="col-12 p-2">
                <div className="path_footer">
                  <button
                    className="stroked"
                    onClick={() => setScreenView("main")}
                  >
                    Back
                  </button>
                  {booking?.id && (
                    <button className="stroked">Save & Preview</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TripPackagesModal
        showModal={showModal}
        setShowModal={setShowModal}
        target={target}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
        bookingDay={bookingDay}
        confirmBooking={confirmBooking}
      />
    </div>
  );
};

export default TripPackagesPath;
