const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initBlog = [
  {
    title: "Hello",
    author: "Exasmple",
    url: "this is example.com",
    like: 4
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initBlog[0]);
  await blogObject.save();
});

it("has 1 blog in the database", async () => {
  const respone = await api.get("/api/blog");
  expect(respone.body.length).toBe(initBlog.length);
});

it("return a specific blog in the database", async () => {
  const respone = await api.get("/api/blog");
  const content = respone.body.map(blog => blog.title);
  expect(content).toContain("Hello");
});
