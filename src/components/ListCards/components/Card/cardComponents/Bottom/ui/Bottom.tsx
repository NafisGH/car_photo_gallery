import React from "react";
import { ReactComponent as IconLike } from "assets/icons/icons_SVG/like.svg";
import { ReactComponent as IconComment } from "assets/icons/icons_SVG/comment.svg";
import { ReactComponent as IconShare } from "assets/icons/icons_SVG/share.svg";
import { Button } from "components/ListCards/components/Button/ui/Button";
import { Icon } from "components/Icon";
import StyledBottom from "./StyledBottom";

export const Bottom = () => {


  return (
    <StyledBottom>
      <div className="bottom">
        <div className="left">
          <Button className="btn btn_type_like">
            <Icon Svg={IconLike} />
          </Button>
          <span className="value">0</span>
          <Button className="btn btn_type_comment">
            <Icon Svg={IconComment} />
          </Button>
          <Button className="btn btn_type_share">
            <Icon Svg={IconShare} />
          </Button>
        </div>

        <div className="right">
          <p className="date">{}01.01.2023</p>
        </div>
      </div>
    </StyledBottom>
  );
};
