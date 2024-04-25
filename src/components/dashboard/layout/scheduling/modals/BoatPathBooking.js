import React from "react";
import { Modal } from "react-bootstrap";
import BookingInfo from "./BookingInfo";
import boat from "../../../../../assets/images/yacht2.jpeg";
import Id from "./Id";

const BoatPathBooking = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Booking Details</h6>
      </Modal.Header>
      <Modal.Body className="booking_modal">
        <div className="strocked_wrapper">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="title">Boats Path</h6>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="img">
                <img src={boat} alt="boat" />
              </div>
            </div>
            <div className="col-lg-8 col-12 p-2">
              <div className="content">
                <h3 className="title">Santa Maria</h3>
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
                <div className="whatIncluded">
                  <h6>Addons & Activities</h6>
                  <div className="includes">
                    <p>
                      Inflatable boat <span>x2</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="bg_main10_card">
                <p>price:</p>
                <h6>
                  $500<span> / person</span>
                </h6>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="bg_main10_card">
                <p>Destination:</p>
                <h6>Riyadh, Saudi Arabia</h6>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="bg_main10_card">
                <p>Date:</p>
                <h6>01/01/2024 3:00 pm</h6>
              </div>
            </div>
          </div>
        </div>
        <BookingInfo />
        <Id />
      </Modal.Body>
    </Modal>
  );
};

export default BoatPathBooking;
