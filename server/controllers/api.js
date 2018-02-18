const axios = require("axios"),
  moment = require("moment"),
  config = require("../config/main"),
  Property = require("../models/property");

const propertiesUrl = `https://api.zoopla.co.uk/api/v1/property_listings.js?api_key=${
  config.zooplaAPIKey
}&listing_status=rent&minimum_beds=2&maximum_beds=2&minimum_price=200&maximum_price=275&page_size=100&radius=5&postcode=`;

const postcodes = [
  { text: "SW19 7NB", latitude: 51.42244, longitude: -0.20798 },
  { text: "E15 4LZ", latitude: 51.54339, longitude: 0.00982 }
];

/* GET home route. */
exports.APIHome = function(req, res, next) {
  res.send("This is the Zoopla API.");
};

exports.downloadListings = async function(req, res, next) {
  try {
    const properties = [];
    for (let postcode of postcodes) {
      const response = await axios.get(`${propertiesUrl}${postcode.text}`);
      const data = response.data;
      data.listing.forEach(async function(listing) {
        const today = moment();
        const listingDate = moment(listing.first_published_date);
        const property = await Property.findOne({
          listing_id: listing.listing_id
        });
        if (property) {
          return;
        } else if (today.diff(listingDate, "day") > 14) {
          return;
        } else {
          listing["status"] = "new";
          listing["original_postcode"] = postcode;
          let property = new Property(listing);
          await property.save();
        }
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
  // only get new properties fot that postcode.
  const properties = await Property.find({
    original_postcode: postcode,
    status: "new"
  });
  res.send({ properties: properties });
};

exports.getPropertyById = async function(req, res, next) {
  const propertyId = req.params.propertyId;
  const property = await Property.findOne({ _id: propertyId });
  res.send({ property: property });
};

exports.updateAProperty = async function(req, res, next) {
  const propertyId = req.params.propertyId;
  console.log(propertyId);
  const response = await Property.update({ _id: propertyId }, req.body);
  res.send({ update: response });
};

exports.getInterestingProperties = async function(req, res, next) {
  const properties = await Property.find({ status: "interesting" });
  res.send({ properties: properties });
};
