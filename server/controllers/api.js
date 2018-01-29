const axios = require("axios"),
  config = require("../config/main");
Property = require("../models/property");

const propertiesUrl = `https://api.zoopla.co.uk/api/v1/property_listings.js?api_key=${
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
    const properties = [];
    for (let postcode of postcodes) {
      const response = await axios.get(`${propertiesUrl}${postcode}`);
      const data = response.data;
      data.listing.forEach(async function(listing) {
        listing["status"] = "new";
        let property = new Property(listing);
        await property.save();
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
  const properties = await Property.find({ outcode: postcode });
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
