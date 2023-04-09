const Product = require("../models/Product");
const User = require("../models/User");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class MeController {
  // GET /me/stored/courses
  storedProducts(req, res, next) {
    Product.find({})
      .then((products) =>
        res.render("me/stored-products", {
          products: mutipleMongooseToObject(products),
        })
      )
      .catch(next);
  }

  profile(req, res, next) {
    User.find({})
      .then((user) =>
        res.render("me/profile", {
          user: mutipleMongooseToObject(user),
        })
      )
      .catch(next);
  }

  renderAdminPage(req, res, next) {
    res.render("me/admin");
  }
}

module.exports = new MeController();
