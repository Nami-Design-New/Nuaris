import FleetCard from "./FleetCard";
import { useSelector } from "react-redux";

export default function FleetCardsGrid() {
  const yachts = useSelector((state) => state.yachts.yachts);
  return (
    <div className="row m-0">
      {yachts?.results?.map((yacht) => (
        <div className="col-lg-3 col-md-6 col-12 p-2" key={yacht.id}>
          <FleetCard fleet={yacht} />
        </div>
      ))}
    </div>
  );
}
