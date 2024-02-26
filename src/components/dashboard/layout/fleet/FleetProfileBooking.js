import DataTable from "../../../ui/DataTable";

export default function FleetProfileBooking({ fleet }) {
  // TODO: Destructure table data

  return (
    <div className="col-12 p2">
      <div className="fleet-part">
        <h2>Upcoming booking</h2>
        <DataTable data={fleet} />
      </div>
    </div>
  );
}
