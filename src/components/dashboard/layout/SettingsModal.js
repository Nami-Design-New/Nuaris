import { motion } from "framer-motion";
import CustomRadioInput from "../../ui/CustomRadioInput";
export default function SettingsModal({ isOpen }) {
  const variants = {
    open: {
      opacity: 1,
      height: "unset",
    },
    closed: {
      opacity: 0,
      height: 0,
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      className="settings-modal modals"
    >
      <div className="header">
        <p>Preferred Notification</p>
      </div>
      <div className="body">
        <div className="radios">
          <CustomRadioInput label={"SMS"} name={"prefered_notification"} />
          <CustomRadioInput label={"Email"} name={"prefered_notification"} />
          <CustomRadioInput label={"WhatsApp"} name={"prefered_notification"} />
        </div>
      </div>
    </motion.div>
  );
}
