import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
import MapWithMarker from "../../../ui/map-modal/MapWithMarker";

const AddDestinationModal = ({ showModal, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [serchedPlace, setSerchedPlace] = useState("Search on Map");
  const [mapLoaded, setMapLoaded] = useState(false);

  const [LocationPoint, setLocationPoint] = useState({
    lat: 30.04442,
    lng: 31.235712,
  });

  const [formData, setFormData] = useState({
    location_point: LocationPoint,
    location_name: "",
  });

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
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Add New Destination</h6>
      </Modal.Header>
      <Modal.Body>
        <form className="form-ui">
          <div className="row m-0">
            {/* location */}
            <div className="col-12 p-2">
              <CustomInputField
                label={"Location Name"}
                placeholder={"write here"}
                value={formData.location_name}
                onChange={(e) =>
                  setFormData({ ...formData, location_name: e.target.value })
                }
              />
            </div>
            <div className="col-12 p-2">
              {mapLoaded && (
                <MapWithMarker
                  formData={LocationPoint}
                  setFormData={setLocationPoint}
                  setSerchedPlace={setSerchedPlace}
                />
              )}
            </div>
            <div className="col-12 p-2">
              <SubmitButton name={"Save"} />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDestinationModal;
