// mongoose.set('strictQuery', true);
const mongoose = require("mongoose");

const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema(
  {
    name: { type: String, require: true },
    image: { type: String, maxLength: 225 },
    desc: { type: String, maxLength: 1024 },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
