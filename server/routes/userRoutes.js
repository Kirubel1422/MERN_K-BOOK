const {
  signupController,
  loginController,
} = require("../controllers/userControllers");
const router = require("express").Router();

router.post("/signup", signupController);
router.post("/login", loginController);

module.exports = router;
