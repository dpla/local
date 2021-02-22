import React from "react";
import css from "../shared/DesktopStyles.module.scss";
import { LOCALS, LOCAL_ID } from "constants/local";
import Link from "next/link"

const Navbar = ({classname, style}) => {
  let local = LOCALS[LOCAL_ID];
  let visitHtml;
  let contactHtml;
  let blogHtml = null;

  if (local.routes) {
    if (LOCAL_ID === "wisconsin") {
      visitHtml = (
        <ul className={`${css.links} ${css.secondaryLinks}`}>
          <li>
            <a href={LOCALS[LOCAL_ID].externalLink + "/explore/search"}>
              About
          </a>
          </li>
        </ul>
      );
      contactHtml = (
        <li>
          <a href={LOCALS[LOCAL_ID].externalLink + "/contact"}>Contact</a>
        </li>
      );
    } else if (LOCAL_ID === "illinois") {
      blogHtml = (
        <li>
          <Link href={LOCALS[LOCAL_ID].externalLink}>
            <a>Highlights Blog</a>
          </Link>
        </li>
      );
    } else if ("externalLink" in LOCALS[LOCAL_ID]) {
      visitHtml = (
        <ul className={`${css.links} ${css.secondaryLinks}`}>
          <li>
            <Link href={LOCALS[LOCAL_ID].externalLink}>
              <a href={LOCALS[LOCAL_ID].externalLink}>Visit {LOCALS[LOCAL_ID].name}</a>
            </Link>
          </li>
        </ul>
      );
      contactHtml = null;
    } else {
      visitHtml = null;
      contactHtml = null;
    }
  }

  return (
    <div className={css.header}>
    <div className={`${css.linksContainer} ${classname} site-max-width`} id={"Navigation"}>
      <ul className={css.links}>
        <li>
          <Link prefetch href="/local" as="/">
            <a>Home</a>
          </Link>
        </li>
        {LOCALS[LOCAL_ID].hasTerms && (
          <li>
            <Link prefetch href="/terms">
              <a>Terms and Conditions</a>
            </Link>
          </li>
        )}
        {LOCALS[LOCAL_ID].hasBrowseByPartner && (
          <li>
            <Link prefetch href="/browse-by-partner">
              <a>Browse by Partner</a>
            </Link>
          </li>
        )}
        {LOCALS[LOCAL_ID].hasBrowseAll && (
          <li>
            <Link prefetch href="/search">
              <a>Browse All</a>
            </Link>
          </li>
        )}
        {LOCALS[LOCAL_ID].hasExhibits && (
          <li>
            <Link prefetch href="/exhibits">
              <a>Exhibits</a>
            </Link>
          </li>
        )}
        <li>
          <Link prefetch href="/lists">
            <a>My Lists</a>
          </Link>
        </li>
      </ul>
      {visitHtml && <span className={css.divider} />}
      {visitHtml && visitHtml}
      <ul className={`${css.links} ${css.tertiaryLinks}`}>
        {blogHtml}
        <li>
          <a href="//dp.la">Visit DPLA</a>
        </li>
      </ul>
    </div>
  </div >
  )
}
export default Navbar;
