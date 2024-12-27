import { useState } from "react";
import { Modal } from "react-bootstrap";
import RegisterAnnouncement from "./RegisterAnnouncement";
import useGetAnnouncementDetails from "../../hooks/dashboard/useGetAnnouncementDetails";

export default function AnnouncementModal({
  showModal,
  setShowModal,
  targetId,
  setTargetId,
}) {
  const { data: announcement } = useGetAnnouncementDetails(targetId);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <Modal
        show={showModal}
        size="lg"
        onHide={() => {
          setShowModal(false);
          setTargetId(null);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h6>{announcement?.announcement?.title}</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="announcement_modal">
            <div className="d-flex w-100 gap-3 flex-lg-row flex-column">
              <div className="media_card">
                <img
                  src={announcement?.announcement?.image || "/images/s1.png"}
                  alt=""
                />
              </div>
              <div className="media_card">
                <video
                  src={announcement?.announcement?.video || "/images/s1.png"}
                  controls
                ></video>
              </div>
            </div>

            <p>{announcement?.announcement?.Description}</p>
            <div className="actions">
              <button className="stroked">Try It Now</button>
              {!announcement?.already_registered && (
                <button
                  onClick={() => {
                    setShowRegisterModal(true);
                    setShowModal(false);
                  }}
                >
                  Register Now
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <RegisterAnnouncement
        announcement={announcement}
        showModal={showRegisterModal}
        setShowModal={setShowRegisterModal}
      />
    </>
  );
}
