import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../../../../utils/helper";
import InputField from "../../../../ui/form-elements/InputField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import GeneralPriceCard from "../../../../ui/GeneralPriceCard";
import SeasonCard from "../../../../ui/SeasonCard";
import axiosInstance from "../../../../utils/axiosInstance";
import UponRequestPrice from "./UponRequestPrice";

const Pricing = ({
  id,
  formData,
  setFormData,
  createdYachtId,
  initialPricesData,
  seasonCardInitialData,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payLoad = {
      yacht_id: id || createdYachtId,
      price_upon_request: formData.price_upon_request,
      advance_payment_percentage: formData.advance_payment_percentage,
      prices: formData.prices.map((price) => {
        return {
          id: price.id,
          period_id: price.period_id,
          price: price.price,
          extra_hour_price: price.extra_hour_price,
          minimum_price: price.minimum_price,
        };
      }),
      season_prices: formData.season_prices,
    };

    const payLoadUpoun = {
      yacht_id: id || createdYachtId,
      price_upon_request: formData.price_upon_request,
      advance_payment_percentage: formData.advance_payment_percentage,
      prices: [
        {
          price: formData.prices[0].price,
          period_id: formData.prices[0].period_id,
        },
      ],
    };

    try {
      const response = await axiosInstance.post(
        "/yacht/add_fleet_pricing",
        formData.price_upon_request ? payLoadUpoun : payLoad
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Pricing Saved Successfully");
        navigate(
          id
            ? `/dashboard/fleet/edit-yacht/${id}/addons-connected`
            : `/dashboard/fleet/add-yacht/addons-connected?yacht_id=${createdYachtId}`
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form_ui" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 p-2">
              <h6 className="form_title">Pricing</h6>
            </div>

            <div className="col-12 p-2">
              <div className="uponRequest">
                <Form.Check
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      price_upon_request: !formData.price_upon_request,
                    }))
                  }
                  type="switch"
                  label="Upon request"
                />
              </div>
            </div>

            <div className="col-12 p-2">
              <InputField
                hint={"( Minimum 50% )"}
                label={"Advance Payment percentage"}
                name="advance_payment_percentage"
                id="advance_payment_percentage"
                type="number"
                min={50}
                max={100}
                required
                placeholder="00"
                value={formData?.advance_payment_percentage}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>

            {/* Pricing Upon Request */}
            {formData.price_upon_request && (
              <UponRequestPrice formData={formData} setFormData={setFormData} />
            )}

            {/* Normal Pricing */}
            {!formData.price_upon_request && (
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
            )}

            {!formData.price_upon_request && (
              <>
                {formData?.prices?.map((e, index) => {
                  return (
                    <GeneralPriceCard
                      key={index}
                      feature={1}
                      index={index}
                      formData={formData}
                      setFormData={setFormData}
                      hasDeleteBtn={!formData.price_upon_request ? true : false}
                    />
                  );
                })}
              </>
            )}

            {!formData.price_upon_request && (
              <>
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
                          season_prices: [
                            ...prev.season_prices,
                            seasonCardInitialData,
                          ],
                        };
                      });
                    }}
                    type="button"
                  >
                    <img src="/images/icons/add.svg" alt="addIcon" />
                  </button>
                </div>
                {formData?.season_prices?.map((_, rowIndex) => (
                  <SeasonCard
                    key={rowIndex}
                    index={rowIndex}
                    feature={1}
                    formData={formData}
                    setFormData={setFormData}
                  />
                ))}
              </>
            )}

            <div className="col-12 p-2 pt-4 d-flex">
              <SubmitButton
                name={"save"}
                loading={loading}
                className="save_btn ms-auto"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pricing;
