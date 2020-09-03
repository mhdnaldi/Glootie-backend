const {
  getAllHistory,
  getHistoryId,
  postHistory,
  getDataOrder,
  getTodayTotal,
  getYearlyIncome,
  recentOrders,
  chart,
} = require("../model/history");
const helper = require("../helper/helper");

const redis = require("redis");
const client = redis.createClient();

module.exports = {
  getAllHistory: async (req, res) => {
    try {
      const result = await getAllHistory();
      client.setex("gethistory", 3600, JSON.stringify(result));
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getDataOrder(result[i].history_id);
      }
      return helper.response(res, 201, "Data found", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  getHistoryId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getHistoryId(id);
      if (result.length > 0) {
        client.setex(
          `gethistoryid:${JSON.stringify(req.params)}`,
          3600,
          JSON.stringify(result)
        );
        return helper.response(res, 201, `Data with id:${id} found`, result);
      } else {
        return helper.response(
          res,
          201,
          `Data with id:${id} not found`,
          result
        );
      }
    } catch (err) {
      return helper.response(res, 404, "Bad Request", err);
    }
  },
  postHistory: async (req, res) => {
    try {
      const { history_subtotal } = req.body;
      const setData = {
        invoice: Math.ceil(Math.random() * 1000000),
        history_subtotal,
        created_at: new Date(),
      };
      const result = await postHistory(setData);
      return helper.response(res, 201, "Success add new data", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  // CARD TODAY INCOME
  getTotalToday: async (req, res) => {
    try {
      const result = await getTodayTotal();
      client.setex("gettodaytotal", 3600, JSON.stringify(result));
      return helper.response(res, 201, `Today's income found`, result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  // CARD YEARLY INCOME
  getTotalThisYear: async (req, res) => {
    try {
      const result = await getYearlyIncome();
      client.setex("totalthisyear", 3600, JSON.stringify(result));
      return helper.response(res, 201, "Data found", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  // CARD RECENT ORDERS
  getRecentOrders: async (req, res) => {
    try {
      const result = await recentOrders();
      client.setex("recentorder", 3600, JSON.stringify(result));
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getDataOrder(result[i].history_id);
      }
      return helper.response(res, 201, "Data found", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  // CHART KICK
  chartKick: async (req, res) => {
    try {
      const result = await chart();
      client.setex("chart", 3600, JSON.stringify(result));
      return helper.response(res, 201, "Data found", result);
    } catch (err) {
      // console.log(err);
      return helper.response(res, 404, "Bad request", err);
    }
  },
};
