const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");

const Product = require("../models/Product");
const Comment = require("../models/Comment");

class ProductController {
  // [GET] show product

  show(req, res, next) {
    // GET /products/:slug
    // res.send("search");

    const slug = req.params.slug;
    const userData = req.session.user;
    const image = req.params.image;

    Product.findOne({ slug: slug })
      .then((product) => {
        Comment.find({ slug: slug })
          .then((cmt) => {
            res.render("products/show", {
              product: mongooseToObject(product),

              comment: mutipleMongooseToObject(cmt),
              user: userData,
            });
          })
          .catch(next);
      })
      .catch(next);
  }

  createCmt(req, res, next) {
    const formData = req.body;

    const comment = new Comment({
      username: formData.username,
      cmt: formData.cmt,
      slug: formData.slug,
    });
    console.log(comment);

    comment.save();
    const slug = req.body.slug;
    return res.redirect("/products/" + slug);
  }

  // [GET] /products/create

  create(req, res, next) {
    res.render("products/create");
  }

  // [POST] /store
  store(req, res, next) {
    const name = req.body.name;
    const image = req.file.filename;
    const desc = req.body.desc;

    const product = new Product({ name, desc, image });
    console.log(product);
    product
      .save()
      .then(() => res.redirect("/me/stored/products"))
      .catch((error) => {});
  }

  // [GET], /product/:id/edit

  edit(req, res, next) {
    Product.findById(req.params.id)
      .then((product) =>
        res.render("products/edit", {
          product: mongooseToObject(product),
        })
      )
      .catch(next);
  }

  // [PUT], /products/:id
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/products"))
      .catch(next);
  }

  // [DELETE], /products/:id

  destroy(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // Search /products

  searchProducts(req, res, next) {
    var search = req.query.search;
    Product.find({ name: { $regex: ".*" + search + ".*" } })
      .then((products) =>
        res.render("home", { products: mutipleMongooseToObject(products) })
      )
      .catch(next);
  }
}

module.exports = new ProductController();
