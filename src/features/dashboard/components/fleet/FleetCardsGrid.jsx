import { useSearchParams } from "react-router-dom";
import useGetYachts from "./../../../../hooks/useGetYachts";
import TableLoader from "./../../../../ui/loaders/TableLoader";
import Pagination from "./../../../../ui/Pagination";
import emptyPlaceholder from "../../../../assets/images/icons/empty_fleets.svg";
import FleetCard from "./FleetCard";

export default function FleetCardsGrid() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const { data: yachts, isLoading } = useGetYachts(9, currentPage);

  return (
    <div className="row m-0">
      {isLoading ? (
        <TableLoader />
      ) : (
        <>
          {yachts?.count === 0 ? (
            <div className="col-12 p-2">
              <div className="empty_wrap">
                <img src={emptyPlaceholder} alt="empty" />
                <h3>No Yachts Found</h3>
              </div>
            </div>
          ) : (
            <>
              {yachts?.results?.map((yacht) => (
                <div className="col-lg-3 col-md-6 col-12 p-2" key={yacht.id}>
                  <FleetCard fleet={yacht} />
                </div>
              ))}
              <Pagination count={yachts.count} pageSize={9} />
            </>
          )}
        </>
      )}
    </div>
  );
}
