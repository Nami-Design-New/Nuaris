import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { checkIfDateOfBookingInSeason } from "../../../../../utils/helper";
import { useSelector } from "react-redux";
import { s3Url } from "../../../../../utils/constants";
import Badge from "../../../../../ui/Badge";
import InputField from "../../../../../ui/form-elements/InputField";
import TextField from "../../../../../ui/form-elements/TextField";
import useGetDirections from "../../../../../hooks/location-destination/useGetDirections";
import useGetWhatIncluding from "../../../../../hooks/app/useGetWhatIncluding";
import SubmitButton from "../../../../../ui/form-elements/SubmitButton";

const ActivityModal = ({
  loading,
  confirmBooking,
  setShowModal,
  setFormData,
  formData,
  activity,
  showModal,
}) => {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  const { data: loacations } = useGetDirections("Location");
  const { data: includings } = useGetWhatIncluding();
  const [price, setPrice] = useState({});

  useEffect(() => {
    const periodId = formData?.period_id;
    const seasons = checkIfDateOfBookingInSeason(
      activity?.season_prices,
      formData?.date_of_booking
    );

    console.log(seasons);

    if (seasons && seasons?.length > 0) {
      const pricesArr = seasons?.flatMap((season) => season?.prices);
      setPrice(
        pricesArr?.find((price) => price?.period?.id === Number(periodId))
      );
      setFormData((prev) => ({
        ...prev,
        price_id: price?.find((price) => price?.period?.id === Number(periodId))
          .id,
        price_type: 2,
      }));
    } else {
      setPrice(
        activity?.prices?.find(
          (price) => price?.period?.id === Number(periodId)
        )
      );
      setFormData((prev) => ({
        ...prev,
        price_id: activity?.prices?.find(
          (price) => price?.period?.id === Number(periodId)
        ).id,
        price_type: 1,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity, formData?.date_of_booking, formData?.period_id, setFormData]);

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
                    activity?.media?.filter(
                      (media) => media?.type === "IMAGE" && media?.is_active
                    )?.[0]?.path
                  }
                  alt="activity"
                />
              </div>
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="content">
                <h3 className="title">{activity?.name}</h3>
                <h6 className="sub">
                  {activity?.category === "water"
                    ? "Water activities"
                    : "Shore activities"}
                </h6>
                <p>{activity?.description}</p>
                <div className="whatIncluded">
                  <h6>Whats including</h6>
                  <div className="includes">
                    {activity?.including?.map((i) => (
                      <p key={i?.including_id}>
                        {
                          includings?.find(
                            (item) => item?.id === i?.including_id
                          )?.name
                        }{" "}
                        <span>{i?.quantity}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>price:</p>
                <h6>
                  {activity?.prices && Number(price?.price) + " " + currency}
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
                      (location) => location?.id === activity?.location_id
                    )?.name
                  }
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>Capacity:</p>
                <h6>{activity?.capacity}</h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>Available:</p>
                <h6>8</h6>
              </div>
            </div>

            <form className="row" onSubmit={confirmBooking}>
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label="Number of person"
                  id="number_of_person"
                  name="number_of_person"
                  type="number"
                  placeholder="00"
                  min="1"
                  value={formData.number_of_seats}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      number_of_seats: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-lg-6 col-12 p-2">
                <InputField
                  label="Quantity"
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="00"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }))
                  }
                  min="1"
                />
              </div>
              <div className="col-12 p-2">
                <TextField
                  label="Client Notes"
                  placeholder="write here"
                  name="client_notes"
                  id="client_notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-12 p-2">
                <SubmitButton name="Confim" loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ActivityModal;
