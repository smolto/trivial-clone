module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL
  }
}
