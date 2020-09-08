const router = require("express").Router();
const {
  getCategoryItem,
  getCategoryId,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");

const {
  getCategoryItemRedis,
  getCategoryIdRedis,
  clearDataRedis,
} = require("../Middleware/redis");

router.get("/", getCategoryItemRedis, getCategoryItem);
router.get("/:id", getCategoryIdRedis, getCategoryId);
router.post("/", postCategory);
router.patch("/:id", clearDataRedis, patchCategory);
router.delete("/:id", clearDataRedis, deleteCategory);

module.exports = router;
