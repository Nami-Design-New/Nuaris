import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MapWithMarker from "./MapWithMarker";

const MapModal = ({
  showModal,
  setShowModal,
  setFormData,
  formData,
  title,
  setSerchedPlace,
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>{title}</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="row m-0">
          <div className="col-12 p-0 mb-2">
            <div className="map">
              {mapLoaded && (
                <MapWithMarker
                  formData={formData}
                  setFormData={setFormData}
                  setSerchedPlace={setSerchedPlace}
                />
              )}
            </div>
          </div>
          <div className="col-12 p-0">
            <Button onClick={() => setShowModal(false)}>Confirm</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
