const router = require("express").Router();
const {
  getAllHistory,
  getHistoryId,
  postHistory,
  getTotalToday,
  getTotalThisYear,
  getRecentOrders,
  chartKick,
} = require("../controller/history");
const { postOrder } = require("../controller/order");
// redis
const {
  getAllHistoryRedis,
  getHistoryIdRedis,
  getTodayTotalRedis,
  getTotalThisYearRedis,
  clearDataRedis,
  getRecentOrdersRedis,
  chartKickRedis,
} = require("../Middleware/redis");

router.get("/", getAllHistoryRedis, getHistoryIdRedis, getTodayTotalRedis);

router.get("/chart", chartKickRedis, chartKick);

router.get("/total-today", getTodayTotalRedis, getTotalToday);

router.get("/total-yearly", getTotalThisYearRedis, getTotalThisYear);

router.get("/recent-orders", getRecentOrdersRedis, getRecentOrders);

router.get("/:id", getHistoryIdRedis, getHistoryId);

router.post("/", postHistory);

router.patch("/:id", clearDataRedis, postOrder);

module.exports = router;
