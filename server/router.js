const ApiController = require("./controllers/api"),
  express = require("express");

module.exports = function(app) {
  const apiRoutes = express.Router();

  app.use("/api", apiRoutes);
  apiRoutes.get("/", ApiController.APIHome);
  apiRoutes.get("/download_listings", ApiController.downloadListings);
  apiRoutes.get("/properties/:postcode", ApiController.getPropertiesByPostcode);
  apiRoutes.get("/property/:propertyId", ApiController.getPropertyById);
  apiRoutes.put("/property/:propertyId", ApiController.updateAProperty);
  apiRoutes.get(
    "/interesting_properties",
    ApiController.getInterestingProperties
  );
  app.use(function(err, req, res, next) {
    console.log("error: ", err);
  });
};
