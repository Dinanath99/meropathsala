import express from "express";
import { getUserProfile, login, logout, register, updateProfile,forgotPassword,resetPassword } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
// // Forgot Password
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);

export default router;

// import express from "express";
// import {
//   register,
//   login,
//   logout,
//   getUserProfile,
//   updateProfile,
//   forgotPassword,
//   resetPassword,
// } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import upload from "../utils/multer.js";

// const router = express.Router();

// // Get logged-in user's profile
// router.route("/profile").get(isAuthenticated, getUserProfile);

// // Update profile (with optional profile photo)
// router.route("/profile").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

// // User registration
// router.route("/register").post(register);

// // Login
// router.route("/login").post(login);

// // Logout
// router.route("/logout").get(logout);

// // Forgot Password
// router.route("/forgot-password").post(forgotPassword);

// // Reset Password
// router.route("/reset-password/:token").put(resetPassword);


// // Get logged-in user's profile
// router.route("/profile").get(isAuthenticated, getUserProfile);

// // Update profile (with optional profile photo)
// router.route("/profile").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

// export default router;
