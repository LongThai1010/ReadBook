const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const session = require("express-session");
const app = express();
const port = 3000;

const SortMiddleware = require("./app/middlewares/sortMiddleware");

const route = require("./routes");
const db = require("./config/db");

// connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));

// BAI MErTHOR POST
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

app.use(SortMiddleware);

// Session init
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// http logger
// app.use(morgan("combined"));

// template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: require("./helper/handlebar"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// routes init
route(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
