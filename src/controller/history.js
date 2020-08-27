const {
  getAllHistory,
  getHistoryId,
  postHistory,
  getWeekHistory,
} = require("../model/history");
const helper = require("../helper/helper");

module.exports = {
  getAllHistory: async (req, res) => {
    try {
      const result = await getAllHistory();
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
  weekHistory: async (req, res) => {
    try {
      const result = await getWeekHistory();
      return helper.response(res, 201, `Today's data found`, result);
    } catch (err) {
      return helper.response(res, 404, `Bad request`, err);
    }
  },
};
