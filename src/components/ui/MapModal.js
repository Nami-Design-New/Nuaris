import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MapContainer from "./MapContainer";

const MapModal = ({ showModal, setShowModal, setFormData, formData }) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: formData.lat,
    lng: formData.lng
  });

  const handleConfirm = () => {
    setShowModal(false);
  };

  const handleMarkerDragEnd = coord => {
    setMarkerPosition({ lat: coord.latLng.lat(), lng: coord.latLng.lng() });
    setFormData({
      ...formData,
      lat: coord.latLng.lat().toFixed(6),
      lng: coord.latLng.lng().toFixed(6)
    });
  };

  // const handlePlaceSelected = place => {
  //   const lat = place.geometry.location.lat();
  //   const lng = place.geometry.location.lng();
  //   setMarkerPosition({ lat, lng });
  //   setFormData({ ...formData, lat, lng });
  // };

  return (
    <Modal
      show={showModal}
      onHide={handleConfirm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Company Location. (map)</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="row m-0">
          <div className="col-12 p-0 mb-2">
            <div className="input-field">
              <input placeholder="Search on Map" />
            </div>
          </div>
          <div className="col-12 p-0 mb-2">
            <div className="map">
              <MapContainer
                onMarkerDragEnd={handleMarkerDragEnd}
                markerPosition={markerPosition}
              />
            </div>
          </div>
          <div className="col-12 p-0">
            <Button onClick={handleConfirm}>Confirm</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;
