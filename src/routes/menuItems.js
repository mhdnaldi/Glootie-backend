const router = require("express").Router();
const {
  getMenuItem,
  getMenuId,
  postMenu,
  patchMenu,
  deleteItem,
  getItemByName,
} = require("../controller/menuItems");
const {
  getMenuItemRedis,
  getItemByNameRedis,
  getMenuIdRedis,
  clearDataRedis,
} = require("../Middleware/redis");
// data menu_items
router.get("/", getMenuItemRedis, getMenuItem);
// id menu_items
router.get("/search", getItemByNameRedis, getItemByName);
router.get("/:id", getMenuIdRedis, getMenuId);

router.post("/", postMenu);

router.patch("/:id", clearDataRedis, patchMenu);

router.delete("/:id", deleteItem);

module.exports = router;
