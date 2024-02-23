import { Link, useParams } from "react-router-dom";
import PageHeader from "../../layout/PageHeader";
import editIcon from "../../../../assets/images/edit.svg";
import shareIcon from "../../../../assets/images/share.svg";
import FleetProfileInfo from "./FleetProfileInfo";
import FleetProfileMedia from "./FleetProfileMedia";
import FleetProfileTabs from "./FleetProfileTabs";
import FleetVesselLogbook from "./FleetVesselLogbook";

export default function FleetProfile() {
  const { fleetId } = useParams();
  // TODO: Fetch fleet data
  const fleet = {};

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader
          currentName={"Yacht/boat Profile"}
          name={fleet?.name || "Fleet profile"}
        />
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

      <FleetProfileMedia fleet={fleet} />
      <FleetProfileInfo fleet={fleet} />
      <FleetProfileTabs fleet={fleet} />
      <FleetVesselLogbook />
    </section>
  );
}
