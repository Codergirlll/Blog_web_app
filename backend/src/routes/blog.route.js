const express = require("express");
const { Auth } = require("../middlewares/auth");
const {
  AddTask,
  GetTasks,
  UpdateTask,
  DeleteTask,
} = require("../controllers/task");
const uploadMiddleware = require("../middlewares/upload.middleware");

const blogRouter = express.Router();

// blogRouter.post("/add/task", Auth, AddTask);
blogRouter.post("/add/task", uploadMiddleware, AddTask);
// blogRouter.get("/get/task", Auth, GetTasks);
// blogRouter.put("/update/task/:taskId", Auth, UpdateTask);
// blogRouter.delete("/delete/task/:taskId", Auth, DeleteTask);

module.exports = blogRouter;
