// avoids redundant API error 
export const config = {
  api: {
    externalResolver: true,
  },
}

const API_KEY = process.env.API_KEY

export default (req, res) => {
  const query = req.query
  const url = `http://api.dp.la/v2/items/${query.itemid}?api_key=${API_KEY}`

  fetch(url)
  .then(data => data.json())
  .then(results => {
    res.status(200).json(results)
  })
  .catch(error => console.log('error in browse by partner api ', error))
}
