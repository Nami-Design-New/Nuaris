import { Link, useParams } from "react-router-dom";
import PageHeader from "../../layout/PageHeader";
import editIcon from "../../../../assets/images/edit.svg";
import shareIcon from "../../../../assets/images/share.svg";
import FleetProfileInfo from "../../layout/fleet/FleetProfileInfo";
import FleetProfileMedia from "../../layout/fleet/FleetProfileMedia";
import FleetProfileTabs from "../../layout/fleet/FleetProfileTabs";
import FleetVesselLogbook from "../../layout/fleet/FleetVesselLogbook";
import FleetProfileBooking from "../../layout/fleet/FleetProfileBooking";
import { useEffect, useState } from "react";
import axios from "./../../../../util/axios";

export default function FleetProfile() {
  const [fleet, setFleet] = useState({});
  const { fleetId } = useParams();
  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const response = await axios.get(`/yachts/${fleetId}/`);
        setFleet(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFleet();
  }, [fleetId]);

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader currentName={fleet?.name_en} name={fleet?.name_en} />
        <div className="utility-buttons">
          <Link to={""}>
            <img src={editIcon} alt="edit icon" />
            Edit
          </Link>
          <button>
            <img src={shareIcon} alt="share icon" />
            Share
          </button>
        </div>
      </header>
      <div className="row m-0">
        <FleetProfileMedia fleet={fleet} />
        <FleetProfileInfo fleet={fleet} />
        <FleetProfileTabs fleet={fleet} />
        <FleetProfileBooking fleet={fleet} />
        <FleetVesselLogbook />
      </div>
    </section>
  );
}
