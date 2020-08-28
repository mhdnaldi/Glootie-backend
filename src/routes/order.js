const router = require("express").Router();
const {
  getAllOrder,
  getOrderId,
  postOrder,
  getOrderThisWeek,
} = require("../controller/order");

router.get("/", getAllOrder);

router.get("/this-week-order", getOrderThisWeek);

router.get("/:id", getOrderId);

router.post("/", postOrder);

module.exports = router;
