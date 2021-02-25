module.exports = {
  // using the experimental tag allows for the capability to use sassOptions
  // currently, sassOptions is including the theme file for the local based on the LOCAL_ID

  experimental: { scss: true },
  sassOptions: {
    includePaths: [`./stylesheets/themes/${process.env.REACT_APP_LOCAL_ID}`]
  }
}