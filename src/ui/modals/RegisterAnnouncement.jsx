import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import SubmitButton from "./../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

export default function RegisterAnnouncement({
  showModal,
  setShowModal,
  announcement,
}) {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    if (!checked) {
      toast.warning("You have to accept the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/announcement/register_to_announcement",
        {
          announcement_id: announcement?.announcement?.id,
        }
      );
      if (res?.status === 201 || res?.status === 200) {
        toast.success("Registered successfully");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  console.log(announcement);

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Terms And conditions</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="announcement_modal">
          {announcement?.announcement?.announcement_terms?.map((term) => (
            <p className="terms mb-2" key={term?.announcement_id}>
              {term?.terms}
            </p>
          ))}
          <div className="accept_terms">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <h6>
              you agree to the terms of service and privacy policy of the
              application
            </h6>
          </div>
          <div className="actions">
            <SubmitButton
              loading={loading}
              name="Continue"
              event={handleRegister}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
