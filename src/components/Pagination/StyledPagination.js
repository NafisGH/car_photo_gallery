import styled from "styled-components";
const StyledPagination = styled.ul`
  overflow: hidden;
  list-style: none;
  padding: 5px 0px;
  background-color: gray;
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0px;

  &.active_none {
    display: none;
  }

  .btn-pagination {
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
    box-sizing: border-box;
    width: 120px;
    background-color: white;
    cursor: pointer;
    @media screen and (max-width: 320px) {
      width: 100px;
      font-size: 12px;
    }

    &:hover {
      background-color: silver;
    }

    &.prev {
      margin-right: 20px;
      @media screen and (max-width: 320px) {
        margin-right: 10px;
      }
      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    &.next {
      margin-left: 20px;
      @media screen and (max-width: 320px) {
        margin-left: 10px;
      }
      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  li:not(:last-of-type) {
    margin-right: 15px;
    @media screen and (max-width: 320px) {
      margin-right: 10px;
    }
  }

  li {
    max-width: 40px;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 17px;
    background-color: white;
    font-size: 18px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    @media screen and (max-width: 320px) {
      max-width: 10px;
      font-size: 14px;
      padding: 5px 12px;
    }

    &:hover {
      background-color: silver;
    }

    &.active {
      background-color: black;
      color: #fff;
    }
  }
`;
export default StyledPagination;
