import React from "react";
import PageHeader from "../../layout/PageHeader";
import CustomInputField from "./../../../ui/form-elements/CustomInputField";

const Booking = () => {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Booking" />
      </header>
      <fom className="form-ui">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="inner_card gap-0">
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
            </div>
          </div>
        </div>
      </fom>
    </section>
  );
};

export default Booking;
