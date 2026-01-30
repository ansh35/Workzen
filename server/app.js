const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./src/routes/auth.route.js");
app.use("/api/auth", authRoutes);

// auth & role middleware
const authMiddleware = require("./src/Middleware/middleware.js");

const roleMiddlewar = require("./src/Middleware/role.js");

// protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({message: "This is a protected route",
    user: req.user
  });
});

// admin-only route
app.get("/api/admin",authMiddleware,roleMiddlewar("admin"),
  (req, res) => {
    res.json({message: "Welcome Admin",user: req.user});
  }
);

// project routes
const projectRoutes = require("./src/routes/project.routes.js");
app.use("/api", projectRoutes);

// task routes
const taskRoutes = require("./src/routes/task.routes.js");
app.use("/api/tasks", taskRoutes);

// user routes
const userRoutes = require("./src/routes/user.route.js");
app.use("/api", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;
