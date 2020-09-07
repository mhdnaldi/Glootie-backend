const router = require("express").Router();
const {
  registerUser,
  loginUser,
  statusSetting,
  getUser,
  getUserByid,
} = require("../controller/users");

const { authorizationAdmin } = require("../Middleware/auth");

router.get("/", authorizationAdmin, getUser);
router.get("/login", loginUser);
router.post("/register", registerUser);
router.get("/:id", authorizationAdmin, getUserByid);
router.patch("/:id", authorizationAdmin, statusSetting);
module.exports = router;
