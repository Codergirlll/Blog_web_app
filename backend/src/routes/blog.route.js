const express = require("express");
const {
  AddBlog,
  GetBlogs,
  DeleteBlog,
  UpdateBlog,
  GetBlogById,
} = require("../controllers/blog");
const uploadMiddleware = require("../middlewares/upload.middleware");

const blogRouter = express.Router();

blogRouter.post("/add/blog", uploadMiddleware, AddBlog);
blogRouter.get("/get/allblogs", GetBlogs);
blogRouter.get("/get/blog/:titleUrl", GetBlogById);
blogRouter.delete("/blog/delete/:titleUrl", DeleteBlog);
blogRouter.put("/blog/update/:titleUrl", uploadMiddleware, UpdateBlog);

module.exports = blogRouter;
