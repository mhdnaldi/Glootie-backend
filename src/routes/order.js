const router = require("express").Router();
const {
  getAllOrder,
  getOrderId,
  postOrder,
  getOrderThisWeek,
} = require("../controller/order");

// redis
const {
  getAllOrderRedis,
  getOrderIdRedist,
  getOrderThisWeekRedist,
} = require("../Middleware/redis");

router.get("/", getAllOrderRedis, getAllOrder);

router.get("/this-week-order", getOrderThisWeekRedist, getOrderThisWeek);

router.get("/:id", getOrderIdRedist, getOrderId);

router.post("/", postOrder);

module.exports = router;
