const axios = require("axios"),
  moment = require("moment"),
  config = require("../config/main"),
  Property = require("../models/property");

const propertiesUrl = `https://api.zoopla.co.uk/api/v1/property_listings.js?api_key=${
  config.zooplaAPIKey
}&listing_status=rent&minimum_beds=2&maximum_beds=2&minimum_price=150&maximum_price=275&page_size=100&radius=5&postcode=`;
const trainStationsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
  config.googlePlaceAPIKey
}&rankby=distance&type=subway_station&location=`;
const busStopsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
  config.googlePlaceAPIKey
}&rankby=distance&type=bus_station&location=`;
const supermarketsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
  config.googlePlaceAPIKey
}&rankby=distance&type=supermarket&location=`;

// const postcodes = [
//   { text: "SW19 7NB", latitude: 51.42244, longitude: -0.20798 },
//   { text: "E15 4LZ", latitude: 51.54339, longitude: 0.00982 }
// ];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
  res.send("This is the API.");
};

// types: https://developers.google.com/places/supported_types
// test: https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=gkhgkhj&rankby=distance&type=subway_station&location=51.5609,0.082067
exports.downloadListings = async function(req, res, next) {
  try {
    const properties = [];
    let count = 0;
    for (let postcode of postcodes) {
      const response = await axios.get(`${propertiesUrl}${postcode.text}`);
      const listings = response.data.listing;
      for (const listing of listings) {
        const property = await Property.findOne({
          listing_id: listing.listing_id
        });
        const today = moment();
        const listingDate = moment(listing.first_published_date);
        if (!property && today.diff(listingDate, "day") <= 14) {
          console.log(property);
          console.log(count);
          console.log(postcode);
          console.log(listing.listing_id);
          count++;
          // 10 requests per second for Google APIs
          await sleep(400);
          const distance = getDistanceFromLatLonInKm(
            postcode.latitude,
            postcode.longitude,
            listing.latitude,
            listing.longitude
          );
          let trainStations, busStops, supermarkets;
          try {
            trainStations = await axios.get(
              `${trainStationsUrl}${listing.latitude},${listing.longitude}`
            );
            busStops = await axios.get(
              `${busStopsUrl}${listing.latitude},${listing.longitude}`
            );
            supermarkets = await axios.get(
              `${supermarketsUrl}${listing.latitude},${listing.longitude}`
            );
          } catch (error) {
            console.log(error);
          }
          trainStations = trainStations.data.results.slice(0, 3);
          busStops = busStops.data.results.slice(0, 3);
          supermarkets = supermarkets.data.results.slice(0, 3);
          trainStations = trainStations.map(trainStation => {
            let distance = getDistanceFromLatLonInKm(
              listing.latitude,
              listing.longitude,
              trainStation.geometry.location.lat,
              trainStation.geometry.location.lng
            );
            distance = distance.toFixed(3);
            return {
              name: trainStation.name,
              distance: distance
            };
          });
          busStops = busStops.map(busStop => {
            let distance = getDistanceFromLatLonInKm(
              listing.latitude,
              listing.longitude,
              busStop.geometry.location.lat,
              busStop.geometry.location.lng
            );
            distance = distance.toFixed(3);
            return {
              name: busStop.name,
              distance: distance
            };
          });
          supermarkets = supermarkets.map(supermarket => {
            let distance = getDistanceFromLatLonInKm(
              listing.latitude,
              listing.longitude,
              supermarket.geometry.location.lat,
              supermarket.geometry.location.lng
            );
            distance = distance.toFixed(3);
            return {
              name: supermarket.name,
              distance: distance
            };
          });
          listing["status"] = "new";
          listing["original_postcode"] = postcode.text;
          listing["distance"] = distance.toFixed(3);
          listing["train_stations"] = trainStations;
          listing["bus_stops"] = busStops;
          listing["supermarkets"] = supermarkets;
          let newProperty = new Property(listing);
          await newProperty.save();
        }
      }
    }
    res.send("Download complete.");
  } catch (e) {
    next(e);
  }
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
