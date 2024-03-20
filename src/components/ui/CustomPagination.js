import { useSearchParams } from "react-router-dom";

export default function CustomPagination({ lastPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;
  const atStart = currentPage <= 1;
  const atEnd = currentPage < lastPage;

  function handlePrev() {
    !atStart && setSearchParams((prev) => ({ ...prev, page: currentPage - 1 }));
  }

  function handleNext() {
    !atEnd && setSearchParams((prev) => ({ ...prev, page: +currentPage + 1 }));
  }

  return (
    <div className="pagination">
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
