import { useSearchParams } from "react-router-dom";
import { HOST_DASHBOARD_TABLE_SIZE } from "../../constants";
import chevron from "../../assets/images/chevron-right.svg";
import chevronDouble from "../../assets/images/chevron-right-double.svg";
import CustomPaginationNumbers from "./CustomPaginationNumbers";

export default function CustomPagination({
  pageSize,
  className,
  count,
  param = "page",
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const lastPage = Math.ceil(count / (pageSize || HOST_DASHBOARD_TABLE_SIZE));
  const currentPage = searchParams.get(param) || 1;

  const atStart = currentPage <= 1;
  const atEnd = currentPage >= lastPage;

  function handlePrev() {
    !atStart &&
      setSearchParams((prev) => ({ ...prev, [param]: currentPage - 1 }));
  }

  function handleNext() {
    !atEnd &&
      setSearchParams((prev) => ({ ...prev, [param]: +currentPage + 1 }));
  }

  return (
    <div className={`pagination_component ${className}`}>
      <div className="reverse">
        <button
          onClick={() => setSearchParams((prev) => ({ ...prev, page: 1 }))}
        >
          <img src={chevronDouble} alt="First page" />
        </button>
        <button onClick={handlePrev}>
          <img src={chevron} alt="Previous" />
        </button>
      </div>
      <CustomPaginationNumbers
        currentPage={currentPage}
        lastPage={lastPage}
        param={param}
        setSearchParams={setSearchParams}
      />
      <div>
        <button onClick={handleNext}>
          <img src={chevron} alt="Next" />
        </button>
        <button
          onClick={() =>
            setSearchParams((prev) => ({ ...prev, page: lastPage }))
          }
        >
          <img src={chevronDouble} alt="Last page" />
        </button>
      </div>
    </div>
  );
}
