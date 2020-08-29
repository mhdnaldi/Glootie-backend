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

router.get("/", getAllHistory);

router.get("/chart", chartKick);

router.get("/total-today", getTotalToday);

router.get("/total-yearly", getTotalThisYear);

router.get("/recent-orders", getRecentOrders);

router.get("/:id", getHistoryId);

router.post("/", postHistory);

router.patch("/:id", postOrder);

module.exports = router;
