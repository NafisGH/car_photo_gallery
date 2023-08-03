import React, { useMemo, useState } from "react";
import StyledPagination from "./StyledPagination";
import { useSelector } from "react-redux";
import { selectPage, selectPageCount } from "app/redux/slices/photoReducer";

const Pagination = ({page, setPage}) => {



    const pageCount = useSelector(selectPageCount);

    const handleClickBtnNextPage = () => {
        if (pageCount - page < 6) {
            setPage(pageCount)
        } else {
            setPage(page += 5)
        }
    }
    const handleClickBtnPrevtPage = () => {
        if (page < 6) {
            setPage(1)
        } else {
            setPage(page -= 5)
        }
    }
    const handleClickPage = (value) => {
        setPage(value)
    }

    const pages = useMemo(() => {
        if (pageCount < 5) {
            return Array.from({length: pageCount}).map((_, index) => index + 1);
        }

        const lastPage = pageCount - page;

        if (lastPage < 3) {
            return Array.from({length: 5}).map((_, index) => pageCount - 4 + index);
        }

        if (page < 3) {
            return Array.from({length: 5}).map((_, index) => index + 1);
        }

        return Array.from({length: 5}).map((_, index) => page + index - 2);
    },[page, pageCount])



  return (
    <StyledPagination className="pagination">
      <button className="btn-pagination prev" onClick={() => handleClickBtnPrevtPage()}>PREVIOUS</button>
      {
        pages.map((value, index) => (
            <li 
            key={index}
            onClick={() => handleClickPage(value)}
            >{value}
            </li>
            ))     
      }
      <button className="btn-pagination next" onClick={() => handleClickBtnNextPage()}>NEXT</button>
    </StyledPagination>
  );
};

export default Pagination;
