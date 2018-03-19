module.exports = {
  database:
    process.env.MONGOLAB_URI || "mongodb://localhost:27017/house-finder",
  port: process.env.PORT || 4001,
  zooplaAPIKey: process.env.ZOOPLA_KEY || "fwfnqxgh84vcy4qvw7bxrghx",
  googlePlaceAPIKey:
    process.env.GOOGLE_PLACES_KEY || "AIzaSyDwPvFIXB5ZoRYJ9mPec_37maFT1JGfkR8"
};
