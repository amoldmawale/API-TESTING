const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],

    unique: true,
  },
  durations: {
    type: String,
    required: [true, "Must Provide Duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "Must have a Group Size"],
  },
  difficulty: {
    type: String,
    required: [true, "Must have a difficulty"],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "Summary is required"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "Image is required"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});
const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;
