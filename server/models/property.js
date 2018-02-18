const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Property = new Schema(
  {
    status: {
      type: String,
      enum: ["new", "dismissed", "interesting"],
      default: "new"
    },
    original_postcode: String
  },
  {
    strict: false,
    timestamps: true
  }
);

module.exports = mongoose.model("Property", Property);
