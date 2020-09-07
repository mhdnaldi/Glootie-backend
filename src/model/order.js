const connection = require("../config/mysql");

module.exports = {
  getAllOrder: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM orders`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
        console.log(err);
      });
    });
  },
  getOrderId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders WHERE order_id = ${id}`,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
  postOrder: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO orders SET ?`, setData, (err, data) => {
        if (!err) {
          const newResult = {
            order_id: data.insertId,
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  sumTotal: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(total_price) as total FROM orders WHERE history_id = ?`,
        id,
        (err, data) => {
          !err ? resolve(data[0].total) : reject(new Error(err));
        }
      );
    });
  },
  getDataOrder: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders WHERE history_id = ?`,
        id,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
  totalOrderThisWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT count(order_id) as total FROM orders WHERE YEARWEEK(created_at) = YEARWEEK(NOW())`,
        (err, data) => {
          !err ? resolve(data[0].total) : reject(new Error(err));
        }
      );
    });
  },
};
