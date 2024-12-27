import { useEffect, useState } from "react";
import { PERIOD_TYPES } from "../../../../utils/constants";
import { handleChange, handlePhoneChange } from "../../../../utils/helper";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import InputField from "../../../../ui/form-elements/InputField";
import SelectField from "../../../../ui/form-elements/SelectField";
import CustomTimePicker from "../../../../ui/working-hours/CustomTimePicker";
import useGetDirectionsAll from "../../../../hooks/location-destination/useGetDirectionsAll";
import useGetPeriodTypes from "../../../../hooks/app/useGetPeriodTypes";
import PhoneField from "../../../../ui/form-elements/PhoneField";

function BookingTopFilter({ formData, setFormData, setScreenView }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredDurations, setFilteredDurations] = useState([]);
  const [bookingPath, setBookingPath] = useState(
    searchParams.get("path") || "boats"
  );

  const { data: locations } = useGetDirectionsAll("Location");
  const { data: durations } = useGetPeriodTypes(
    bookingPath === "boats" ? 1 : 2
  );

  const { data: periodTypes } = useGetPeriodTypes(5);

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(formData?.type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, formData?.type]);

  const handleSearch = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const date = new Date(formData?.date_of_booking);

    if (date < currentDate) {
      toast.error("Please select a future date");
      return;
    }

    setSearchParams({ path: bookingPath });
    setScreenView(bookingPath);
  };

  const setPathType = (path) => {
    setBookingPath(path);
    setFormData((prev) => ({
      ...prev,
      period_id: "",
      type: "",
    }));
  };

  return (
    <div className="form_ui">
      <div className="row">
        {/* booking path */}
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Booking Path</label>
            <div className="pathes">
              <label htmlFor="boats">
                <input
                  type="radio"
                  name="path"
                  id="boats"
                  value="boats"
                  checked={bookingPath === "boats"}
                  onChange={(e) => setPathType(e.target.value)}
                />
                <div className="path">Boats</div>
              </label>

              <label htmlFor="activities">
                <input
                  type="radio"
                  name="path"
                  id="activities"
                  value="activities"
                  checked={bookingPath === "activities"}
                  onChange={(e) => setPathType(e.target.value)}
                />
                <div className="path">Activities</div>
              </label>

              <label htmlFor="trip-packages">
                <input
                  type="radio"
                  name="path"
                  id="trip-packages"
                  value="trip-packages"
                  checked={bookingPath === "trip-packages"}
                  onChange={(e) => setPathType(e.target.value)}
                />
                <div className="path"> Trip Package</div>
              </label>
            </div>
          </div>
        </div>

        {/* filter form */}
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            <form className="row" onSubmit={handleSearch}>
              <div className="col-lg-4 col-md-6 col-12 p-2">
                <InputField
                  label="Name"
                  id="name"
                  name="name"
                  required
                  placeholder="EX: mahmoud gamal"
                  value={formData.name}
                  onChange={(e) => handleChange(e, setFormData)}
                />
              </div>

              <div className="col-lg-4 col-md-6 col-12 p-2">
                <PhoneField
                  label="Phone Number"
                  placeholder="Enter phone number"
                  required
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={(e) =>
                    handlePhoneChange(e, "phone_number", setFormData)
                  }
                />
              </div>

              <div className="col-lg-4 col-md-6 col-12 p-2">
                <InputField
                  label="Email Address"
                  id="email"
                  name="email"
                  required
                  placeholder="EX: mail@mail.com"
                  value={formData.email}
                  onChange={(e) => handleChange(e, setFormData)}
                />
              </div>

              <div className="col-lg-4 col-md-6 col-12 p-2">
                <InputField
                  label="Date of Booking"
                  id="date_of_booking"
                  name="date_of_booking"
                  type="date"
                  required
                  value={formData.date_of_booking}
                  onChange={(e) => handleChange(e, setFormData)}
                />
              </div>

              <div className="col-lg-4 col-md-6 col-12 p-2">
                <SelectField
                  options={locations?.map((location) => ({
                    name: location.name,
                    value: location.id,
                  }))}
                  label="Choose Location"
                  required
                  id="location_id"
                  name="location_id"
                  value={formData.location_id}
                  onChange={(e) => handleChange(e, setFormData)}
                />
              </div>

              {(bookingPath === "boats" || bookingPath === "trip-packages") && (
                <div className="col-lg-4 col-md-6 col-12 p-2">
                  <InputField
                    label="Number of Clients"
                    id="quantity"
                    name="quantity"
                    placeholder="00"
                    min="1"
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) => handleChange(e, setFormData)}
                  />
                </div>
              )}

              {bookingPath === "trip-packages" && (
                <div className="col-lg-4 col-12 p-2">
                  <SelectField
                    label="Price Type"
                    id="price_type"
                    name="price_type"
                    required
                    value={formData?.price_type}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        price_type: e.target.value,
                      });
                    }}
                    options={periodTypes?.map((period) => ({
                      name: period?.name,
                      value: period?.id,
                    }))}
                  />
                </div>
              )}

              {bookingPath === "activities" && (
                <div className="col-lg-4 col-md-6 col-12 p-2">
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
              )}

              {(bookingPath === "boats" || bookingPath === "activities") && (
                <>
                  <div className="col-lg-4 col-12 p-2">
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

                  <div className="col-lg-4 col-12 p-2">
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
                </>
              )}

              {(bookingPath === "boats" || bookingPath === "activities") && (
                <div className="col-lg-4 col-12 p-2">
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
              )}

              <div className="col-12 p-2 d-flex justify-content-end">
                <button
                  className="button success mt-3"
                  style={{ width: "200px" }}
                >
                  Show Available
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingTopFilter;
