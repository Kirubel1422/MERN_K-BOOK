const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedAt: {
    type: String,
    required: true,
  },
  edittedAt: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
