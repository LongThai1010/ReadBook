const Product = require("../models/Product");
const User = require("../models/User");
const Comment = require("../models/Comment");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class MeController {
  // [GET] Render page admin
  renderAdminPage(req, res, next) {
    res.render("me/admin");
  }

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

  comment(req, res, next) {
    Comment.find({})
      .then((comment) =>
        res.render("me/comment", {
          comment: mutipleMongooseToObject(comment),
        })
      )
      .catch(next);
  }

  statistical(req, res, next) {
    // User.find({})
    //   .count()
    //   .then((u) => res.render("me/statistical", { u }))
    //   .catch(next);
    Product.find({})
      .count()
      .then((p) => {
        Comment.find({})
          .count()
          .then((c) => {
            User.find({})
              .count()
              .then((u) => {
                res.render("me/statistical", {
                  p,
                  c,
                  u,
                });
              });
          })
          .catch(next);
      });
  }
}

module.exports = new MeController();
