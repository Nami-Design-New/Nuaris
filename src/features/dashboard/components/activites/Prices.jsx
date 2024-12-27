import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import InputField from "../../../../ui/form-elements/InputField";
import GeneralPriceCard from "./../../../../ui/GeneralPriceCard";
import SeasonCard from "./../../../../ui/SeasonCard";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";

const Prices = ({
  id,
  createdActivityId,
  formData,
  setFormData,
  setForm,
  isValid,
  setIsValid,
  initialPricesData,
  seasonCardInitialData,
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Policy");
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Working hours");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      step_id: 4,
      activity_id: id || createdActivityId,
      advance_payment_percentage: formData?.advance_payment_percentage,
      prices: formData?.prices,
      season_prices: formData?.season_prices,
    };

    try {
      const response = await axiosInstance.post(
        "/activity/add_activity_pricing",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Activity Prices Info Saved Successfully");
        queryClient.invalidateQueries({ queryKey: ["activities"] });
        queryClient.invalidateQueries({
          queryKey: ["activity", createdActivityId || id],
        });
        setForm("Policy");
        setIsValid(true);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="form_title">Prices</h6>
        </div>

        {/* Prepayment percentage */}
        <div className="col-12 p-2">
          <InputField
            hint={"( Minimum 50% )"}
            label={"Advance Payment percentage"}
            name="prepaymentPercentage"
            type="number"
            placeholder="00"
            min="50"
            required
            max="100"
            value={formData?.advance_payment_percentage}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                advance_payment_percentage: e.target.value,
              }));
            }}
          />
        </div>

        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 addSeason">
            <h6 className="m-0">General Price</h6>
          </div>
          <button
            onClick={() => {
              setFormData((prev) => {
                return {
                  ...prev,
                  prices: [...prev.prices, initialPricesData],
                };
              });
            }}
            type="button"
          >
            <img src="/images/icons/add.svg" alt="addIcon" />
          </button>
        </div>

        {formData?.prices?.map((e, index) => {
          return (
            <GeneralPriceCard
              key={index + 1}
              feature={2}
              index={index}
              formData={formData}
              setFormData={setFormData}
            />
          );
        })}

        {/* calender seasons title */}
        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 addSeason">
            <img src="/images/icons/calender.svg" alt="calender" />
            <h6 className="m-0">Season Price</h6>
          </div>
          <button
            onClick={() => {
              setFormData((prev) => {
                return {
                  ...prev,
                  season_prices: [...prev.season_prices, seasonCardInitialData],
                };
              });
            }}
            type="button"
          >
            <img src="/images/icons/add.svg" alt="addIcon" />
          </button>
        </div>
        {/* calender seasons cards */}
        {formData?.season_prices?.map((_, rowIndex) => (
          <SeasonCard
            key={rowIndex}
            index={rowIndex}
            formData={formData}
            feature={2}
            setFormData={setFormData}
          />
        ))}
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Prices;
