import React from "react";
import { Modal } from "react-bootstrap";
import activity from "../../../../../assets/images/yacht1.jpeg";
import pin from "../../../../../assets/images/pin.svg";
import duration from "../../../../../assets/images/duration.svg";
import BookingInfo from "./BookingInfo";
import Id from "./Id";

const ActivityPathBooking = ({ showModal, setShowModal }) => {
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
              <h6 className="title">Activities Path</h6>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="img">
                <img src={activity} alt="activity" />
              </div>
            </div>
            <div className="col-lg-8 col-12 p-2">
              <div className="content">
                <h3 className="title">Maritime Adventures</h3>
                <h6 className="sub">Water activities</h6>
                <p>
                  Maritime Adventures offers a thrilling voyage into the heart
                  of aquatic exploration. Embark on a journey filled with
                  exhilarating activities, from sailing across pristine waters
                  to casting lines for the catch of the day. Whether you seek
                  tranquil moments amidst breathtaking scenery or crave the
                  adrenaline rush of water sports, our group promises
                  unforgettable experiences tailored to every adventurer's
                  desires. Join us aboard and unlock the endless possibilities
                  that the open sea has to offer
                </p>
                <div className="info">
                  <p>
                    <span>
                      <img src={pin} alt="pin" />
                    </span>
                    <span>Riyadh, Saudi Arabia</span>
                  </p>
                  <p>
                    <span>
                      <img src={duration} alt="pin" />
                    </span>
                    <span>3 Days</span>
                  </p>
                </div>
                <div className="whatIncluded">
                  <h6>Whats including</h6>
                  <div className="includes">
                    <p>
                      Hot drinks <span>Ultimate</span>
                    </p>
                    <p>
                      Hot drinks <span>Ultimate</span>
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

export default ActivityPathBooking;
