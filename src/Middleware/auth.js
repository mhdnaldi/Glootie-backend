const jwt = require("jsonwebtoken");
const helper = require("../helper/helper");

module.exports = {
  authorizationAll: (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        // CONDITION IF KEY IS INAVALID
        if (
          (err && err.name === "JsonWebTokenError") ||
          (err && err.name === "TokenExpiredError")
        ) {
          return helper.response(res, 403, err.message);
        } else {
          req.token = data;
          next();
        }
      });
    } else {
      return helper.response(res, 400, "Please login first !");
    }
  },
  authorizationAdmin: (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        // CONDITION IF KEY IS INAVALID
        if (
          (err && err.name === "JsonWebTokenError") ||
          (err && err.name === "TokenExpiredError")
        ) {
          return helper.response(res, 403, err.message);
        } else if (data.user_role === 1) {
          req.token = data;
          next();
        } else {
          return helper.response(res, 403, "Only admin can access this page");
        }
      });
    } else {
      return helper.response(res, 400, "Please login first !");
    }
  },
};
