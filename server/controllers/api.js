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

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

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
        const distance = getDistanceFromLatLonInKm(
          postcode.latitude,
          postcode.longitude,
          listing.latitude,
          listing.longitude
        );
        const property = await Property.findOne({
          listing_id: listing.listing_id
        });
        if (property) {
          return;
        } else if (today.diff(listingDate, "day") > 14) {
          return;
        } else {
          listing["status"] = "new";
          listing["original_postcode"] = postcode.text;
          listing["distance"] = distance.toFixed(3);
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
  properties.sort((a, b) => a.distance - b.distance);
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
