const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const Auth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("token: ", token);

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized. Token missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded: ", decoded);

    req.user = decoded; // you can use req.user in other routes
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = Auth;
