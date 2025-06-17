const express = require("express");
const app = express();
require("dotenv").config();
const UserRouter = require("./routes/user.route");
const { ErrorHandling } = require("./middlewares/errorHandling");
const cors = require("cors");
const blogRouter = require("./routes/blog.route");
const cookieParser = require("cookie-parser");

// for app requirement
app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true, // allow cookies to be sent
  })
);

// for Importing Database
require("./db/connection");

// for Importing Routers
app.use("/api/v1", UserRouter);
app.use("/api/v1", blogRouter);

app.use(ErrorHandling);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port no. ${port}`);
});
