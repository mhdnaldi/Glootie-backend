const {
  getAllOrder,
  getOrderId,
  postOrder,
  sumTotal,
  getDataOrder
} = require("../model/order");
const { postHistory, patchHistory } = require("../model/history");
const { getMenuId } = require("../model/menuItems");
const helper = require("../helper/helper");
const order = require("../model/order");
const { response } = require("../helper/helper");

module.exports = {
  getAllOrder: async (req, res) => {
    try {
      const result = await getAllOrder();
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
      let orders = req.body.orders;
      let newOrders = orders.map(async (value) => {
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

        let tax = totalPrice * 0.10;
        let setUpdateHistory = {
          invoice: Math.floor(Math.random() * 1000000 + 1000000),
          history_subtotal: totalPrice + tax,
        };
        let updateHistory = await patchHistory(setUpdateHistory, historyId);
        let data = await getDataOrder(historyId)
        const pageInfo = {
          data,
          totalPrice,
          tax,
          updateHistory
        }
        return helper.response(res, 200, "Success", pageInfo);
      });
    } catch (err) {
      return helper.response(res, 404, 'Bad request', err)
    }
  },
};
