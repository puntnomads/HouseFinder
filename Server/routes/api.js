const express = require("express");
const axios = require("axios");
const router = express.Router();

const listingsUrl =
  "https://api.zoopla.co.uk/api/v1/property_listings.js?api_key=fwfnqxgh84vcy4qvw7bxrghx&listing_status=rent&minimum_beds=2&maximum_beds=2&minimum_price=150&maximum_price=275&order_by=price&ordering=ascending&page_size=100&summarised=yes&postcode=";

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
/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("This is the Zoopla API.");
});

router.get("/listings", async (req, res, next) => {
  try {
    const listings = [];
    for (let postcode of postcodes) {
      const response = await axios.get(`${listingsUrl}${postcode}`);
      const data = response.data;
      data.listing.forEach(function(listing) {
        listings.push(listing);
      });
    }
    res.json({ listings: listings });
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e);
  }
});

module.exports = router;
