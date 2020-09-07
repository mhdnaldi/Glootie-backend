const uploadImage = require("../Middleware/multer");

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

const { authorizationAll, authorizationAdmin } = require("../Middleware/auth");

router.get("/", authorizationAll, getMenuItemRedis, getMenuItem);
router.get("/search", authorizationAll, getItemByNameRedis, getItemByName);
router.get("/:id", authorizationAll, getMenuIdRedis, getMenuId);
router.post("/", authorizationAdmin, uploadImage, postMenu);
router.patch(
  "/:id",
  authorizationAdmin,
  uploadImage,
  clearDataRedis,
  patchMenu
);
router.delete("/:id", authorizationAdmin, clearDataRedis, deleteItem);

module.exports = router;
