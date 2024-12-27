import FilterListing from "../components/Fleet/FilterListing";
import FleetCard from "../components/Fleet/FleetCard";
import SectionHeader from "../Layout/SectionHeader";

export default function Fleet() {
  return (
    <>
      <SectionHeader title={"Fleet"} />
      <section className="fleets_search_section">
        <div className="container">
          <div className="row">
            <div className="col-12 p-2">
              <FilterListing />
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <FleetCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <FleetCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <FleetCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <FleetCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <FleetCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <FleetCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <FleetCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <FleetCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
