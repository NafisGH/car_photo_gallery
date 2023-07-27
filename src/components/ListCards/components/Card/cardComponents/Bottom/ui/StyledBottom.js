import styled from "styled-components";

export default styled.div`
  .bottom {
    display: flex;
    justify-content: space-between;
    border-top: 2px solid black;
  }

  .left {
    display: block;
    display: flex;
    justify-content: end;
    padding: 15px 20px 10px;
  }

  .left span {
    margin-right: 10px;
    align-self: end;
  }

  .right {
    display: block;
    display: flex;
    justify-content: end;
    padding: 15px 20px 10px;
    align-self: flex-end;
  }
`;
