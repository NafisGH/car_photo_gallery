import React from "react";
import StyledCard from "./StyledCard";

import { Top } from "../cardComponents/Top/ui/Top";
import { Midle } from "../cardComponents/Midle/ui/Midle";
import { Bottom } from "../cardComponents/Bottom/ui/Bottom";

export default function Card({ card }) {

  return (
    <StyledCard>
      <Top />
      <Midle objectCard={ card }/>
      <Bottom />
    </StyledCard>
  );
}
