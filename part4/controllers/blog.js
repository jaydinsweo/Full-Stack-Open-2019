const Router = require("express").Router();
const Blog = require("../models/blog");
/**
Router.get("/", (req, res, next) => {
  Blog.find({}).then(blogs => {
    console.log(blogs);
    res.json(blogs.map(blog => blog.toJSON()));
  });
});
 */

Router.get("/", async (req, res, next) => {
  const blogs = await Blog.find({});
  res.json(blogs.map(blog => blog.toJSON()));
});

Router.post("/", async (req, res, next) => {
  const blog = new Blog(req.body);

  await blog.save();
  res.status(201).json(blog.save());
});

module.exports = Router;
