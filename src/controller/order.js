const { getAllOrder, getOrderId, postOrder } = require("../model/order");
const { postHistory, patchHistory } = require("../model/history");
const { getMenuId } = require("../model/menuItems");
const helper = require("../helper/helper");
const order = require("../model/order");

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
      let subTotal = 0 
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
        
        // const orderResult = await postOrder(setDataOrder);
        // console.log(setDataOrder);
  
      });
      
      let tax = subTotal * 0.10
      let setUpdateHistory = {
        invoice: Math.floor(Math.random() * 1000000),
        history_subtotal: subTotal + tax
     }
     console.log(setUpdateHistory);
      // -------------------------------------------
    
      // console.log(setUpdateHistory);
      // let updateHistory = await patchHistory(setUpdateHistory, historyId)
      // console.log(updateHistory)
    } catch (err) {
      // return helper.response(res, 404, 'Bad request', err)
      console.log(err);
    }
  },
};
