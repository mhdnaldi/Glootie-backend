const connection = require('../config/mysql')

module.exports = {
  getMenuItem: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM menu_items LIMIT ? OFFSET ?`,[limit,offset], (err, data) => {
        !err ? resolve(data) :reject(new Error (err))
      })
    })
  },
  getMenuCount : () => {
    return new Promise((resolve,reject) => {
      connection.query(`SELECT COUNT(*) as total FROM menu_items`, (err, data) => {
        !err ? resolve(data[0].total) : reject(new Error(err))
      })
    })
  },
  // PAGINATION --------------------------------
  getMenuId : (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM menu_items WHERE menu_id = ${id}`, (err,data) => {
        !err ? resolve(data) : reject(new Error(err))
      })
    })
  },
  postMenu: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO menu_items SET ?`, setData, (err, data) => {
        if(!err) {
          const newResult = {
            product_id : data.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  patchMenu :(setData, id) => {
    return new Promise ((resolve, reject) => {
      connection.query(`UPDATE menu_items SET ? WHERE menu_id = ?`, [setData, id], (err, data) => {
        if(!err) {
          const newResult = {
            menu_id: id,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
  })
  },
  deleteItem :(id) => {
    return new Promise((resolve, reject) => {
      connection.query(`DELETE FROM menu_items WHERE menu_id = ?`, id, (err, data) => {
        if(!err) {
          const newResult = {
            id: id
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}