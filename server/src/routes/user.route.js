const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/user");
const authMiddleware = require("../middleware/middleware");
const roleMiddleware = require("../middleware/role");

// ✅ Admin only
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

module.exports = router;
