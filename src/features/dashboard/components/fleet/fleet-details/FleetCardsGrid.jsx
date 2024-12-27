import FleetCard from "./FleetCard";
import TableLoader from "../../../../../ui/loaders/TableLoader";
import useGetYachts from "../../../../../hooks/yacht/useGetYachts";
import Pagination from "../../../../../ui/Pagination";

export default function FleetCardsGrid() {
  const { data: yachts, isLoading } = useGetYachts();

  return (
    <div className="row">
      {isLoading ? (
        <TableLoader />
      ) : (
        <>
          {yachts?.count === 0 ? (
            <div className="col-12 p-2">
              <div className="empty_wrap">
                <img src="/images/icons/empty_fleets.svg" alt="empty" />
                <h3>No Yachts Found</h3>
              </div>
            </div>
          ) : (
            <>
              {yachts?.data?.map((yacht) => (
                <div className="col-lg-3 col-md-6 col-12 p-2" key={yacht.id}>
                  <FleetCard fleet={yacht} />
                </div>
              ))}
              {yachts?.count <= 5 ? null : (
                <Pagination count={yachts.count} pageSize={5} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
