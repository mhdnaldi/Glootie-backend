const {getMenuItem, getMenuId, postMenu, patchMenu, deleteItem} = require('../model/menuItems')

const {getCategoryId} = require('../model/category')
const helper = require('../helper/helper')


module.exports = {
  getMenuItem: async(req, res) => {
    try {
      const result = await getMenuItem()
      return helper.response(res, 201, 'Data found', result)
    } catch(err) {
  
      return helper.response(res, 404, 'Bad Request', err)
    }
  },
  getMenuId: async(req, res) => {
    try {
      const {id} = req.params
      const result = await getMenuId(id)
      if(result.length > 0) {
        return helper.response(res, 201, 'Data found', result)
      } else {
        return helper.response(res, 404, `Data with id:${id} not found!`)
      }
    } catch(err) {
      
      return helper.response(res, 404, 'Bad Request', err)
    }
  },
  getCategoryId: async(req, res) => {
    try {
      const {id} = req.params
      const result = await getCategoryId(id)
      if(result.length > 0) {
        return helper.response(res, 201, 'Data found', result)
      } else {
        return helper.response(res, 404, `Data with id:${id} not found!`)
      }
    } catch(err) {
      return helper.response(res, 404, 'Bad Request', err)
    }
  },
  postMenu: async(req, res) => {
    try {
      const{ category_id, menu_name, menu_price, menu_status} = req.body
      const setData = {
        category_id,
        menu_name,
        menu_price,
        created_at: new Date(),
        menu_status
      }
      const result = await postMenu(setData)
      return helper.response(res, 200, 'success add product', result)

    }catch(err) {
      return helper.response(res, 404, 'Bad request', err)
    }
  },
  patchMenu: async(req, res) => {
    try {
      const { category_id, menu_name, menu_price, menu_status} = req.body
      const {id} = req.params
      const setData = {
        category_id,
        menu_name,
        menu_price,
        updated_at: new Date(),
        menu_status
      }
      const checkId = await getMenuId(id)
      if(checkId.length > 0) {
        const result = await patchMenu(setData, id)
        return helper.response(res, 200, 'success edit product', result)   
      } else {
      return helper.response(res, 404, 'Data not found')
      }
    } catch(err) {
      return helper.response(res, 404, 'Bad Request', err)
    }
  },
  deleteItem : async(req, res) => {
    const {id} = req.params
    try {
      const result = await deleteItem(id)
      return helper.response(res, 201, 'Item deleted', result)
    }catch(err) {
      return helper.response(res, 404, 'Bad request', err)
    }
  }
}