export default function CustomPaginationNumbers({
  currentPage: page,
  lastPage: max,
  param,
  setSearchParams,
}) {
  function handleSetParams(n) {
    setSearchParams({ [param]: n });
  }

  return (
    <div className="numbers">
      {+page >= 3 && (
        <>
          <button
            className={+page === 1 ? "active" : ""}
            onClick={() => handleSetParams(1)}
          >
            1
          </button>
          <Ellipsis />
        </>
      )}
      {+page >= +max - 1 && (
        <button onClick={() => handleSetParams(+max - 2)}>{+max - 2}</button>
      )}
      {+page === +max && (
        <button onClick={() => handleSetParams(+page - 1)}>{+page - 1}</button>
      )}
      {+page <= 2 && (
        <button
          className={+page === 1 ? "active" : ""}
          onClick={() => handleSetParams(1)}
        >
          1
        </button>
      )}
      {+page !== 1 && (
        <button className={"active"} onClick={() => handleSetParams(+page)}>
          {+page}
        </button>
      )}
      {+page !== +max && (
        <button onClick={() => handleSetParams(+page + 1)}>{+page + 1}</button>
      )}
      {+page === 1 && (
        <button onClick={() => handleSetParams(+page + 2)}>{+page + 2}</button>
      )}
      {+page <= +max - 3 && (
        <>
          <Ellipsis />
          <button onClick={() => handleSetParams(max)}>{max}</button>
        </>
      )}
      {+page === +max - 2 && (
        <button onClick={() => handleSetParams(max)}>{max}</button>
      )}
    </div>
  );
}

function Ellipsis() {
  return <span>...</span>;
}
