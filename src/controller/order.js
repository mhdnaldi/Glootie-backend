const {getAllOrder, getOrderId, postOrder, patchOrder} = require('../model/order')
const {getHistoryId, postHistory} = require('../model/history')
const {getMenuId} = require('../model/menuItems')
const helper = require('../helper/helper')

module.exports = {
  getAllOrder: async(req, res) => {
    try {
      const result = await getAllOrder()
      return helper.response(res, 201, 'Data found', result)
    }catch(err) {
      return helper.response(res, 404, 'Bad request', err)
    }
  },
  getOrderId: async(req, res) => {
    try {
      const {id} = req.params
      const result = await getOrderId(id)
      if(result.length > 0) {
        return helper.response(res, 201, `Data with id:${id} found`, result)
      } else {
        return helper.response(res, 201, `Data with id:${id} not found`, result)
      }
    }catch(err) {
      return helper.response(res, 404, 'Bad request', err)
    }
  },
   getHistoryId: async(req, res) => {
    try {
      const {id} = req.params
      const result = await getHistoryId(id)
      if(result.length > 0) {
        return helper.response(res, 201, `Data with id:${id} found`, result)
      } else {
        return helper.response(res, 201, `Data with id:${id} not found`, result)
      }
    }catch(err) {
      return helper.response(res, 404, 'Bad request', err)
    }
  },
  getMenuId: async(req, res) => {
    try {
      const {id} = req.params
      const result = await getMenuId(id)
      if(result.length > 0) {
        return helper.response(res, 201, `Data with id:${id} found`, result)
      } else {
        return helper.response(res, 201, `Data with id:${id} not found`, result)
      }
    }catch(err) {
      return helper.response(res, 404, 'Bad request', err)
    }
  },
  // postOrder: async(req, res) => {
  //   try {
  //     const {history_id, menu_id, qty, ppn, total_price} = req.body
  //     const setData = {
  //       history_id,
  //       menu_id,
  //       qty,
  //       ppn,
  //       total_price,
  //       setDataHistory: {
  //         invoice: Math.round(Math.random() * 100000),
  //         history_subtotal: this.qty - (this.ppn/100) * this.total_price,
  //         created_at: new Date()
  //       }
  //     }
     
  //     const result = await postOrder(setData)
  //     const history = await postHistory(setData.setDataHistory)
  //     helper.response (res, 201, 'Success add new data', result)
  //     helper.response (res, 201, 'Success add new data', history)
  //   } catch(err) {
  //     return helper.response(res, 404, 'Bad request', err)
  //   }
  // }
}