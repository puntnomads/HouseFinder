module.exports = {
  database:
    process.env.MONGOLAB_URI || "mongodb://localhost:27017/house-finder",
  port: process.env.PORT || 4001,
  zooplaAPIKey: process.env.ZOOPLA_KEY || "fwfnqxgh84vcy4qvw7bxrghx"
};
