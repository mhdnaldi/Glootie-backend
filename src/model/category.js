const connection = require('../config/mysql')

module.exports = {
  getCategoryItem: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM category`, (err, data) => {
        !err ? resolve(data):reject(new Error(err))
      })
    })
  },
  getCategoryId: (id) => {
    return new Promise ((resolve, reject) => {
      connection.query(`SELECT * FROM category WHERE category_id = ${id}`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err))
      })
    })
  }
}