import { useEffect, useState } from "react";
import FleetCard from "./FleetCard";
import axios from "./../../../../util/axios";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "../../../ui/CustomPagination";
import TableLoader from "../../../ui/TableLoader";
import { useSelector } from "react-redux";

export default function FleetCardsGrid() {
  const [yachts, setYachts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yachtsCount, setYachtsCount] = useState(0);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const user = useSelector((state) => state.user?.user);
  const subUser = user?.subuser_set?.filter(
    (u) => u.role === user.current_role
  )[0]?.id;

  useEffect(() => {
    try {
      axios
        .get(`/yachts/?page_size=9?sub_user=${subUser}`, {
          params: {
            page: currentPage
          }
        })
        .then((res) => {
          setYachts(res?.data);
          setYachtsCount(res?.data?.count);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [currentPage, subUser]);

  return (
    <div className="row m-0">
      {loading ? (
        <TableLoader />
      ) : (
        <>
          {yachts?.results?.map((yacht) => (
            <div className="col-lg-3 col-md-6 col-12 p-2" key={yacht.id}>
              <FleetCard fleet={yacht} />
            </div>
          ))}
          {yachtsCount > 0 && (
            <CustomPagination count={yachtsCount} pageSize={9} />
          )}
        </>
      )}
    </div>
  );
}
