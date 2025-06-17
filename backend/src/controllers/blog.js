const BlogModel = require("../db/models/blog.model");
let taskIdCounter = 1;

exports.AddBlog = async (req, res, next) => {
  // console.log("hello AddUser", req.body);
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

    next(err);
  }
};

exports.GetBlogs = async (req, res, next) => {
  try {
    const GetAllBlogs = await BlogModel.find();

    res.status(200).json({
      status: true,
      message: "Getting All Tasks",
      GetAllBlogs,
    });
  } catch (err) {
    next(err);
  }
};

exports.GetBlogById = async (req, res, next) => {
  try {
    const GetBlogById = await BlogModel.findOne({
      titleUrl: req.params.titleUrl,
    });

    res.status(200).json({
      status: true,
      message: "Getting Blog by BlogID",
      GetBlogById,
    });
  } catch (err) {
    console.log("error At add Tasks: ", err);

    next(err);
  }
};

exports.DeleteBlog = async (req, res, next) => {
  try {
    const deleteTask = await BlogModel.findOneAndDelete({
      titleUrl: req.params.titleUrl,
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
    console.log("error At add Tasks: ", err);

    next(err);
  }
};

exports.UpdateBlog = async (req, res, next) => {
  try {
    let { title, titleUrl, heading, description, keywords, content, status } =
      req.body;

    // for seprating the keywords by ','
    keywords = keywords.split(",");

    // for blog image Url
    const imageUrl = req.file?.path;

    const updateBlog = await BlogModel.findOneAndUpdate(
      {
        titleUrl: req.params.titleUrl,
        //  userId: req.user.userId
      },
      {
        title,
        titleUrl,
        heading,
        description,
        keywords,
        img: imageUrl,
        content,
        status,
      },
      { new: true }
    );

    if (!updateBlog) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Blog updated Successfully",
      updateBlog,
    });
  } catch (err) {
    console.log("error At add Tasks: ", err);

    next(err);
  }
};
