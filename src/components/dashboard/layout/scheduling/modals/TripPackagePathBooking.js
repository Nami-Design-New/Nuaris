import React from "react";
import { Modal } from "react-bootstrap";
import BookingInfo from "./BookingInfo";
import packageImg from "../../../../../assets/images/package.jpg";
import duration from "../../../../../assets/images/duration.svg";
import Id from "./Id";

const TripPackagePathBooking = ({ showModal, setShowModal }) => {
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
              <h6 className="title">Trip package path</h6>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="img">
                <img src={packageImg} alt="package" />
              </div>
            </div>
            <div className="col-lg-8 col-12 p-2">
              <div className="content">
                <h3 className="title">Sunset Cruise Special</h3>
                <p>
                  Enjoy a luxurious evening aboard the stunning Yacht Serenity
                  with our Sunset Cruise Special. Indulge in a gourmet dinner
                  served with exquisite champagne as you watch the sun dip below
                  the horizon. Truly an unforgettable experience!
                </p>
                <div className="info">
                  <p>
                    <span>
                      <img src={duration} alt="pin" />
                    </span>
                    <span>3 Days</span>
                  </p>
                </div>
                <div className="whatIncluded">
                  <h6>Addons connected</h6>
                  <div className="includes">
                    <p>
                      Inflatable boat <span>x2</span>
                    </p>
                    <p>
                      Inflatable boat <span>x4</span>
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

export default TripPackagePathBooking;
