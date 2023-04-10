const newsRouter = require("./news");
const SiteRouter = require("./site");
const ProductsRouter = require("./products");
const AuthRouter = require("./auth");
const MeRouter = require("./me");
const authMiddleware = require("../app/middlewares/auth");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/products", ProductsRouter);
  app.use("/auth", AuthRouter);
  app.use("/me", MeRouter);
  app.use("/", SiteRouter);
}

module.exports = route;
