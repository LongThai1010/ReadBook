const User = require("../models/User.js");

class authMiddleware {
  Checklogin(req, res, next) {
    if (!req.session || !req.session.user) {
      // res.status(404).json({ message: "Bạn Không Đủ Tư Cách!" }); // a không muốn json thì đoạn alert nha
      // return res.redirect('user/')
      return res.send(
        "<script>alert('Bạn Chưa Đăng nhập!');window.location.href='/auth/login'</script>"
      );
    }
    next();
  }

  checkRole(req, res, next) {
    if (!req.session || !req.session.user) {
      res.send(
        "<script>alert('Bạn Chưa Đăng nhập!');window.location.href='/auth/login'</script>"
      );
    } else {
      if (req.session.user.role == 0) {
        next();
      } else {
        res.send(
          "<script>alert('Bạn Không đủ Quyền Truy Cập!');window.location.href='/'</script>"
        );
      }
    }
  }

  // checkHaveAuth(req, res, next) {
  //   if (!req.session || !req.session.user) {
  //     // res.status(404).json({ message: "Bạn Không Đủ Tư Cách!" }); // a không muốn json thì đoạn alert nha
  //     // return res.redirect('user/')
  //     return res.send("<script>window.location.href='/auth/login'</script>");
  //   }
  //   next();
  // }
}

module.exports = new authMiddleware();
