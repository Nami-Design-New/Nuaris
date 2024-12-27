import useGetPeriodTypes from "../../../../../hooks/app/useGetPeriodTypes";

const PackageReservations = ({ days, formData, setFormData }) => {
  const { data: periodTypes } = useGetPeriodTypes(5);
  console.log(periodTypes);

  return (
    <div className="reservations">
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="title">
            Reservations
            <div className="bookType">
              <p className="availble">Available</p>
              <p className="selected">Selected</p>
              <p className="fullyBooked">Fully Booked</p>
            </div>
          </h6>
        </div>
        {days?.map((day) =>
          day?.trip_package_day_periods
            ?.filter(
              (p) =>
                p?.period?.type ===
                periodTypes?.find((p) => p?.id === +formData?.price_type)?.type
            )
            ?.map((period) => (
              <div className="col-lg-4 col-12 p-2" key={period?.id}>
                <label htmlFor={period?.id} className="reservation_card_label">
                  <input
                    type="radio"
                    name="period_id"
                    id={period?.id}
                    value={period?.id}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        period_id: e.target.value,
                      }))
                    }
                  />
                  <div className="reservation_card availble">
                    <p>4 Available</p>
                    <h6>
                      Start{" "}
                      <span>
                        {day?.day} {period?.start_time}
                      </span>
                    </h6>
                    <h6>
                      End{" "}
                      <span>
                        {day?.day} {period?.end_time}
                      </span>
                    </h6>
                  </div>
                </label>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default PackageReservations;
