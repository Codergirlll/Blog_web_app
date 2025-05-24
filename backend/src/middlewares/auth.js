const jwt = require("jsonwebtoken");

exports.Auth = async (req, res, next) => {
  try {
    let token =
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error occurred while Auth Middleware: ", error);

    return res.status(401).json({
      status: false,
      message: "Unauthorized: Invalid token",
      error: error.message,
    });
  }
};
