const router = require("express").Router();
const {
  getAllHistory,
  getHistoryId,
  postHistory,
  weekHistory,
} = require("../controller/history");
const { postOrder } = require("../controller/order");

router.get("/", getAllHistory);

router.get("/week", weekHistory);

router.get("/:id", getHistoryId);

router.post("/", postHistory);

router.patch("/:id", postOrder);

module.exports = router;
