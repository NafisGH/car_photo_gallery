import styled from "styled-components";

const NavBar = styled.nav`
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

  ul > li {
    list-style-type: none;
  }

  ul > li > a {
    color: white;
    text-decoration: none;
    font-size: 25px;
  }
  ul > li > a:hover {
    color: yellow;
  }

  .nav-home {
    margin-right: 20px;
  }
`;

export default NavBar;
