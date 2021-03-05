import React from 'react'
import Link from "next/link";
import Router from "next/router";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { addCommasToNumber } from "lib";
import {
  sortOptions,
  pageSizeOptions,
  mapSortOptionsToParams,
  getSortOptionFromParams,
  DEFAULT_PAGE_SIZE
} from "constants/search";

import css from "./OptionsBar.module.scss";

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
    val.preventDefault()
    Router.push({
      pathname: "/search",
      query: Object.assign({}, this.props.route.query, {
        page_size: val.target.value,
        page: 1
      })
    });
  };

  onSortChange = (val) => {
    val.preventDefault()
    Router.push({
      pathname: "/search",
      query: Object.assign({}, this.props.route.query, {
        sort_by: mapSortOptionsToParams[val.target.value].sort_by,
        sort_order: mapSortOptionsToParams[val.target.value].sort_order,
        page: 1
      })
    });
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
        <div className={css.wrapper}>
          <div className={css.optionsBar + ``}>
            <div className={css.resultsAndFilter}>
              <div className={css.optionWrapper}>
                <InputLabel>Show:</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.pageSizeValue}
                  onChange={this.onPageSizeChange}
                  className={css.select}
                >
                  {pageSizeOptions.map((item, index) =>
                    <MenuItem value={item.value} key={index}>
                      {item.label}
                    </MenuItem>
                  )}
                </Select>
              </div>
              <h1 className={css.resultsCount}>
                <span>
                  of {addCommasToNumber(this.props.itemCount)} results{" "}
                </span>
                {this.props.route.query.q &&
                  <span className={css.resultsCountQuery}>
                    <span>for </span>
                    <span className={css.resultsCountQueryText}>
                      {this.props.route.query.q}
                    </span>
                  </span>}
              </h1>


              <button
                onClick={() => onClickToggleFilters()}
                aria-expanded={showFilters}
                className={`${css.toggleFilters} ${showFilters
                  ? css.showFilters
                  : ""} ${numberOfActiveFacets !== 0
                    ? css.withActiveFacets
                    : ""}`}
              >
                <span>Filters</span>
                {numberOfActiveFacets !== 0 &&
                  <span className={css.activeFacetCount}>
                    ({numberOfActiveFacets})
                </span>}
                {showFilters ? 
                  <ExpandLessIcon alt="expand less filters menu"/>                
                :
                  <ExpandMoreIcon alt="expand filters menu"/>                
                }
              </button>
            </div>

            <div className={css.options}>
              <div className={css.optionWrapper}>
                <InputLabel>Sort By:</InputLabel>
                <Select
                  autoWidth={true}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.sortValue}
                  onChange={this.onSortChange}
                  className={css.select}
                >
                  {sortOptions.map((item, index) =>
                    <MenuItem value={item.value} key={index}>
                      {item.label}
                    </MenuItem>
                  )}
                </Select>
              </div>
              <div className={css.optionWrapper}>
                <div className={css.viewButtons}>
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
                        css.listViewButton,
                        this.props.route.query.list_view === "grid"
                          ? css.viewButtonInactive
                          : css.viewButtonActive
                      ].join(" ")}
                    >
                      <ListIcon color={this.props.route.query.list_view === "grid" ? "disabled" : "inherit"}/>
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
                        css.gridViewButton,
                        this.props.route.query.list_view === "grid"
                          ? css.viewButtonActive
                          : css.viewButtonInactive
                      ].join(" ")}
                    >
                      <AppsIcon color={this.props.route.query.list_view === "grid" ? "inherit" : "disabled"}/>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className={css.pageNumber}>Page {currentPage}</p>
      </>
    );
  }
}

export default OptionsBar;
