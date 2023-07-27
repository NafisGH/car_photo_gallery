import styled from "styled-components";
const StyledListCards = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  /* grid-auto-rows: minmax(min-content, 300px); */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;
export default StyledListCards;

