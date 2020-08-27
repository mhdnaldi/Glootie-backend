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
  getWeekHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE YEARWEEK(created_at) = YEARWEEK(NOW())`,
        (err, data) => {
          !err ? resolve(data) : reject(err);
        }
      );
    });
  },
};
