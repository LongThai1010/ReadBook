const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);
const CommentSchema = new mongoose.Schema(
  {
    username: {
      type: "string",
    },
    cmt: {
      type: String,
    },
    slug: {
      type: String,
      slug: "name",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Comment", CommentSchema);
