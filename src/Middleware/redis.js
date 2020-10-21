const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/helper");

module.exports = {
  clearDataRedis: (req, res, next) => {
    client.flushall((err, data) => {
      data;
    });
    next();
  },
  getMenuItemRedis: (req, res, next) => {
    client.get(`getmenu:${JSON.stringify(req.query)}`, (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getItemByNameRedis: (req, res, next) => {
    client.get(`searchname:${JSON.stringify(req.query)}`, (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getMenuIdRedis: (req, res, next) => {
    client.get(`getmenuid:${JSON.stringify(req.params)}`, (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getCategoryItemRedis: (req, res, next) => {
    client.get("getcategoryitem", (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getCategoryIdRedis: (req, res, next) => {
    client.get(`getcategoryid:${JSON.stringify(req.params)}`, (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getAllHistoryRedis: (req, res, next) => {
    client.get("gethistory", (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getHistoryIdRedis: (req, res, next) => {
    client.get(`gethistoryid:${JSON.stringify(req.params)}`, (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getTodayTotalRedis: (req, res, next) => {
    client.get("gettodaytotal", (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getTotalThisYearRedis: (req, res, next) => {
    client.get("totalthisyear", (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getRecentOrdersRedis: (req, res, data) => {
    client.get("recentorder", (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  chartKickRedis: (req, res, next) => {
    client.get("chart", (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getAllOrderRedis: (req, res, next) => {
    client.get("getorders", (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getOrderIdRedist: (req, res, next) => {
    client.get(`getorderid:${JSON.stringify(req.params)}`, (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
  getOrderThisWeekRedist: (req, res, next) => {
    client.get(`getordersweek`, (err, data) => {
      if (!err && data != null) {
        return helper.response(res, 200, "Success get data", JSON.parse(data));
      } else {
        next();
      }
    });
  },
};
