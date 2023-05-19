var validator = require("validator");
var db = require("../conf/database");
module.exports = {
  usernameCheck: function (req, res, next) {
    var { username } = req.body;
    username = username.trim();
    if (!validator.isLength(username, { min: 3 })) {
      req.flash("error", "Username must be 3 or more characters");
    }
    if (!/[a-zA-Z]/.test(username.charAt(0))) {
      req.flash("error", "Username must begin with a character");
    }
    if (req.session.flash.error) {
      res.redirect("/register");
    } else {
      next();
    }
  },
  passwordCheck: function (req, res, next) {
    var { password } = req.body;
    password = password.trim();
    if (password.length < 8) {
      req.flash("error", "Password must be at least 8 characters");
    }
    if (!password.match(/[A-Z]/)) {
      req.flash("error", "Password must contain at least one uppercase letter");
    }
    if (!password.match(/[0-9]/)) {
      req.flash("error", "Password contain at least one number");
    }
    if (!password.match(/[/*\-+@!#$^&~\[\]]/)) {
      req.flash("error", "Password must contain a special character");
    } else {
      next();
    }
  },
  emailCheck: function (req, res, next) {
    var { email } = req.body;
    if (!email.match(/[@]/)) {
      req.flash("error", "Email is not valid");
    } else {
      next();
    }
  },
  tosCheck: function (req, res, next) {
    var { TOSandPrivacy } = req.body;
    if (TOSandPrivacy != "on") {
      req.flash("error", "You agree to the Terms of Service and Privacy Rules");
    } else {
      next();
    }
  },
  ageCheck: function (req, res, next) {
    var { validage } = req.body;
    if (validage != "on") {
      req.flash("error", "You confirm you are 13+ years old");
    } else {
      next();
    }
  },
  isUsernameUnique: async function (req, res, next) {
    var { username } = req.body;
    try {
      var [rows, fields] = await db.execute(
        `select id from users where username=?`,
        [username]
      );
      if (rows && rows.length > 0) {
        return res.redirect("/registration");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },
  isEmailUnique: async function (req, res, next) {
    var { email } = req.body;
    try {
      var [rows, fields] = await db.execute(
        `select id from users where email=?`,
        [email]
      );
      if (rows && rows.length > 0) {
        return res.redirect("/registration");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  },
};
