import React, { useState } from "react";
import PageHeader from "../../layout/PageHeader";
import CheckField from "../../../ui/form-elements/CheckField";
import AddDestinationModal from "../../layout/AddDestinationModal";

const Destination = () => {
  const [showAddDestinationModal, setShowAddDestinationModal] = useState(false);
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader />
      </header>
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            <h6>Your Destinations</h6>
            <div className="destinations form-ui">
              <CheckField
                label={"Destination 1"}
                name={"Destination 1"}
                id={"Destination 1"}
              />
              <CheckField
                label={"Destination 2"}
                name={"Destination 2"}
                id={"Destination 2"}
              />
              <CheckField
                label={"Destination 3"}
                name={"Destination 3"}
                id={"Destination 3"}
              />
              <CheckField
                label={"Destination 4"}
                name={"Destination 4"}
                id={"Destination 4"}
              />
              <CheckField
                label={"Destination 5"}
                name={"Destination 5"}
                id={"Destination 5"}
              />
              <CheckField
                label={"Destination 6"}
                name={"Destination 6"}
                id={"Destination 6"}
              />
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button
                className="save_btn"
                onClick={() => setShowAddDestinationModal(true)}
              >
                Add Destination
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddDestinationModal
        showModal={showAddDestinationModal}
        setShowModal={setShowAddDestinationModal}
      />
    </section>
  );
};

export default Destination;
