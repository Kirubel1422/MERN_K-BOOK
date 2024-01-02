const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const getController = async (req, res) => {
  const { userId } = req.body;
  try {
    const posts = await postModel.find({ userId }).sort({ edittedAt: -1 });
    res.json({ posts: posts });
  } catch (error) {
    res.status(400).json({ error: "Cannot get posts." });
  }
};

const getAllController = async (req, res) => {
  try {
    const contents = await postModel
      .find({})
      .sort({ edittedAt: -1 })
      .select("-_id content");

    const postDates = await postModel
      .find({})
      .sort({ edittedAt: -1 })
      .select("-_id edittedAt");

    const dates = postDates.map((date) => {
      return date.edittedAt;
    });

    let posts = contents.map((post) => {
      return post.content;
    });
    const ids = await postModel
      .find({})
      .sort({ edittedAt: -1 })
      .select("userId");
    const idsArr = Array();

    ids.forEach((id) => {
      idsArr.push(id.userId.toString());
    });

    let usernames = idsArr.map(async (id) => {
      const username = await userModel
        .find({ _id: id })
        .select("-_id username");
      return username;
    });

    usernames = await Promise.all(usernames);
    const usernamesArr = Array();
    usernames.forEach((username) => {
      usernamesArr.push(username[0].username);
    });

    res.json({
      usernames: usernamesArr,
      contents: posts,
      dates: dates,
    });
  } catch (error) {
    console.error(error);
  }
};
const postController = async (req, res) => {
  const request = req.body;
  try {
    request["postedAt"] = new Date().toISOString();
    request["edittedAt"] = new Date().toISOString();
    await postModel.create(request);
    res.json({ status: `Posted` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: `Posting error` });
  }
};

const updateController = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  const edittedAt = new Date().toISOString();
  try {
    await postModel.findOneAndUpdate(
      { _id: id },
      { $set: { content: content, edittedAt: edittedAt } }
    );
    res.json({ status: `Editted` });
  } catch (error) {
    res.status(401).json({ error: `Post not found` });
  }
};

const deleteController = async (req, res) => {
  const id = req.params.id;
  try {
    await postModel.findOneAndDelete({ _id: id });
    res.json({ status: `Post Deleted` });
  } catch (error) {
    res.status(401).json({ error: `Post not found` });
  }
};

module.exports = {
  getController,
  postController,
  updateController,
  deleteController,
  getAllController,
};
