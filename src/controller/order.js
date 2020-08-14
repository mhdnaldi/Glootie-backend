const {
  getAllOrder,
  getOrderId,
  postOrder,
  patchOrder,
} = require("../model/order");
const { getHistoryId, postHistory } = require("../model/history");
const { getMenuId } = require("../model/menuItems");
const helper = require("../helper/helper");

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
      return helper.response(res, 404, "Bad request", err);
    }
  },
  getMenuId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getMenuId(id);
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
  // postOrder: async (req, res) => {
  //   const { history_id, menu_id, qty, ppn, total_price } = req.body;
  //   const { history_subtotal} = req.body
  //   try {
  //     const setData = {
       
  //     }

  //     const setDataHistory= {
  //       invoice: Math.ceil(Math.random() * 1000000),
  //       history_subtotal
  //     }
  //     const resultHistory = await postHistory(setDataHistory)
  //     const result = await postOrder(setData);
  //     console.log(result);
  //     // const history = await postHistory(setData.setDataHistory);
  //     helper.response(res, 201, "Success add new data", result);
  //     helper.response(res, 201, "Success add new data", history);
  //   } catch (err) {
  //     return helper.response(res, 404, "Bad request", err);
  //   }
  // },
};
