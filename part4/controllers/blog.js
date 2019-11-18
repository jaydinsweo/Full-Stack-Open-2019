const Router = require("express").Router();
const Blog = require("../models/blog");

Router.get("/", (req, res, next) => {
  Blog.find({}).then(blogs => {
    res.json(blogs.map(blog => blog.toJSON()));
  });
});

Router.post("/", (req, res, next) => {
  const blog = new Blog(req.body);

  blog.save().then(result => res.status(201).json(result));
});

module.exports = Router;
