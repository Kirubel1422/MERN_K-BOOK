require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const app = express();
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.error(error);
  }
};

connect();
const postRoute = require("./routes/postRoutes");
const userRoute = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postRoute);
app.use("/account", userRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
