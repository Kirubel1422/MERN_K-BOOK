const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const createToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
};

const signupController = async (req, res) => {
  const registeredAt = new Date().toISOString();
  const { username, email, password } = req.body;
  try {
    const user = await userModel.signup(
      username,
      email,
      password,
      registeredAt
    );
    const token = createToken(user._id);
    res.json({ email, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.json({ email, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { signupController, loginController };
