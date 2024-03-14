import React from "react";
import { Modal } from "react-bootstrap";
import CountUp from "react-countup";
import inflatableImage from "../../../assets/images/inflatable.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AddOnModal = ({ showModal, setShowModal }) => {
  const tableData = [
    {
      id: "#51465",
      customerName: "Hamad Almamy",
      startDate: "01/01/2024",
      startTime: "3:07 am",
      payment: "cash",
    },
  ];
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Addon Details</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="addOnModal">
          <div className="details">
            <div className="aboutAddOn">
              <div className="img">
                <img src={inflatableImage} alt="" />
              </div>
              <div className="about">
                <h3>Inflatable boat</h3>
                <span>Expert assistance </span>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose
                </p>
              </div>
            </div>
            <div className="info">
              <div className="info_card">
                <span>Parent Yacht</span>
                <h5>Mayflower</h5>
              </div>
              <div className="info_card">
                <span>Quantity</span>
                <h5>2</h5>
              </div>
              <div className="info_card">
                <span>price</span>
                <h5>
                  $200 <span>/ Trip</span>
                </h5>
              </div>
            </div>
          </div>
          <div className="statistics">
            <div className="stat_card">
              <h4>
                <CountUp duration={5} start={0} end={8399} />
                <span className="d-inline">$</span>
              </h4>
              <h6>Total earnings</h6>
            </div>
            <div className="stat_card">
              <h4>
                <CountUp duration={5} start={0} end={71} />
              </h4>
              <h6> Upcoming booking</h6>
            </div>
          </div>
          <div className="upComingBooking">
            <h4>Upcoming Booking</h4>
            <DataTable value={tableData} rows={10}>
              <Column field="id" header="Add On ID" />
              <Column field="customerName" header="Customer name" />
              <Column field="startDate" header="Start Date" />
              <Column field="startTime" header="Start Time" />
              <Column field="payment" header="Payment" />
            </DataTable>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddOnModal;
