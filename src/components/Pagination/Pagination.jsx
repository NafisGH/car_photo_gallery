import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectPageCount,
} from "app/redux/slices/photoReducer";
import StyledPagination from "./StyledPagination";
import classNames from "classnames";

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

  const handleClickPage = (value) => {
    if (isLoading === true) {
      return;
    }
    setPage(value);
  };

  return (
    <StyledPagination
      className={pages.length === 1 ? "active_none" : "pagination"}
    >
      {
        <button
          className={classNames("btn-pagination prev", {
            disabled: isLoading || page === 1,
          })}
          onClick={() => handleClickBtnPrevtPage()}
          disabled={isLoading || page === 1}
        >
          PREVIOUS
        </button>
      }

      {pages.map((value) => (
        <li
          className={page === value ? "active" : ""}
          key={value}
          onClick={() => handleClickPage(value)}
        >
          {value}
        </li>
      ))}
      {
        <button
          className={classNames("btn-pagination next", {
            disabled: isLoading || page === pageCount,
          })}
          onClick={() => handleClickBtnNextPage()}
          disabled={isLoading || page === pageCount}
        >
          NEXT
        </button>
      }
    </StyledPagination>
  );
};

export default Pagination;
