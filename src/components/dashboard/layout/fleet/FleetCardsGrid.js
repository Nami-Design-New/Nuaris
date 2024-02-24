import FleetCard from "./FleetCard";

export default function FleetCardsGrid() {
  return (
    <div className="row m-0">
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
  );
}
