import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import AddonRow from "../cards/AddonRow";
import IdRow from "../cards/IdRow";
import SubmitButton from "../../../../../ui/form-elements/SubmitButton";
import YachtPaymentModal from "../modals/YachtPaymentModal";
import axiosInstance from "../../../../../utils/axiosInstance";
import useGetAddonsForBooking from "../../../../../hooks/addons/useGetAddonsForBooking";

function AddonsClientsForm({ setScreenView, setBooking, booking }) {
  const { data: addons } = useGetAddonsForBooking();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requiredId, setRequiredId] = useState(false);

  const [addonsClients, setAddonsClients] = useState({
    booking_addons: [],
    clients: [{ name: "", id_number: "", dob: "" }],
  });

  const preparePayload = () => {
    const validBookingAddons = addonsClients.booking_addons.filter(
      (addon) => addon.quantity && addon.addon_id
    );
    const validClients = addonsClients.clients.filter(
      (client) => client.name && client.id_number && client.dob
    );

    const payload = { booking_id: booking?.id };

    if (validBookingAddons.length > 0) {
      payload.booking_addons = validBookingAddons;
    }
    if (validClients.length > 0) {
      payload.clients = validClients;
    } else {
      payload.clients = null;
    }

    return payload;
  };

  const handleAddAddonsAndClients = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = preparePayload();

    if (!payload.clients && !payload.booking_addons) {
      setShowPaymentModal(true);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/yacht/add_clients_and_addons_to_booking",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Clients and Addons added to booking successfully");
        setShowPaymentModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddAddonsAndClients} className="col-12 p-0">
      {booking?.id && (
        <>
          {addons?.data?.length > 0 && (
            <AddonRow
              formData={addonsClients}
              setFormData={setAddonsClients}
              addons={addons}
            />
          )}
          <div className="col-12 p-2">
            <div className="require_id_wrapper">
              <Form.Check
                type="switch"
                label="Require ID"
                id="require_id"
                checked={requiredId}
                onChange={() => setRequiredId((prev) => !prev)}
              />
              {requiredId && (
                <IdRow
                  formData={addonsClients}
                  setFormData={setAddonsClients}
                />
              )}
            </div>
          </div>
        </>
      )}
      <div className="col-12 p-2">
        <div className="path_footer">
          <button
            type="button"
            className="stroked"
            onClick={() => setScreenView("main")}
          >
            Back
          </button>
          {booking?.id && (
            <SubmitButton
              loading={loading}
              name="Save & Preview"
              className="submit_btn"
            />
          )}
        </div>
      </div>
      <YachtPaymentModal
        setScreenView={setScreenView}
        setBooking={setBooking}
        bookingId={booking?.id}
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
      />
    </form>
  );
}

export default AddonsClientsForm;
