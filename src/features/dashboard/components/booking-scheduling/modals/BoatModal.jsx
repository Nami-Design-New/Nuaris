import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { s3Url } from "../../../../../utils/constants";
import {
  checkIfDateOfBookingInSeason,
  handleChange,
} from "../../../../../utils/helper";
import TextField from "../../../../../ui/form-elements/TextField";
import Badge from "../../../../../ui/Badge";
import SubmitButton from "../../../../../ui/form-elements/SubmitButton";
import useGetDirections from "./../../../../../hooks/location-destination/useGetDirections";

const BoatModal = ({
  yacht,
  loading,
  formData,
  setFormData,
  showModal,
  setShowModal,
  confirmBooking,
}) => {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  const { data: loacations } = useGetDirections("Location");
  const [price, setPrice] = useState({});

  useEffect(() => {
    const periodId = formData?.period_id;
    const seasons = checkIfDateOfBookingInSeason(
      yacht?.season_prices,
      formData?.date_of_booking
    );

    if (seasons && seasons?.length > 0) {
      const prices = seasons?.flatMap((season) => season?.prices);
      setPrice(prices?.find((price) => price?.period?.id === Number(periodId)));
      setFormData((prev) => ({
        ...prev,
        price_id: prices?.find(
          (price) => price?.period?.id === Number(periodId)
        ).id,
        price_type: 2,
      }));
    } else {
      setPrice(
        yacht?.prices?.find((price) => price?.period?.id === Number(periodId))
      );
      setFormData((prev) => ({
        ...prev,
        price_id: yacht?.prices?.find(
          (price) => price?.period?.id === Number(periodId)
        ).id,
        price_type: 1,
      }));
    }
  }, [yacht, formData?.date_of_booking, formData?.period_id, setFormData]);

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body className="booking_modal form_ui">
        <div className="strocked_wrapper p-0 border-0">
          <div className="row">
            <div className="col-12 p-2 pt-0 pb-0">
              <Badge state={1} content={"available"} />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="img">
                <img
                  src={
                    s3Url +
                    yacht?.media?.filter(
                      (media) => media?.type === "IMAGE" && media?.is_active
                    )?.[0]?.path
                  }
                  alt="boat"
                />
              </div>
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="content">
                <h3 className="title">{yacht?.name_en}</h3>
                <p>{yacht?.description_en}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>price:</p>
                <h6>
                  {yacht?.prices && Number(price?.price) + " " + currency}
                  <span> / {price?.period?.name}</span>
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>Location:</p>
                <h6>
                  {
                    loacations?.data?.find(
                      (location) => location?.id === yacht?.fleet_location_id
                    )?.name
                  }
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>Capacity:</p>
                <h6>{yacht?.capacity}</h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>Quantity:</p>
                <h6>{formData.quantity}</h6>
              </div>
            </div>
            <div className="col-12 p-2">
              <TextField
                label="Client Notes"
                placeholder="write here"
                name="client_notes"
                id="client_notes"
                value={formData.client_notes}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            <div className="col-12 p-2">
              <SubmitButton
                event={() => confirmBooking()}
                name={"Confirm"}
                loading={loading}
                className={"save"}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BoatModal;
