const connection = require("../config/mysql");

module.exports = {
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM user`, (err, data) => {
        !err ? resolve(data) : reject(new Error(err));
      });
    });
  },
  registerUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", setData, (err, data) => {
        if (!err) {
          const newResult = {
            user_id: data.insertId,
            ...setData,
          };
          delete newResult.user_password;
          resolve(newResult);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  loginUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT user_id, user_email, user_password, user_name, user_role, user_status FROM user WHERE user_email = ?`,
        email,
        (err, data) => {
          !err ? resolve(data) : reject(new Error(err));
        }
      );
    });
  },
};
