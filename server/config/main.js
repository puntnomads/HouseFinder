module.exports = {
  database:
    process.env.MONGOLAB_URI || "mongodb://localhost:27017/house-finder",
  port: process.env.PORT || 3001,
  zooplaAPIKey: process.env.ZOOPLA_API_KEY,
  googlePlaceAPIKey: process.env.HOUSE_FINDER_GOOGLE_PLACES_API_KEY
};
