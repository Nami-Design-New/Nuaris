import { Link, useParams } from "react-router-dom";
import PageHeader from "../../layout/PageHeader";
import editIcon from "../../../../assets/images/edit.svg";
import shareIcon from "../../../../assets/images/share.svg";
import FleetProfileInfo from "../../layout/fleet/FleetProfileInfo";
import FleetProfileMedia from "../../layout/fleet/FleetProfileMedia";
import FleetProfileTabs from "../../layout/fleet/FleetProfileTabs";
import FleetVesselLogbook from "../../layout/fleet/FleetVesselLogbook";

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

      <div className="container">
        <div className="row row-gap-4">
          <FleetProfileMedia fleet={fleet} />
          <FleetProfileInfo fleet={fleet} />
          <FleetProfileTabs fleet={fleet} />
          <FleetVesselLogbook />
        </div>
      </div>
    </section>
  );
}
