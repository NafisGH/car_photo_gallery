import React from "react";
import { Button } from "components/ListCards/components/Button/ui/Button";
import { Icon } from "components/Icon";
import { ReactComponent as IconTrash } from "assets/icons/icons_SVG/trash.svg";
import { ReactComponent as IconEdite } from "assets/icons/icons_SVG/edite.svg";
import { ReactComponent as IconFavorites } from "assets/icons/icons_SVG/favorites.svg";
import StyledTop from "./StyledTop";

export const Top = () => {
  return (
    <StyledTop>
      <div className="top">
        <Button classNameBtn="btnDelete">
          <Icon Svg={IconTrash} />
        </Button>
        <Button classNameBtn="btnEdite">
          <Icon Svg={IconEdite} />
        </Button>
        <Button classNameBtn="btnFavorites">
          <Icon Svg={IconFavorites} />
        </Button>
      </div>
    </StyledTop>
  );
};
