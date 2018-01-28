const ApiController = require("./controllers/api"),
  express = require("express");

module.exports = function(app) {
  const apiRoutes = express.Router();

  app.use("/api", apiRoutes);
  apiRoutes.get("/", ApiController.APIHome);
  //apiRoutes.get("/test", ApiController.testZooplaAPI);
  apiRoutes.get("/download-listings", ApiController.downloadListings);
  apiRoutes.get("/postcodes", ApiController.getPostcodes);
  apiRoutes.get("/properties/:postcode", ApiController.getPropertiesByPostcode);
  //apiRoutes.get("/property", ApiController.getPropertyById);
  //apiRoutes.get("/interesting_properties/", ApiController.getInterestingProperties);
  //apiRoutes.put("/property", ApiController.updateAProperty);

  //   apiRoutes.get("/userpolls/:name", requireAuth, ApiController.getUserPolls);
  //   apiRoutes.post("/polls", requireAuth, ApiController.createAPoll);
  //   apiRoutes.get("/polls/:id", ApiController.getAPoll);
  //   apiRoutes.put("/polls/:id", requireAuth, ApiController.updateAPoll);
  //   apiRoutes.delete("/polls/:id", requireAuth, ApiController.deleteAPoll);
};
