const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const crypto = require("crypto");

// REGISTER

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "USER ALREADY EXISTS" });
    }

    await User.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json({
      message: "USER REGISTERED SUCCESSFULLY"
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "SERVER ERROR",
      error: error.message
    });
  }
};
// LOGIN

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(400).json({ message: "INVALID CREDENTIALS" });
    }

    const isMatch = await userDoc.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "INVALID CREDENTIALS" });
    }

    const token = jwt.sign(
      { id: userDoc._id, role: userDoc.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        role: userDoc.role
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "SERVER ERROR",
      error: error.message
    });
  }
};

// FORGOT PASSWORD

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //  find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    //  generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save({ validateBeforeSave: false });

    // TEMP: log instead of sending email
    console.log("RESET TOKEN (dev):", resetToken);

    res.status(200).json({
      message: "Password reset link sent",
      resetToken, //  only for development
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

