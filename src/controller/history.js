const {getAllHistory, getHistoryId, postHistory} = require('../model/history')
const helper = require('../helper/helper')

module.exports = {
  getAllHistory: async(req, res) => {
    try {
      const result = await getAllHistory()
      return helper.response(res, 201, 'Data found', result)
    } catch(err) {
      return helper.response(res, 404, 'Bad request', err)
    }
  },
  getHistoryId: async(req, res) => {
    try {
      const {id} = req.params
      const result = await getHistoryId(id)
      if(result.length>0) {
        return helper.response(res,201, `Data with id:${id} found`, result)
      } else {
        return helper.response(res,201, `Data with id:${id} not found`, result)
      }
    } catch(err) {
      return helper.response(res,404, 'Bad Request', err)
    }
  },
  postHistory: async(req, res) => {
    try {
      const {invoice, history_subtotal} = req.body
      const setData = {
        invoice,
        history_subtotal,
        created_at: new Date()
      }
      const result = await postHistory(setData)
      return helper.response(res, 201, 'Success add new data', result)

    } catch(err) {
      return helper.response(res, 404, 'Bad request', err)
    }
  }
}