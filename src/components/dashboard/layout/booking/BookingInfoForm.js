import React, { useState } from "react";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";
import PhoneField from "../../../ui/form-elements/PhoneField";
import CustomSelectField from "./../../../ui/form-elements/CustomSelectField";

const BookingInfoForm = ({ setPath }) => {
  const [formData, setFormData] = useState({});
  return (
    <div className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            <div className="row m-0">
              <div class="col-12 p-2">
                <h6 class="form_title">Booking info</h6>
              </div>
              <div className="col-lg-4 col-md-6 col-12 p-2">
                <CustomInputField
                  label="Name"
                  id="name"
                  name="name"
                  placeholder="EX: mahmoud gamal"
                />
              </div>
              <div className="col-lg-4 col-12 p-2">
                <PhoneField
                  id="phone_number"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12 p-2">
                <CustomInputField
                  label="Email Address"
                  id="email"
                  name="email"
                  placeholder="EX: mail@mail.com"
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12 p-2">
                <CustomInputField
                  label="Date of Booking"
                  id="date_of_booking"
                  name="date_of_booking"
                  type="date"
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12 p-2">
                <CustomSelectField
                  label="Choose Location"
                  id="location"
                  name="location"
                  options={[
                    { name: "Cairo", value: "Cairo" },
                    { name: "Giza", value: "Giza" }
                  ]}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12 p-2">
                <CustomInputField
                  label="Number of Clients"
                  id="number_of_clients"
                  name="number_of_clients"
                  type="number"
                  placeholder="00"
                />
              </div>
              <div className="col-12 p-2">
                <div className="input-field">
                  <label>Booking Path</label>
                  <div className="pathes">
                    <div
                      className="path"
                      onClick={(e) => {
                        e.preventDefault();
                        setPath("activities");
                      }}
                    >
                      Activities
                    </div>
                    <div
                      className="path"
                      onClick={(e) => {
                        e.preventDefault();
                        setPath("boats");
                      }}
                    >
                      Boat
                    </div>
                    <div
                      className="path"
                      onClick={(e) => {
                        e.preventDefault();
                        setPath("trip-packages");
                      }}
                    >
                      Trip Package
                    </div>
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

export default BookingInfoForm;
