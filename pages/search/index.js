import React from "react";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import OptionsBar from "components/SearchPage/OptionsBar";
import FiltersList from "components/SearchPage/FiltersList";
import Searchbar from "components/SearchPage/Searchbar";
import MainContent from "components/SearchPage/MainContent";
import MaxPageError from "components/SearchPage/MaxPageError";
import DPLAHead from "components/DPLAHead";

import {
    getCurrentUrl,
    getItemThumbnail
} from "lib";

import {
    possibleFacets,
    mapFacetsToURLPrettified,
    pageSizeOptions,
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE,
    splitAndURIEncodeFacet
} from "constants/search";

import { LOCALS } from "constants/local-data";
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID
const SEARCH_ENDPOINT = '/api/search'

class Search extends React.Component {

    state = {
        showSidebar: false
    };

    toggleFilters = () => {
        this.setState({ showSidebar: !this.state.showSidebar });
    };

    render() {
        const {
            router,
            results,
            numberOfActiveFacets,
            pageCount,
            currentPage,
            pageSize,
            query
        } = this.props;

        let itemCount = 0;

        if ("count" in results) {
            if (results.count.value !== undefined) {
                console.log("VALUE!");
                itemCount = results.count.value // ElasticSearch 7
            } else {
                itemCount = results.count // ElasticSearch 6
            }
        }

        return (
            <MainLayout>
                <DPLAHead
                    pageTitle={query === undefined ? 
                        "Search Results | DPLA" :
                        `${query} | Search Results | DPLA`}
                    pageDescription={query === undefined ? 
                        "Search results" :
                        `Search results for "${query}"`}
                />
                <Searchbar searchQuery={query}/>
                <OptionsBar
                    showFilters={this.state.showSidebar}
                    currentPage={currentPage}
                    route={router}
                    itemCount={itemCount}
                    onClickToggleFilters={this.toggleFilters}
                    numberOfActiveFacets={numberOfActiveFacets}
                />
                <FiltersList
                    showFilters={this.state.showSidebar}
                    onClickToggleFilters={this.toggleFilters}
                    route={router}
                    facets={results.facets}
                />
                {currentPage <= MAX_PAGE_SIZE &&
                <MainContent
                    hideSidebar={!this.state.showSidebar}
                    paginationInfo={{
                        pageCount: pageCount,
                        pageSize: pageSize || DEFAULT_PAGE_SIZE,
                        currentPage: currentPage
                    }}
                    route={router}
                    facets={results.facets}
                    results={results.docs}
                />}
                {currentPage > MAX_PAGE_SIZE &&
                <MaxPageError maxPage={MAX_PAGE_SIZE} requestedPage={currentPage} />}
            </MainLayout>
        );
    }
}

Search.getInitialProps = async ({ query, req }) => {
  let local = LOCALS[LOCAL_ID];
  const currentUrl = getCurrentUrl(req);
  const q = query.q
    ? encodeURIComponent(query.q.trim())
      .replace(/'/g, "%27")
      .replace(/"/g, "%22")
    : "";

  let hasDates = false;
  const queryArray = possibleFacets
    .map(facet => {
      if (facet.indexOf("sourceResource.date") !== -1 && !hasDates) {
        hasDates = true; // do it only once for date queries
        // the date “facets” from ES do not map to the way the API expects requests
        // remove whatever is after the last periot (“begin” or “end”)
        facet = facet.replace(".begin", "");
        facet = facet.replace(".end", "");
        // dates are special (also all those pretty/uglifiers shold be one object instead of three but ¯\_(ツ)_/¯)
        let dateQuery = [];
        let beginYear = "";
        let endYear = "";
        if (query.after && !isNaN(Number(query.after))) {
          beginYear = Number(query.after);
          dateQuery.push(`${facet}.after=${beginYear}-01-01`);
        }
        if (query.before && !isNaN(Number(query.before))) {
          endYear = Number(query.before);
          dateQuery.push(`${facet}.before=${endYear}-12-31`);
        }
        return dateQuery.join("&");
      }
      // everyone else
      if (
        query[mapFacetsToURLPrettified[facet]] &&
        facet.indexOf("sourceResource.date") === -1
      ) {
        return `${facet}=${splitAndURIEncodeFacet(
          query[mapFacetsToURLPrettified[facet]]
        )}`;
      }
      return "";
    })
    .filter(facetQuery => facetQuery !== "");

  const facetQueries = queryArray.join("&");

  // sort by
  let sort_by = "";
  let sort_order = ""
  if (query.sort_by === "title") {
      sort_by = "sourceResource.title";
  } else if (query.sort_by === "created") {
      sort_by = "sourceResource.date.begin";
  }

  let page_size = query.page_size || DEFAULT_PAGE_SIZE;
  const acceptedPageSizes = pageSizeOptions.map(item => item.value);
  if (acceptedPageSizes.indexOf(page_size) === -1) {
    page_size = DEFAULT_PAGE_SIZE;
  }

  let page = query.page || 1;

  if (page <= MAX_PAGE_SIZE) {
    const numberOfActiveFacets = facetQueries
      .split(/(&|\+AND\+)/)
      .filter(facet => facet && facet !== "+AND+" && facet !== "&").length;
    
    let filters = local.filters ? local.filters : [];
    const facetsParam = `&facets=${possibleFacets.join(",")}&${facetQueries}`;
    const filtersParam = filters.map(x => `&filter=${x}`).join("");
    const url = `${currentUrl}${SEARCH_ENDPOINT}?exact_field_match=true&q=${q}&page=${page}&page_size=${page_size}&sort_order=${sort_order}&sort_by=${sort_by}${facetsParam}${filtersParam}`;
    const res = await fetch(url);

    // api response for facets
    let json = await res.json();
    const docs = json.docs.map(result => {
      const thumbnailUrl = getItemThumbnail(result);
      return Object.assign({}, result.sourceResource, {
        thumbnailUrl,
        id: result.id ? result.id : result.sourceResource["@id"],
        sourceUrl: result.isShownAt,
        provider: result.provider && result.provider.name,
        dataProvider: result.dataProvider,
        useDefaultImage: !result.object
      });
    });

    // fix facets because ES no longer returns them in the requested order
    let newFacets = {};
    possibleFacets.forEach(facet => {
      if (json.facets[facet]) newFacets[facet] = json.facets[facet];
    });

    json.facets = newFacets;

    const maxResults = MAX_PAGE_SIZE * page_size;
    const pageCount = json.count > maxResults ? maxResults : json.count;

    return {
      results: Object.assign({}, json, { docs }),
      numberOfActiveFacets,
      currentPage: page,
      pageCount,
      pageSize: page_size
    };
  }
};

export default withRouter(Search);
