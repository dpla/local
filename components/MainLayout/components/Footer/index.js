import React from "react";
import SmallFooterLocal from "./SmallFooterLocal";
import css from "./Footer.module.scss";

const Footer = ({ route }) =>
  <footer className={css.wrapper}>
    <SmallFooterLocal route={route} />
  </footer>;
export default Footer;
