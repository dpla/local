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
  const filtersParam = LOCALS[LOCAL_ID].filters.map(x => `&filter=${x}`).join("");

  fetch(`http://api.dp.la/v2/items?facets=dataProvider&facet_size=1000&filter=${filtersParam}&api_key=${API_KEY}`)
    .then(data => data.json())
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => console.log('error in browse by partner api ', error))
}
