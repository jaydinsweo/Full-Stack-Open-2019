const express = require("express");
const bodyPaser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blog");

const app = express();

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to mongoDB"))
  .catch(err => console.log("error connection to mongoDB: ", err.message));

app.use(cors());
app.use(express.static("build")); // use build folder - front end
app.use(bodyPaser.json());
app.use("/api/blog", blogRouter);

module.exports = app;
