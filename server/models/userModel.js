const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (
  name,
  email,
  password,
  registeredAt
) {
  if (!name || !email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Weak Password");
  }
  let sa_name = validator.trim(name);
  const username = validator.escape(sa_name);
  const sa_email = validator.trim(email);

  const exists = await this.findOne({ email: sa_email });
  if (exists) {
    throw Error("Email is already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return this.create({
    username,
    email,
    password: hashedPassword,
    registeredAt,
  });
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid credentials.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid credentials.");
  }
  return user;
};
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
