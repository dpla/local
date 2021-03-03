// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const API_KEY = process.env.API_KEY

export default (req, res) => {
  fetch(`http://api.dp.la/v2/items?facets=dataProvider&facet_size=1000&filter=${req.query.filter}&api_key=${API_KEY}`)
  .then(data => data.json())
  .then(results => {
    res.json({results})
    res.statusCode = 200
    res.end()
  })
  .catch(error => console.log(error))
}
