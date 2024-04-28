import React, { useState } from "react";
import CustomSelectField from "../../../ui/form-elements/CustomSelectField";
import TripPackageCard from "./cards/TripPackageCard";
import Payment from "./cards/Payment";
import { Form } from "react-bootstrap";
import IdRow from "./cards/IdRow";
import TripPackagesModal from "./modals/TripPackagesModal";

const TripPackagesPath = ({ setPath }) => {
  const [paymentType, setPaymentType] = useState("full payment");
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            <div className="row m-0">
              <div className="col-12 p-2">
                <h6 className="form_title">Trip Packages Path</h6>
              </div>
              <div className="col-lg-6 col-12 p-2">
                <CustomSelectField
                  label="Choose Destination"
                  id="destination"
                  name="destination"
                  options={[
                    { name: "Cairo", value: "Cairo" },
                    { name: "Giza", value: "Giza" }
                  ]}
                />
              </div>
              <div className="col-lg-6 col-12 p-2">
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
                <TripPackageCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <TripPackageCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <TripPackageCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <TripPackageCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-12 p-2">
                <div className="require_id_wrapper">
                  <div className="row m-0">
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
      <TripPackagesModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default TripPackagesPath;
