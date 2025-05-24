const UserModel = require("../db/models/user.model");

exports.Register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: false,
      message: "Please provide required information for Register",
    });
  }

  try {
    let UserExist = await UserModel.findOne({ email });
    if (UserExist) {
      return res.status(200).json({
        status: true,
        message: "User already registered",
      });
    }

    const newUser = await UserModel.create({ username, email, password });

    if (newUser) {
      return res.status(201).json({
        status: true,
        message: "User registered successfully",
      });
    }

    res.status(500).json({
      status: false,
      message: "User creation failed, please try again",
    });
  } catch (error) {
    // console.error("Error occurred while registering: ", error);

    // res.status(500).json({
    //   status: false,
    //   message: "Failed to register the user",
    //   error: error.message,
    // });

    next(error);
  }
};

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required for login",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatched = await user.comparePassword(password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    // Generate Token
    const token = user.CreateToken();
    if (!token) {
      return res.status(500).json({
        status: false,
        message: "Failed to generate token",
      });
    }

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "staging",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    return res.status(200).json({
      status: true,
      message: "User login successful",
      token,
    });
  } catch (error) {
    // console.error("Error occurred while log in: ", error);
    // return res.status(500).json({
    //   status: false,
    //   message: "Internal server error",
    //   error: error.message,
    // });

    next(error);
  }
};


