const { mutipleMongooseToObject } = require("../../util/mongoose");

const Product = require("../models/Product");

class SiteController {
  // [GET] Home
  index(req, res, next) {
    Product.find({})
      .then((products) =>
        res.render("home", { products: mutipleMongooseToObject(products) })
      )
      .catch(next);
  }

  // [GET] search

  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
