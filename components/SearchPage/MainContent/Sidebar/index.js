import React from "react";
import Accordion from "components/shared/Accordion";
import FacetLink from "./components/FacetLink"
import DateFacet from "./components/DateFacet"
import {
  possibleFacets,
  mapFacetsToURLPrettified,
  prettifiedFacetMap
} from "constants/search";

import { escapeForRegex } from "lib";

import css from "./Sidebar.module.scss";

class Sidebar extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      possibleFacets.some(
        facet => nextProps.facets[facet] !== this.props.facets[facet]
      ) ||
      nextProps.query !== this.props.query
    ) {
      this.forceUpdate();
    }
  }

  render() {
    const { route, facets } = this.props;
    const isFacetValueInQuery = (facetKey, value) =>
      route.query[mapFacetsToURLPrettified[facetKey]] &&
      // handles case of sources with both
      // "moving image" and "image" as types
      new RegExp('"' + escapeForRegex(value) + '"').test(
        route.query[mapFacetsToURLPrettified[facetKey]]
      );
    let hasDates = false;
    return (
      <div className={css.sidebar}>
        <h2>REFINE YOUR SEARCH</h2>
        <Accordion
          items={Object.keys(facets).map((key, i) => {
            if (key.indexOf("sourceResource.date") === -1 && key.indexOf("tags") === -1) {
              return {
                name: prettifiedFacetMap[key],
                // first two items should be expanded as well as any items
                // with an active subitem found in the query string
                active:
                  i < 2 ||
                    facets[key].terms.some(termObject =>
                      isFacetValueInQuery(key, termObject.term)
                    ),
                type: "term",
                subitems: facets[key].terms.map(termObject => {
                  return {
                    content: possibleFacets.includes(key)
                      ? <FacetLink
                          route={route}
                          termObject={termObject}
                          queryKey={mapFacetsToURLPrettified[key]}
                          disabled={isFacetValueInQuery(key, termObject.term)}
                        />
                      : ""
                  };
                })
              };
            } else {
              if (!hasDates) {
                hasDates = true; // because there's facets for after and before we dont want two date ranges
                let dateProps = {};
                if (route.query.after) dateProps.after = route.query.after;
                if (route.query.before) dateProps.before = route.query.before;
                return {
                  name: prettifiedFacetMap[key],
                  active: true,
                  type: "date",
                  subitems: <DateFacet route={route} {...dateProps} />
                };
              } else {
                return "";
              }
            }
          })}
        />
      </div>
    );
  }
}

export default Sidebar;
