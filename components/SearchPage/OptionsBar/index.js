import React from "react";
import Link from "next/link";
import Router from "next/router";

import { addCommasToNumber } from "lib";
import {
  sortOptions,
  pageSizeOptions,
  mapSortOptionsToParams,
  getSortOptionFromParams,
  DEFAULT_PAGE_SIZE
} from "constants/search";

import scss from "./OptionsBar.module.scss";
import GridIcon from '@material-ui/icons/GridOn'
import ListIcon from '@material-ui/icons/List'

class OptionsBar extends React.Component {
  componentWillMount() {
    const { sort_by, sort_order, page_size } = this.props.route.query;
    this.setState({
      sortValue: getSortOptionFromParams({
        sortBy: sort_by || "",
        sortOrder: sort_order || ""
      }),
      pageSizeValue: page_size || DEFAULT_PAGE_SIZE
    });
  }

  componentWillReceiveProps(nextProps) {
    const { sort_by, sort_order, page_size } = this.props.route.query;
    const {
      sort_by: next_sort_by,
      sort_order: next_sort_order,
      page_size: next_page_size
    } = nextProps.route.query;
    if (
      next_sort_by !== sort_by ||
      next_sort_order !== sort_order ||
      next_page_size !== page_size
    ) {
      this.setState({
        sortValue: getSortOptionFromParams({
          sortBy: next_sort_by || "",
          sortOrder: next_sort_order || ""
        }),
        pageSizeValue: next_page_size || "10"
      });
    }
  }

  onPageSizeChange = val => {
    Router.push({
      pathname: "/search",
      query: Object.assign({}, this.props.route.query, {
        page_size: val.target.value,
        page: 1
      })
    });
  };

  onSortChange = val => {
    Router.push({
      pathname: "/search",
      query: Object.assign({}, this.props.route.query, {
        sort_by: mapSortOptionsToParams[val.target.value].sort_by,
        sort_order: mapSortOptionsToParams[val.target.value].sort_order,
        page: 1
      })
    });
  };

  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  render() {
    const {
      currentPage,
      onClickToggleFilters,
      showFilters,
      numberOfActiveFacets
    } = this.props;
    return (
      <>
        <div className={scss.wrapper}>
          <div className={scss.optionsBar + ``}>
            <div className={scss.resultsAndFilter}>
              <div className={scss.optionWrapper}>
                <label
                  htmlFor="options-bar-page-size"
                  className={scss.optionHeader}
                >
                  Show:
                </label>
                <select
                  id="options-bar-page-size"
                  value={this.state.pageSizeValue}
                  onChange={this.onPageSizeChange}
                >
                  {pageSizeOptions.map((item, index) =>
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  )}
                </select>
              </div>
              <h1 className={scss.resultsCount}>
                <span>
                  of {addCommasToNumber(this.props.itemCount)} results{" "}
                </span>
                {this.props.route.query.q &&
                  <span className={scss.resultsCountQuery}>
                    <span>for </span>
                    <span className={scss.resultsCountQueryText}>
                      {this.props.route.query.q}
                    </span>
                  </span>}
              </h1>


              <button
                onClick={() => onClickToggleFilters()}
                aria-expanded={showFilters}
                className={`${scss.toggleFilters} ${showFilters
                  ? scss.showFilters
                  : ""} ${numberOfActiveFacets !== 0
                    ? scss.withActiveFacets
                    : ""}`}
              >
                <span>Filters</span>
                {numberOfActiveFacets !== 0 &&
                  <span className={scss.activeFacetCount}>
                    ({numberOfActiveFacets})
                </span>}
                <img className={scss.filtersButtonChevron} src="static/icon/search/icon-search-dropdown.svg"
                  alt="Dropdown menu icon" />
              </button>
            </div>

            <div className={scss.options}>
              <div className={scss.optionWrapper}>
                <label htmlFor="options-bar-sort-by" className={scss.optionHeader}>
                  Sort
                </label>
                <select
                  id="options-bar-sort-by"
                  value={this.state.sortValue}
                  onChange={this.onSortChange}
                >
                  {sortOptions.map((item, index) =>
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  )}
                </select>
              </div>
              <div className={scss.optionWrapper}>
                <div className={scss.viewButtons}>
                  <Link
                    href={{
                      pathname: this.props.route.pathname,
                      query: Object.assign({}, this.props.route.query, {
                        list_view: "list"
                      })
                    }}
                  >
                    <a
                      className={[
                        scss.listViewButton,
                        this.props.route.query.list_view === "grid"
                          ? scss.viewButtonInactive
                          : scss.viewButtonActive
                      ].join(" ")}
                    >
                      <ListIcon className={scss.viewButtonIcon} />
                    </a>
                  </Link>
                  <Link
                    href={{
                      pathname: this.props.route.pathname,
                      query: Object.assign({}, this.props.route.query, {
                        list_view: "grid"
                      })
                    }}
                  >
                    <a
                      className={[
                        scss.gridViewButton,
                        this.props.route.query.list_view === "grid"
                          ? scss.viewButtonActive
                          : scss.viewButtonInactive
                      ].join(" ")}
                    >
                      <GridIcon className={scss.viewButtonIcon} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className={scss.pageNumber}>Page {currentPage}</p>
      </>
    );
  }
}

export default OptionsBar;
