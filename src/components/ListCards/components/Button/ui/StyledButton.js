import styled from "styled-components";

export default styled.button`
  border: none;
  background: none;

  div svg {
    width: 30px;
    height: 30px;

    background: none;
    border: none;
    display: grid;
    border-radius: 50%;
    transition: all 0.1s linear;
    flex-shrink: 0;
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
      background-color: orange;
    }
  }

   &:not(:last-of-type) {
    margin-right: 15px;
  }
`;
