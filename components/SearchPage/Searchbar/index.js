import React from "react";
import { withRouter } from "next/router";
import css from "./Searchbar.module.scss";

const Searchbar = ({ searchQuery }) => {
  return (
    <div className={css.headerSearchBar}>
      <div className={`${css.flexWrapper} site-max-width`}>
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
          <button type="submit" className={css.searchButton}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
export default withRouter(Searchbar);
