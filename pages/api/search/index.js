// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// avoids redundant API error 
export const config = {
  api: {
    externalResolver: true,
  },
}

import {
  possibleFacets,
  mapFacetsToURLPrettified,
  splitAndURIEncodeFacet
} from "constants/search";
const API_KEY = process.env.API_KEY

export default (req, res) => {
  const query = req.query
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
        query[facet] &&
        facet.indexOf("sourceResource.date") === -1
      ) {
        return `${facet}=${
          splitAndURIEncodeFacet(query[facet])
        }`
      }
      return "";
    })
    .filter(facetQuery => facetQuery !== "");

  const facetQueries = queryArray.join("&");
  const facetsParam = `&facets=${possibleFacets.join(",")}&${facetQueries}`;
  const url = `http://api.dp.la/v2/items?exact_field_match=${query.exact_field_match}&q=${query.q}&page=${query.page}&page_size=${query.page_size}&sort_order=${query.sort_order}&sort_by=${query.sort_by}${facetsParam}&filter=${query.filter}&api_key=${API_KEY}`
  fetch(url)
    .then(data => data.json())
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => console.log('error in browse by partner api ', error))
}
