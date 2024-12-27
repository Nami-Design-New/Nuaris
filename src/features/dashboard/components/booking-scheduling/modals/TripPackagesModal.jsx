import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { handleChange } from "../../../../../utils/helper";
import { s3Url } from "../../../../../utils/constants";
import TextField from "../../../../../ui/form-elements/TextField";
import Badge from "../../../../../ui/Badge";
import PackageReservations from "../cards/PackageReservations";
import SubmitButton from "../../../../../ui/form-elements/SubmitButton";

const TripPackagesModal = ({
  showModal,
  setShowModal,
  target,
  loading,
  formData,
  confirmBooking,
  setFormData,
  bookingDay,
}) => {
  const [period, setPeriod] = useState();
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";

  useEffect(() => {
    const period = target?.trip_package_days?.find(
      (day) => day?.day === bookingDay
    )?.trip_package_day_periods?.[0];

    setPeriod(period);
  }, [bookingDay, target?.trip_package_days]);

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
                    target?.media?.filter(
                      (media) => media?.type === "IMAGE" && media?.is_active
                    )?.[0]?.path
                  }
                  alt="package"
                />
              </div>
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="content">
                <h3 className="title">{target?.name}</h3>
                <p>{target?.description}</p>
                <div className="whatIncluded">
                  <h6>Addons & Avtivities</h6>
                  <div className="includes">
                    {target?.addons?.map((addon) => (
                      <p key={addon?.id}>
                        {addon?.addon?.name} <span>X{addon?.quantity}</span>
                      </p>
                    ))}
                    {target?.activities?.map((activity) => (
                      <p key={activity?.id}>
                        {activity?.activity?.name}{" "}
                        <span>X{activity?.quantity}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="bg_main10_card">
                <p>price:</p>
                <h6>
                  {Number(period?.price)} {currency}
                  <span> / {period?.period?.name}</span>
                </h6>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="bg_main10_card">
                <p>Capacity:</p>
                <h6>{target?.yacht?.capacity}</h6>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="bg_main10_card">
                <p>Available:</p>
                <h6>8</h6>
              </div>
            </div>
            <div className="col-12 p-2">
              <PackageReservations
                days={target?.trip_package_days?.filter(
                  (day) => day?.day === bookingDay
                )}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <div className="col-12 p-2">
              <TextField
                label="Client Notes"
                placeholder="write here"
                name="client_notes"
                id="client_notes"
                value={formData?.client_notes}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            <div className="col-12 p-2">
              <SubmitButton
                name={"Confirm"}
                className="save"
                event={confirmBooking}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TripPackagesModal;
