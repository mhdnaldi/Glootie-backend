const bcrypt = require("bcrypt");
const helper = require("../helper/helper");
const jwt = require("jsonwebtoken");
const {
  registerUser,
  getAllUser,
  loginUser,
  getUserId,
  patchUser,
} = require("../model/users");
const { getCategoryId } = require("./category");
const { patchCategory } = require("../model/category");

module.exports = {
  getUser: async (req, res) => {
    try {
      const result = await getAllUser();
      return helper.response(res, 200, "Data found", result);
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  getUserByid: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await getUserId(id);
      if (result.length > 0) {
        return helper.response(res, 200, `Data with id:${id}, found`, result);
      } else {
        return helper.response(res, 404, `Data with id:${id}, not found`);
      }
    } catch (err) {
      return helper.response(res, 400, "Bad request", err);
    }
  },
  registerUser: async (req, res) => {
    const { user_email, user_password, user_name } = req.body;

    try {
      // KONDISI PASSWORD => 8
      if (user_password.length < 8) {
        return helper.response(res, 404, "Password length minimum 8 word");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user_password, salt); //encrypt password

        const setData = {
          user_email,
          user_password: hash,
          user_name,
          user_role: 2,
          user_status: 0,
          updated_at: new Date(),
        };
        //  KONDISI JIKA EMAIL SAMA
        const getUserEmail = await getAllUser();
        const getEmail = getUserEmail.map((value) => value.user_email);
        if (getEmail.includes(user_email)) {
          return helper.response(res, 404, "This email was already registered");
        } else {
          const result = await registerUser(setData);
          return helper.response(res, 200, "Register success", result);
        }
      }
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  loginUser: async (req, res) => {
    const { user_email, user_name, user_password } = req.body;
    const checkDataUser = await loginUser(user_email);
    try {
      if (checkDataUser.length >= 1) {
        // PROSES COMPARING PASSWORD
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        );
        if (checkPassword) {
          // PROSES SET JWT
          const {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          } = checkDataUser[0];
          // KONDISI JIKA STATUS 0
          if (user_status === 0) {
            return helper.response(res, 400, "This user is not active!");
          } else {
            let payload = {
              user_id,
              user_email,
              user_name,
              user_role,
              user_status,
            };
            const token = jwt.sign(payload, process.env.JWT_KEY, {
              expiresIn: "24h",
            });
            payload = { ...payload, token };
            return helper.response(res, 200, "Login Succes!", payload);
          }
        } else {
          return helper.response(res, 400, "Wrong password!");
        }
      } else {
        return helper.response(
          res,
          400,
          "Email is not registered, please sign up first"
        );
      }
    } catch (error) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
  statusSetting: async (req, res) => {
    const { id } = req.params;
    const {
      user_email,
      user_name,
      user_password,
      user_role,
      user_status,
    } = req.body;

    try {
      if (user_password.length < 8) {
        return helper.response(res, 404, "Password length minimum 8 word");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user_password, salt); //encrypt password
        const setData = {
          user_email,
          user_name,
          user_password: hash,
          user_role,
          user_status,
        };
        const checkId = await getUserId(id);
        if (checkId.length > 0) {
          const result = await patchUser(setData, id);
          return helper.response(
            res,
            200,
            `Data with id:${id}, has changed`,
            result
          );
        } else {
          return helper.response(res, 404, `Data with id:${id}, not found`);
        }
      }
    } catch (err) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
};
