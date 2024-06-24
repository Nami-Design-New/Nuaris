import { motion } from "framer-motion";
import CustomRadioInput from "../../../ui/CustomRadioInput";
import { useEffect, useRef, useState } from "react";
export default function SettingsModal({ isOpen, setIsOpen }) {
  const variants = {
    open: {
      opacity: 1,
      height: "162px",
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
  }

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      const isDropdownButton = event.target.closest(".settings-gear");

      if (!isDropdownButton) {
        setIsOpen(false);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOpen, dropdownRef]);

  return (
    <motion.div
      ref={dropdownRef}
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
