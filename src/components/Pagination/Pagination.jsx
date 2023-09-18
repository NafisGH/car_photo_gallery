import React, { useEffect, useMemo } from "react";
import StyledPagination from "./StyledPagination";
import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectPageCount,
} from "app/redux/slices/photoReducer";

const Pagination = ({ page, setPage }) => {
  const pageCount = useSelector(selectPageCount);
  const isLoading = useSelector(selectIsLoading);
  console.log("page", page);
  console.log("pageCount", pageCount);

  const handleClickBtnNextPage = () => {
    setPage((page += 1));
  };
  const handleClickBtnPrevtPage = () => {
    setPage((page -= 1));
  };

  const pages = useMemo(() => {
    if (pageCount < 5) {
      return Array.from({ length: pageCount }).map((_, index) => index + 1);
    }
    const lastPage = pageCount - page;
    if (lastPage < 3) {
      return Array.from({ length: 5 }).map((_, index) => pageCount - 4 + index);
    }
    if (page < 3) {
      return Array.from({ length: 5 }).map((_, index) => index + 1);
    }
    return Array.from({ length: 5 }).map((_, index) => page + index - 2);
  }, [page, pageCount]);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount, setPage]);

  return (
    <StyledPagination
      className={pages.length === 1 ? "active_none" : "pagination"}
    >
      {page === 1 ? (
        <button
          disabled
          className="btn-pagination prev disabled"
          onClick={() => handleClickBtnPrevtPage()}
        >
          PREVIOUS
        </button>
      ) : (
        <button
          className="btn-pagination prev"
          onClick={() => handleClickBtnPrevtPage()}
        >
          PREVIOUS
        </button>
      )}

      {pages.map((value) => (
        <li
          className={page === value ? "active" : ""}
          key={value}
          onClick={() => setPage(value)}
        >
          {value}
        </li>
      ))}
      {page === pageCount ? (
        <button
          disabled
          className="btn-pagination next disabled"
          onClick={() => handleClickBtnNextPage()}
        >
          NEXT
        </button>
      ) : (
        <button
          className="btn-pagination next"
          onClick={() => handleClickBtnNextPage()}
        >
          NEXT
        </button>
      )}
    </StyledPagination>
  );
};

export default Pagination;
