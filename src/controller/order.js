const {
  getAllOrder,
  getOrderId,
  postOrder,
  sumTotal,
  getDataOrder,
  totalOrderThisWeek,
} = require("../model/order");
const { postHistory, patchHistory } = require("../model/history");
const { getMenuId } = require("../model/menuItems");
const helper = require("../helper/helper");
const redis = require("redis");
const client = redis.createClient();

module.exports = {
  getAllOrder: async (req, res) => {
    try {
      const result = await getAllOrder();
      client.setex("getorders", 3600, JSON.stringify(result));
      return helper.response(res, 201, "Data found", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  getOrderId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getOrderId(id);
      if (result.length > 0) {
        client.setex(
          `getorderid:${JSON.stringify(req.params)}`,
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
      return helper.response(res, 404, "Bad request", err);
    }
  },
  postOrder: async (req, res) => {
    try {
      const setData = {
        invoice: Math.floor(Math.random() * 1000000),
        history_subtotal: 0,
        created_at: new Date(),
      };
      let result = await postHistory(setData);
      let historyId = result.history_id;
      let orders = req.body;
      orders.map(async (value) => {
        let menuprice = await getMenuId(value.menu_id);
        menuprice = menuprice[0].menu_price;

        const setDataOrder = {
          history_id: historyId,
          menu_id: value.menu_id,
          qty: value.qty,
          created_at: new Date(),
          total_price: menuprice * value.qty,
        };

        let orderResult = await postOrder(setDataOrder);

        const totalPrice = await sumTotal(historyId);

        let tax = totalPrice * 0.1;
        let setUpdateHistory = {
          invoice: Math.floor(Math.random() * 1000000 + 1000000),
          history_subtotal: totalPrice + tax,
        };
        let updateHistory = await patchHistory(setUpdateHistory, historyId);
        let allOrder = await getDataOrder(historyId);
        const pageInfo = {
          allOrder,
          totalPrice,
          tax,
          updateHistory,
        };
        console.log(req.body);
        return helper.response(res, 200, "Success", pageInfo);
      });
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  getOrderThisWeek: async (req, res) => {
    try {
      const result = await totalOrderThisWeek();
      client.setex("getordersweek", 3600, JSON.stringify(result));
      console.log(result);
      return helper.response(res, 200, "Success", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
};
