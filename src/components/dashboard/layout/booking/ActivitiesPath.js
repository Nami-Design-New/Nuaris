import React, { useState } from "react";
import CustomSelectField from "../../../ui/form-elements/CustomSelectField";
import ActivityCard from "./cards/ActivityCard";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import Payment from "./cards/Payment";

const ActivitiesPath = ({ setPath }) => {
  const [paymentType, setPaymentType] = useState("full payment");

  return (
    <div className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            <div className="row m-0">
              <div class="col-12 p-2">
                <h6 class="form_title">Activities Path</h6>
              </div>
              <div className="col-2 p-2">
                <CustomSelectField
                  label="Price type"
                  id="price_type"
                  name="price_type"
                  options={[
                    { name: "Per Person", value: "per person" },
                    { name: "Per Group", value: "per group" },
                    { name: "Per Trip", value: "per trip" }
                  ]}
                />
              </div>
              <div className="col-10 p-2">
                <CustomSelectField
                  label="Location"
                  id="location"
                  name="location"
                  options={[
                    { name: "Cairo", value: "Cairo" },
                    { name: "Giza", value: "Giza" }
                  ]}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <ActivityCard />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <ActivityCard />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <ActivityCard />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <ActivityCard />
              </div>
              <div className="col-12 p-2">
                <CustomInputField
                  label={"Quantity"}
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="00"
                />
              </div>
              <div className="col-12 p-2">
                <Payment
                  paymentType={paymentType}
                  setPaymentType={setPaymentType}
                />
              </div>
              <div className="col-12 p-2">
                <div className="path_footer">
                  <button className="stroked" onClick={() => setPath("main")}>
                    Back
                  </button>
                  <div className="d-flex gap-2">
                    <button className="stroked">Preview</button>
                    <button className="filled">Add More Booking</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPath;
