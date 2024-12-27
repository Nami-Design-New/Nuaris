import FleetProfileInfo from "../../dashboard/components/fleet/fleet-details/FleetProfileInfo";
import FleetProfileMedia from "../../dashboard/components/fleet/fleet-details/FleetProfileMedia";
import FleetProfileTabs from "../../dashboard/components/fleet/fleet-details/FleetProfileTabs";
import SectionHeader from "../Layout/SectionHeader";

export default function FleetDetails() {
  return (
    <>
      <SectionHeader title="Yacht / boat Profile" />
      <section className="fleet_details_section">
        <div className="container">
          <div className="row">
            <FleetProfileMedia />
            <FleetProfileInfo showRequest={true} />
            <FleetProfileTabs />
          </div>
        </div>
      </section>
    </>
  );
}
