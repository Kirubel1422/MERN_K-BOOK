const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: `Authorization is required` });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, secret);

    const userId = await userModel
      .findOne({ _id: id })
      .select("_id")
      .toString()
      .split("'")[1];
    req.body["userId"] = userId;

    next();
  } catch (error) {
    res.status(403).json({ error: `Authorization is invalid` });
  }
};

module.exports = authorization;
