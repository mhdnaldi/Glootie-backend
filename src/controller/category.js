const {getCategoryItem, getCategoryId} = require('../model/category')

module.exports = {
  getCategoryItem: async(req, res) => {
    try {
      const result = await getCategoryItem()
      console.log(result);
      res.send(result)
    } catch(err) {
      console.log(err);
      res.send(err)
    }
  },
  getCategoryId: async(req, res) => {
    try {
      const {id} = req.params
      const result = await getCategoryId(id)
      if(result.length > 0) {
        console.log(result);
        res.send(result)
      } else {
        console.log(`Category with id:${id} not found!`);
        res.send(`Category with id:${id} not found!`)
      }
    } catch(err) {
      console.log(err);
    }
  }
}