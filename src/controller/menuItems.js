const {getMenuItem, getMenuId, postMenu, patchMenu} = require('../model/menuItems')

const {getCategoryId} = require('../model/category')

module.exports = {
  getMenuItem: async(req, res) => {
    try {
      const result = await getMenuItem()
      console.log(result);
      res.send(result)
    } catch(err) {
      console.log(err);
      res.send(err)
    }
  },
  getMenuId: async(req, res) => {
    try {
      const {id} = req.params
      const result = await getMenuId(id)
      if(result.length > 0) {
      console.log(result);
      res.send(result)
      } else {
        console.log(`Data with id:${id} not found!`);
        res.send(`Data with id:${id} not found!`).status(404)
      }
    } catch(err) {
      console.log(err);
    }
  },
  getCategoryId: async(req, res) => {
    try {
      const {id} = req.params
      const result = await getCategoryId(id)
      if(result.length > 0) {
        console.log(result);
      } else {
        console.log(`Data with id:${id} not found!`);
      }
    } catch(err) {
      console.log(err);
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
      console.log(result);
      res.send(result)

    }catch(err) {
      console.log(err);
      res.send(err)
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
        console.log(result);
        res.send(result)
        console.log(`Success edit item with id:${id}`);
        res.send(`Success edit item with id:${id}`).status(201)
      } else {
      console.log(`Data with id:${id} not found!`);
        res.send(`Data with id:${id} not found!`).status(404)
      }
    } catch(err) {
      console.log('Bad request');
      res.send('Bad request').status(404)
    }
  }
}