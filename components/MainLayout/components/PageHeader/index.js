import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { LOCALS, LOCAL_ID } from "constants/local";

import css from "./PageHeader.module.scss";

const PageHeader = ({ searchQuery, router }) => {
  return (
    <div className={css.headerSearchBar}>
      <div className={`${css.flexWrapper} site-max-width`}>
        <Link  href="/local" as="/">
          <a className={`${css.logo} ${css.local}`} title="Home Page">
            <img
              className={css.localLogo}
              alt={`${LOCALS[LOCAL_ID].name} Home`}
              src={`/static/local/${LOCALS[LOCAL_ID].theme}/${LOCALS[
                LOCAL_ID
              ].logo}`}
            />
            <span className={css.localText}>{LOCALS[LOCAL_ID].name}</span>
          </a>
        </Link>
        <form action="/search" className={css.searchBar}>
          <input
            key={searchQuery}
            className={css.searchInput}
            name="q"
            type="search"
            placeholder="Search the collection"
            aria-label="Search the collection"
            autoComplete="off"
          />
          {router &&
            router.pathname === "/search" &&
            router.query &&
            Object.keys(router.query).map((key, index) => {
              if (key !== "q" && key !== "page") {
                return (
                  <input
                    type="hidden"
                    key={`k_${index}`}
                    name={key}
                    value={router.query[key]}
                  />
                );
              }
            })}
          <button type="submit" className={css.searchButton}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
export default withRouter(PageHeader);
