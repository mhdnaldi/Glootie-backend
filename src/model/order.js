const connection = require('../config/mysql')

module.exports = {
  getAllOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM orders`, (err, data) => {
        !err ? resolve(data):reject(new Error(err))
        console.log(err);
      })
    })
  },
  getOrderId: (id) => {
    return new Promise ((resolve, reject) => {
      connection.query(`SELECT * FROM orders WHERE order_id = ${id}`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err))
      })
    })
  },
  postOrder: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO orders SET ?`, setData, (err, data) => {
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
      connection.query(`UPDATE orders SET ? WHERE order_id = ? `, [setData, id], (err, data) => {
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