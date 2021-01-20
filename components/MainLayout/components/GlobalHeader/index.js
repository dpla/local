import React from "react";
import Navigation from "../shared/Navigation";
import css from "../shared/DesktopStyles.module.scss";

const GlobalHeader = () =>
  <div className={css.header}>
    <Navigation
      className={`${css.linksContainer} site-max-width`}
      css={css}
    />
  </div>;

export default GlobalHeader;
