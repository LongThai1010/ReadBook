const User = require("../models/User");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");

class AuthController {
  // [GET] /login page
  renderLogin(req, res) {
    res.render("./auth/login");
  }

  // [GET] /register page
  renderRegister(req, res) {
    res.render("./auth/register");
  }

  renderMyProfile(req, res, next) {
    const userData = req.session.user;
    res.render("./auth/myProfile", { user: userData });
  }

  // [POST] create user (register)

  create(req, res, next) {
    if (
      req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.role
    ) {
      const user = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      };
      // Dùng schema.create để insert data vào db
      User.create(user, function (err, user) {
        if (err) {
          return next(err);
        } else {
          return res.redirect("/auth/login");
        }
      });
    }
  }

  login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    // console.log(username, password);
    User.findOne({
      username: username,
      password: password,
    })
      .then((data) => {
        if (data) {
          req.session.user = data;
          req.session.user.role = data;
          res.redirect("/");
        } else {
          res.send(
            "<script>alert('tai khoan hoac mat khau khong dung!');window.location.href='/auth/login'</script>"
          );
        }
      })
      .catch((err) => {
        res.status(500).json("loi server");
      });
  }

  logout(req, res, next) {
    req.session.destroy();
    return res.redirect("/");
  }
}

module.exports = new AuthController();
