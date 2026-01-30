const express = require("express");
const router = express.Router();

const{
    CreateTask,
    getTasksByProject,
    updateTaskStatus,
    getMyTasks,
} = require("../controllers/Task.controller.js");

const authMiddleware = require("../Middleware/middleware.js");
const roleMiddleware = require("../Middleware/role.js");

// Create Task - Admin only
router.post("/", authMiddleware, roleMiddleware("admin"), CreateTask);

// Get Tasks by Project - Authenticated users
router.get("/project/:projectId", authMiddleware, getTasksByProject);

// get my tasks - Authenticated users
router.get("/my", authMiddleware, getMyTasks);

// Update Task Status - Assigned user or Admin
router.patch("/:id", authMiddleware, updateTaskStatus);


module.exports=router;