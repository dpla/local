import React from "react";
import NavigationLocal from "../shared/NavigationLocal";
import css from "../shared/DesktopStyles.module.scss";

const GlobalHeader = ({ isHome }) =>
  <div className={css.header}>
      <NavigationLocal
        className={`${css.linksContainer} site-max-width`}
        css={css}
        isHome={isHome}
      />
  </div>;

export default GlobalHeader;
