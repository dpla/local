import React from "react";
import scss from "./Searchbar.module.scss";

const Searchbar = ({ searchQuery }) => {
  return (
    <div className={scss.headerSearchBar}>
      <div className={`${scss.flexWrapper} site-max-width`}>
        <form action="/search" className={scss.searchBar}>
          <input
            key={searchQuery}
            className={scss.searchInput}
            name="q"
            type="search"
            placeholder="Search the Collection"
            aria-label="Search the collection"
            autoComplete="off"
          />
          <button type="submit" className={scss.searchButton}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
export default Searchbar;
