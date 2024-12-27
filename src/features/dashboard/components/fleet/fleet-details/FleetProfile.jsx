import { Link, useParams } from "react-router-dom";
import PageHeader from "../../../layout/PageHeader";
import FleetProfileMedia from "./FleetProfileMedia";
import FleetProfileInfo from "./FleetProfileInfo";
import FleetProfileTabs from "./FleetProfileTabs";
import FleetProfileBooking from "./FleetProfileBooking";
import FleetVesselLogbook from "./FleetVesselLogbook";
import TableLoader from "../../../../../ui/loaders/TableLoader";
import useGetYachtById from "../../../../../hooks/yacht/useGetYachtById";

export default function FleetProfile() {
  const { id } = useParams();
  const { data: fleet, isLoading } = useGetYachtById(id);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: fleet?.name_en,
          url: window.location.href,
        })
        .then(() => "Shared successfully")
        .catch((error) => "Error sharing: " + error);
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return isLoading ? (
    <TableLoader />
  ) : (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader currentName={fleet?.name_en} name={fleet?.name_en} />
        <div className="utility-buttons">
          <Link to={`/dashboard/fleet/edit-yacht/${id}/`}>
            <img src="/images/icons/edit.svg" alt="edit icon" />
            Edit
          </Link>
          <button onClick={handleShare}>
            <img src="/images/icons/share.svg" alt="share icon" />
            Share
          </button>
        </div>
      </header>
      <div className="row">
        <FleetProfileMedia fleet={fleet} />
        <FleetProfileInfo fleet={fleet} />
        <FleetProfileTabs fleet={fleet} />
        <FleetProfileBooking fleet={fleet} />
        <FleetVesselLogbook />
      </div>
    </section>
  );
}
