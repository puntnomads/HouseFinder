const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Listing = new Schema(
  {
    status: {
      type: String,
      enum: ["new", "dismissed", "interesting"],
      default: "new"
    }
  },
  {
    strict: false
  }
);

module.exports = mongoose.model("Listing", Listing);
