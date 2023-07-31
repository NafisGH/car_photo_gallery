import styled from "styled-components";
const StyledPagination = styled.ul`
  list-style: none;
  padding: 5px 0px;
  margin: 0;
  /* margin-top: 10px; */
  background-color: gray;
  width: 100%;
  display: flex;
  justify-content: center;

  .btn-pagination {
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
    box-sizing: border-box;
    width: 120px;
    background-color: white;
    cursor: pointer;

    &:hover {
      background-color: silver;
    }

    &.prev {
        margin-right: 20px;
    }
    &.next {
        margin-left: 20px;
    }
  }

  li:not(:last-of-type) {
        margin-right: 15px;
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
