const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    titleUrl: {
      type: String,
      required: true,
      unique: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: String,
    keywords: Array,
    img: String,
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
