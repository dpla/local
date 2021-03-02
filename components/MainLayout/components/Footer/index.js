import React from "react";
import css from "./Footer.module.scss";
import { LOCALS } from "constants/local";
import Link from "next/link";
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID
const logo = "/static/images/dpla-logo.svg";

const Footer = () => {
  let logoHtml;
  if (LOCAL_ID === "wisconsin") {
    logoHtml = (
      <a href={`${LOCALS[LOCAL_ID].externalLink}`}>
        <img
          className={css.localLogo}
          alt={`${LOCALS[LOCAL_ID].name} Home`}
          src={`/static/${LOCALS[LOCAL_ID].theme}/${LOCALS[LOCAL_ID]
            .logo}`}
        />
      </a>
    );
  } else if (LOCAL_ID === "tennessee") {
    logoHtml = (
      <Link  href="/local" as="/">
        <a>
          <img
            className={css.localLogo}
            alt={`${LOCALS[LOCAL_ID].name} Home`}
            src={`/static/tennessee/logo2.png`}
          />
        </a>
      </Link>
    );

  } else {
    logoHtml = (
      <Link  href="/local" as="/">
        <a>
          <img
            className={css.localLogo}
            alt={`${LOCALS[LOCAL_ID].name} Home`}
            src={`/static/${LOCALS[LOCAL_ID].theme}/${LOCALS[LOCAL_ID]
              .logo}`}
          />
        </a>
      </Link>
    );
  }

  return (
    <footer className={css.wrapper}>
      <div className={css.smallFooterWrapper}>
        <div className={`${css.smallFooter} site-max-width`}>
          {logoHtml}
          <Link  href="//dp.la">
            <a>
              <img
                className={css.partnershipLogo}
                alt="In partnership with DPLA"
                src={logo}
              />
            </a>
          </Link>
        </div>
      </div>

    </footer>
  )
}

export default Footer;
