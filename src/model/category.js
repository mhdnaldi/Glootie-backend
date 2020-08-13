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
  },
  postCategory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO category SET ?`, setData, (err, data) => {
        if(!err) {
          const newResult = {
            category_id: data.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  patchCategory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE category SET ? WHERE category_id = ?`,[setData, id], (err, data) => {
        if(!err) {
          const newResult = {
            category_id: id,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteCategory: (id) => {
    return new Promise ((resolve, reject) => {
      connection.query(`DELETE FROM category WHERE category_id = ?`, id, (err, data) => {
        if(!err) {
          const newResult = {
            category_id : id
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}