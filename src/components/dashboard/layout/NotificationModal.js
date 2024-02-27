import { Link } from "react-router-dom";
import avatar from "../../../assets/images/av1.png";
import { motion } from "framer-motion";

export default function NotificationModal({ isOpen }) {
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
      className="notification-modal modals"
    >
      <div className="header">
        <p>Notifications</p>
        <Link to={"/dashboard/notifications"}>See All</Link>
      </div>
      <div className="body">
        {/* <p>No new notifications</p> */}
        {Array(10)
          .fill(0)
          .map((e, i) => {
            return <NotificationCard key={i} />;
          })}
      </div>
    </motion.div>
  );
}

function NotificationCard() {
  return (
    <div className="notification-card">
      <div className="image">
        <img src={avatar} alt="fav" />
      </div>
      <div className="content">
        <h3>New Booking Confirmation</h3>
        <p>
          {/* content.length > 100 ? content.slice(100) + "..." : content  */}
          The booking of the yacht "Symphony of the Sea" has been confirmed for
          March 15. Bo...
        </p>
      </div>
    </div>
  );
}
