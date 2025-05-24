const BlogModel = require("../db/models/blog.model");
let taskIdCounter = 1;

// For adding the task
exports.AddTask = async (req, res, next) => {
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
exports.GetTasks = async (req, res, next) => {
  // console.log("hello GetUser", req.user);
  try {
    const findQuery = { userId: req.user.userId };

    // Pagination and filtering logic
    const { status, page = 1, limit = 10 } = req.query;

    if (status) {
      findQuery.status = status;
    }
    const GetAllTask = await BlogModel.find(findQuery)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ dueDate: 1 });

    // // Add reminder info
    // const now = new Date();
    // const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // const ReminderTask = GetAllTask.map(task => {
    //   const isDueSoon = task.dueDate <= next24Hours && task.dueDate >= now;
    //   return { ...task.toObject(), isDueSoon };
    // });

    console.log(GetAllTask);
    res.status(200).json({
      status: true,
      message: "Getting All Tasks",
      totalPages: Math.ceil(GetAllTask.length / limit),
      page,
      // ReminderTask,
      GetAllTask,
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
exports.DeleteTask = async (req, res, next) => {
  console.log("User Info: ", req.user.userId);
  console.log("Delete Task, id: ", req.params.taskId);

  try {
    const deleteTask = await BlogModel.findOneAndDelete({
      id: req.params.taskId,
      userId: req.user.userId,
    });

    if (!deleteTask) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Task deleted Successfully",
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
