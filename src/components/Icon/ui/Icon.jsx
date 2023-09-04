import React from "react";
import StyledIcon from "./StyledIcon";

export default function Icon(props) {
  const { Svg } = props;
  return (
    <StyledIcon>
      <Svg />
    </StyledIcon>
  );
}
