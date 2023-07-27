import styled from "styled-components";

export default styled.div`
  .midle {
    display: grid;
    grid-template-rows: 30px 30px 1fr;
    row-gap: 5px;
    margin: 10px 0 15px;
    padding: 0 20px;

    .title {
      font-size: 26px;
      line-height: 36px;
      text-align: center;
    }

    .author {
      font-size: 20px;
      text-align: center;
    }

    img {
      width: 100%;
      border-radius: 20px;
      object-fit: cover;
      border: 1px solid black;
      height: 250px;
    }
  }
`;
