const connection = require("../config/mysql");

module.exports = {
  getAllHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM history`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  getHistoryId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE history_id = ${id}`,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
  postHistory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO history SET ?`, setData, (err, data) => {
        if (!err) {
          const newResult = {
            history_id: data.insertId,
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  patchHistory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE history SET ? WHERE history_id = ?`,
        [setData, id],
        (err, data) => {
          if (!err) {
            const newResult = {
              history_id: id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getDataOrder: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders JOIN menu_items ON orders.menu_id = menu_items.menu_id WHERE history_id = ?`,
        id,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
  // ------------------------------------ CARD TODAYS INCOME
  getTodayTotal: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT sum(history_subtotal) as total FROM history WHERE DAY(created_at) = DAY(NOW())",
        (err, data) => {
          !err ? resolve(data[0].total) : reject(new Error(err));
        }
      );
    });
  },
  getYearlyIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT sum(history_subtotal) as total FROM history WHERE YEAR(created_at) = YEAR(NOW())`,
        (err, data) => {
          !err ? resolve(data[0].total) : reject(new Error(err));
        }
      );
    });
  },
  recentOrders: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE DAY(created_at) = DAY(NOW())`,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
  chart: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DATE(created_at) as date, SUM(history_subtotal) as total FROM history WHERE MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW()) GROUP BY DATE(created_at)`,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
};
