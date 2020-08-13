const connection = require('../config/mysql')

module.exports = {
  getAllOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM order`, (err, data) => {
        !err ? resolve(data):reject(new Error(err))
        console.log(err);
      })
    })
  },
  getOrderId: (id) => {
    return new Promise ((resolve, reject) => {
      connection.query(`SELECT * FROM order WHERE order_id = ${id}`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err))
      })
    })
  },
  postOrder: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO order SET ?`, setData, (err, data) => {
        if(!err) {
          const newResult = {
            order_id: data.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  patchOrder: (setData, id) => {
    return new Promise ((resolve, reject) => {
      connection.query(`UPDATE order SET ? WHERE order_id = ? `, [setData, id], (err, data) => {
        if(!err) {
          const newResult = {
            id: id,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}