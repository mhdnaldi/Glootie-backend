// MULTER
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, //max size 1mb
  },
}).single("menu_image");
// ----- MULTER -----

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

// AUTH
const { authorizationAll, authorizationAdmin } = require("../Middleware/auth");

router.get("/", authorizationAll, getMenuItemRedis, getMenuItem);
router.get("/search", authorizationAll, getItemByNameRedis, getItemByName);
router.get("/:id", authorizationAll, getMenuIdRedis, getMenuId);
router.post("/", authorizationAdmin, upload, postMenu);
router.patch("/:id", authorizationAdmin, upload, clearDataRedis, patchMenu);
router.delete("/:id", authorizationAdmin, clearDataRedis, deleteItem);

module.exports = router;
