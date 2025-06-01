const express = require("express");
const { AddBlog, GetBlogs, DeleteBlog } = require("../controllers/blog");
const uploadMiddleware = require("../middlewares/upload.middleware");

const blogRouter = express.Router();

blogRouter.post("/add/blog", uploadMiddleware, AddBlog);
blogRouter.get("/get/allblogs", GetBlogs);
blogRouter.delete("/blog/delete/:blogId", DeleteBlog);

module.exports = blogRouter;
