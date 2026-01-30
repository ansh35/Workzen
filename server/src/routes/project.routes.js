const express = require("express");
const router = express.Router();
const {
createProject,getProjects} = require("../controllers/project.controller.js");
const authMiddleware = require("../Middleware/middleware.js");
const roleMiddleware = require("../Middleware/role.js");
router.post("/projects",authMiddleware,roleMiddleware("admin"),
  createProject
);
router.get(
  "/projects",
  authMiddleware,
  getProjects
);

module.exports = router;
