const axios = require("axios"),
  config = require("../config/main");
Listing = require("../models/listing");

const listingsUrl = `https://api.zoopla.co.uk/api/v1/property_listings.js?api_key=${
  config.zooplaAPIKey
}&listing_status=rent&minimum_beds=2&maximum_beds=2&minimum_price=150&maximum_price=275&order_by=price&ordering=ascending&page_size=100&postcode=`;

const postcodes = [
  "CR4",
  "CR7",
  "KT3",
  "SM4",
  "SW16",
  "SW17",
  "SW19",
  "SW20",
  "SM1",
  "SM2",
  "SM3",
  "SM5",
  "SM6",
  "SM7",
  "KT4",
  "KT17",
  "CR0",
  "CR5",
  "CR8"
];

/* GET home route. */
exports.APIHome = function(req, res, next) {
  res.send("This is the Zoopla API.");
};

exports.downloadListings = async function(req, res, next) {
  try {
    const listings = [];
    for (let postcode of postcodes) {
      const response = await axios.get(`${listingsUrl}${postcode}`);
      const data = response.data;
      data.listing.forEach(async function(listing) {
        listing["status"] = "new";
        let newListing = new Listing(listing);
        await newListing.save();
      });
    }
    res.send("Download complete.");
  } catch (e) {
    next(e);
  }
};

exports.getPostcodes = function(req, res, next) {
  res.send({ postcodes: postcodes });
};

exports.getPropertiesByPostcode = async function(req, res, next) {
  const postcode = req.params.postcode;
  const properties = await Listing.find({ outcode: postcode });
  res.send({ properties: properties });
};

// exports.testZooplaAPI = async function(req, res, next) {
//   try {
//     const response = await axios.get(`${listingsUrl}SM1`);
//     const data = response.data;
//     res.send(data);
//   } catch (e) {
//     console.log(e);
//     next(e);
//   }
// };
