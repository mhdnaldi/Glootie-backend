const {getMenuItem, getMenuId, postMenu, patchMenu, deleteItem, getMenuCount} = require('../model/menuItems')

const {getCategoryId} = require('../model/category')
const helper = require('../helper/helper')
const qs = require('querystring')

let getPrevPage = (page, currentQuery) => {
  if(page > 1) {
    const generatePage = {
      page: page-1
    }
    const resultPrevLink = {...currentQuery, ...generatePage}
    return (qs.stringify(resultPrevLink))
  } else {
    return null
  }
}

let getNextPage = (page, currentQuery, totalPage) => {
  if(page < totalPage) {
    const generatePage = {
      page: page+1
    }
    const resultNextLink = {...currentQuery, ...generatePage}
    return (qs.stringify(resultNextLink))
  } else {
    return null
  }
}

module.exports = {
  getMenuItem: async(req, res) => {
    let {page, limit} = req.query
    page = parseInt(page)
    limit = parseInt(limit)
    let totalData = await getMenuCount()
    let totalPage = Math.ceil(totalData/limit)
    let offset = page * limit - limit

    let prevPage = getPrevPage(page, req.query)
    let nextPage = getNextPage(page, req.query, totalPage)

    const pageInfo = {
      totalData,
      page,
      limit,
      totalPage,
      prevPage: prevPage && `http://localhost:3000/menu_items?${prevPage}`,
      nextPage: nextPage && `http://localhost:3000/menu_items?${nextPage}`
    }

    try {
      const result = await getMenuItem(limit, offset)
      console.log(result)
      return helper.response(res, 200, 'Data found', result, pageInfo)
      // console.log(pageInfo);
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