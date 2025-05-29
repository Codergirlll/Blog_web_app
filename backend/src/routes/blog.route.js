const express = require("express");
const { AddBlog, GetBlogs } = require("../controllers/blog");
const uploadMiddleware = require("../middlewares/upload.middleware");

const blogRouter = express.Router();

blogRouter.post("/add/blog", uploadMiddleware, AddBlog);
blogRouter.get("/get/allblogs", GetBlogs);

module.exports = blogRouter;
