import { motion } from "framer-motion";
import CustomRadioInput from "../../ui/CustomRadioInput";
import { useState } from "react";
export default function SettingsModal({ isOpen }) {
  const variants = {
    open: {
      opacity: 1,
      height: "170px",
    },
    closed: {
      opacity: 0,
      height: 0,
    },
  };

  const [active, setActive] = useState("email");
  function handleRadioChange(e) {
    // TODO: implement
    setActive(e.target.value);
    console.log(active);
  }
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
          <CustomRadioInput
            active={active}
            value={"sms"}
            onChange={handleRadioChange}
            label={"SMS"}
            name={"prefered_notification"}
          />
          <CustomRadioInput
            active={active}
            value={"email"}
            onChange={handleRadioChange}
            label={"Email"}
            name={"prefered_notification"}
          />
          <CustomRadioInput
            active={active}
            value={"whatsapp"}
            onChange={handleRadioChange}
            label={"WhatsApp"}
            name={"prefered_notification"}
          />
        </div>
      </div>
    </motion.div>
  );
}
