const getCurrentUrl = req =>
  req
    ? `${req.protocol}://${req.headers.host}`
    : `${window.location.protocol}//${window.location.host}`;

export default getCurrentUrl;
