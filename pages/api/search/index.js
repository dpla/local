// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// avoids redundant API error 
export const config = {
  api: {
    externalResolver: true,
  },
}

import { LOCALS } from "constants/local";
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID
const API_KEY = process.env.API_KEY

export default (req, res) => {
  const query = req.query
  const filtersParam = LOCALS[LOCAL_ID].filters.map(x => `&filter=${x}`).join("");
  
  // fetch(`http://api.dp.la/v2/items?exact_field_match=${query.exact_field_match}&q=${query.q}&page=${query.page}&page_size=${query.page_size}&sort_order=${query.sort_order}&sort_by=${query.sort_by}${facetsParam}${filtersParam}&api_key=${API_KEY}`)
  fetch(`http://api.dp.la/v2/items?exact_field_match=${query.exact_field_match}&q=${query.q}&page=${query.page}&page_size=${query.page_size}&sort_order=${query.sort_order}&sort_by=${query.sort_by}${filtersParam}&api_key=${API_KEY}`)
    .then(data => data.json())
    .then(results => {
      console.log('reqults here ', results)
      res.status(200).json(results)
    })
    .catch(error => console.log('error in browse by partner api ', error))
}
