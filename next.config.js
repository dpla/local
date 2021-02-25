module.exports = {
  experimental: { scss: true },
  sassOptions: {
    includePaths: [`./stylesheets/themes/${process.env.LOCAL_ID}`]
  }
}