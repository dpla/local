const getCurrentUrl = req => {
  console.log('req ', req)
  return (
    req
    // ? `${req.protocol}://${req.headers.host}`
    ? `http://${req.headers.host}`
    : `${window.location.protocol}//${window.location.host}`
  )
}

export default getCurrentUrl;
