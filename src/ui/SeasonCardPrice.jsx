import { useEffect, useState } from "react";
import { PERIOD_TYPES } from "../utils/constants";
import useGetPeriodTypes from "../hooks/app/useGetPeriodTypes";
import InputField from "./form-elements/InputField";

function SeasonCardPrice({
  feature,
  price,
  index,
  emptyPeriodId,
  handleDeletePrice,
  handleChangePrice,
}) {
  const { data: durations } = useGetPeriodTypes(feature);
  const [type, setType] = useState(price?.p__type || 1);
  const [filteredDurations, setFilteredDurations] = useState([]);

  useEffect(() => {
    price?.p__type && setType(price?.p__type);
  }, [price]);

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, type]);

  const leastDuration = filteredDurations?.reduce((min, current) => {
    return current?.duration < min?.duration ? current : min;
  }, filteredDurations[0]);

  return (
    <div className="col-12 p-2">
      <div className="price_card_season">
        <div className="row w-100">
          {/* Minimum rental period */}
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="period">Booking Time</label>

              <div className="time-units">
                <select
                  className="units w-100"
                  name="period_id"
                  id="period_id"
                  required
                  value={price.period_id}
                  onChange={(e) => handleChangePrice(e, index)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {filteredDurations?.map((d) => (
                    <option key={d?.id} value={d?.id}>
                      {d?.display_duration}
                    </option>
                  ))}
                </select>

                <select
                  className="units"
                  name="min_period_type"
                  id="min_period_type"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    emptyPeriodId(index, e.target.value);
                  }}
                >
                  {PERIOD_TYPES.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              name={"price"}
              label={"Price"}
              placeholder="00"
              required
              type="number"
              value={price?.price}
              onChange={(e) => handleChangePrice(e, index)}
            />
          </div>
          {/* Extra Hour price */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              name="extra_hour_price"
              placeholder="00"
              type="number"
              required
              label={`Extra ${
                price?.period_id ? leastDuration?.name : ""
              } Price`}
              value={price?.extra_hour_price}
              onChange={(e) => handleChangePrice(e, index)}
            />
          </div>
          {/* Minimum Price */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              name="minimum_price"
              label={"Minimum Price"}
              placeholder="00"
              required
              type="number"
              value={price?.minimum_price}
              onChange={(e) => handleChangePrice(e, index)}
            />
          </div>

          <button
            disabled={index === 0}
            style={{
              opacity: index === 0 ? "0.5" : "1",
            }}
            type="button"
            className="delete_btn"
            onClick={() => handleDeletePrice(index)}
          >
            <img src="/images/icons/delete.svg" alt="deleteIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeasonCardPrice;
