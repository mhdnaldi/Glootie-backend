const bcrypt = require("bcrypt");
const helper = require("../helper/helper");
const jwt = require("jsonwebtoken");
const { registerUser, getAllUser, loginUser } = require("../model/users");

module.exports = {
  registerUser: async (req, res) => {
    const { user_email, user_password, user_name } = req.body;

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
    try {
      //  KONDISI JIKA EMAIL SAMA
      const getUserEmail = await getAllUser();
      const getEmail = getUserEmail.map((value) => value.user_email);
      if (getEmail.includes(user_email)) {
        return helper.response(res, 404, "This email was already registered");
      } else {
        const result = await registerUser(setData);
        return helper.response(res, 200, "Register success", result);
      }
    } catch (err) {
      console.log(err);
      return helper.response(res, 404, "Bad request", err);
    }
  },
  loginUser: async (req, res) => {
    const { user_email, user_name, user_password } = req.body;
    const checkDataUser = await loginUser(user_email);
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
        // if(user_status === 0) {
        //   return helper.response(res, 400, "User not active!");
        // } else {

        // }
        let payload = {
          user_id,
          user_email,
          user_name,
          user_role,
          user_status,
        };
        const token = jwt.sign(payload, "password", { expiresIn: "24h" });
        payload = { ...payload, token };
        return helper.response(res, 200, "Login Succes!", payload);
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
    try {
    } catch (error) {
      return helper.response(res, 404, "Bad request", err);
    }
  },
};
