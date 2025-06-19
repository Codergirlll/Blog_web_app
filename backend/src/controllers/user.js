const { EMAIL, PASSWORD, JWT_SECRET, NODE_ENV } = process.env;
const jwt = require("jsonwebtoken");

// Utility to create JWT token
const createToken = (email) =>
  jwt.sign({ email }, JWT_SECRET, { expiresIn: "10h" });

// Utility to set auth cookie
const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: false,
    secure: NODE_ENV === "staging",
    sameSite: "Strict",
    maxAge: 10 * 60 * 60 * 1000, // 10 hours
  });
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

    if (email !== EMAIL || password !== PASSWORD) {
      return res.status(401).json({
        status: false,
        message: "Invalid login credentials",
      });
    }

    const token = createToken(email);
    setAuthCookie(res, token);

    return res.status(200).json({
      status: true,
      message: "User login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: false, // same as used during login
      secure: NODE_ENV === "staging",
      sameSite: "Strict", // match the login cookie settings
    });

    return res.status(200).json({
      status: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong during logout",
    });
  }
};
