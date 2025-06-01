const BlogModel = require("../db/models/blog.model");
let taskIdCounter = 1;

// For adding the task
exports.AddBlog = async (req, res, next) => {
  console.log("hello AddUser", req.body);
  try {
    let { title, titleUrl, heading, description, keywords, content, status } =
      req.body;

    // for seprating the keywords by ','
    keywords = keywords.split(",");

    // for blog image Url
    const imageUrl = req.file?.path;

    const addTask = await BlogModel.create({
      title,
      titleUrl,
      heading,
      description,
      keywords,
      img: imageUrl,
      content,
      status,
    });

    res.status(201).json({
      status: true,
      message: "Task add Successfully",
      addTask,
    });
  } catch (err) {
    console.log("error At add Tasks: ", err);

    // res.status(500).json({
    //   status: false,
    //   message: "Server Error!!",
    // });

    next(err);
  }
};

// for getting all tasks of the user
exports.GetBlogs = async (req, res, next) => {
  try {
    const GetAllBlogs = await BlogModel.find();

    console.log(GetAllBlogs);
    res.status(200).json({
      status: true,
      message: "Getting All Tasks",
      GetAllBlogs,
    });
  } catch (err) {
    // console.log("error At add Tasks: ", err);

    // res.status(500).json({
    //   status: false,
    //   message: "Server Error!!",
    // });
    next(err);
  }
};

// for updating the task
exports.UpdateTask = async (req, res, next) => {
  console.log("User Info: ", req.user.userId);
  console.log("Update Task, id: ", req.params.taskId);

  try {
    const { title, description, status, dueDate } = req.body;

    const updateTask = await BlogModel.findOneAndUpdate(
      { id: req.params.taskId, userId: req.user.userId },
      {
        title,
        description,
        status,
        dueDate,
      },
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Task updated Successfully",
      updateTask,
    });
  } catch (err) {
    // console.log("error At add Tasks: ", err);

    // res.status(500).json({
    //   status: false,
    //   message: "Server Error!!",
    // });
    next(err);
  }
};

// for deleting the task
exports.DeleteBlog = async (req, res, next) => {
  // console.log("User Info: ", req.user.userId);
  console.log("Delete Task, id: ", req.params.blogId);

  try {
    const deleteTask = await BlogModel.findOneAndDelete({
      _id: req.params.blogId,
      // userId: req.user.userId,
    });

    if (!deleteTask) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Blog deleted Successfully",
      deleteTask,
    });
  } catch (err) {
    // console.log("error At add Tasks: ", err);

    // res.status(500).json({
    //   status: false,
    //   message: "Server Error!!",
    // });
    next(err);
  }
};
