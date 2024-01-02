const {
  getController,
  postController,
  updateController,
  deleteController,
  getAllController,
} = require("../controllers/postControllers");
const authorization = require("./../middlewares/authorization");
const router = require("express").Router();

router.use(authorization);
router.get("/", getController);
router.get("/all", getAllController);
router.post("/", postController);
router.put("/:id", updateController);
router.delete("/:id", deleteController);

module.exports = router;
