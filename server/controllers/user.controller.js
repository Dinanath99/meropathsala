// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../utils/generateToken.js";
// import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password || !role) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields including role are required.",
//       });
//     }

//     // Validate role
//     if (!["student", "instructor"].includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid role value.",
//       });
//     }

//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with this email.",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Account created successfully.",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to register",
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields including role are required.",
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect email or password",
//       });
//     }

//     // Log roles for debugging (remove in production)
//     console.log("Login role input:", role);
//     console.log("User role from DB:", user.role);

//     // Check role only if user.role exists, else allow login (for legacy users)
//     if (user.role && user.role !== role) {
//       return res.status(400).json({
//         success: false,
//         message: "Role mismatch for this user",
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect email or password",
//       });
//     }

//     // Generate token and send cookie (assuming your generateToken sets the cookie)
//     generateToken(res, user, `Welcome back ${user.name}`);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to login",
//     });
//   }
// };

// export const logout = async (_, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully.",
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to logout",
//     });
//   }
// };

// export const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const user = await User.findById(userId)
//       .select("-password")
//       .populate("enrolledCourses");
//     if (!user) {
//       return res.status(404).json({
//         message: "Profile not found",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to load user",
//     });
//   }
// };

// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const {
//       name,
//       skills,
//       interests,
//       experienceLevel,
//       preferredRoles, // <-- changed from roles
//       jobTitle,
//       educationLevel,
//     } = req.body;
//     const profilePhoto = req.file;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     const updatedData = {};

//     if (name) updatedData.name = name;

//     if (skills) {
//       updatedData.skills = typeof skills === "string"
//         ? skills.split(",").map((s) => s.trim())
//         : skills;
//     }

//     if (interests) {
//       updatedData.interests = typeof interests === "string"
//         ? interests.split(",").map((i) => i.trim())
//         : interests;
//     }

//     if (experienceLevel) updatedData.experienceLevel = experienceLevel;

//     // ✅ Fixed preferredRoles field
//     if (preferredRoles) {
//       updatedData.preferredRoles = typeof preferredRoles === "string"
//         ? preferredRoles.split(",").map((r) => r.trim())
//         : preferredRoles;
//     }

//     if (jobTitle) updatedData.jobTitle = jobTitle;
//     if (educationLevel) updatedData.educationLevel = educationLevel;

//     if (profilePhoto) {
//       if (user.photoUrl) {
//         const publicId = user.photoUrl.split("/").pop().split(".")[0];
//         await deleteMediaFromCloudinary(publicId);
//       }
//       const cloudResponse = await uploadMedia(profilePhoto.path);
//       updatedData.photoUrl = cloudResponse.secure_url;
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     }).select("-password");

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully.",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update profile.",
//     });
//   }
// };

import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

// -----------------------
// REGISTER
// -----------------------
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields including role are required.",
      });
    }

    if (!["student", "instructor"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role value.",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

// -----------------------
// LOGIN
// -----------------------
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields including role are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    if (user.role && user.role !== role) {
      return res.status(400).json({
        success: false,
        message: "Role mismatch for this user",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

// -----------------------
// LOGOUT
// -----------------------
export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

// -----------------------
// FORGOT PASSWORD
// -----------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const html = `
      <h3>Password Reset Requested</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 15 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "Reset Your Password",
      message: html,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send reset email",
    });
  }
};

// -----------------------
// RESET PASSWORD
// -----------------------
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password)
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

// -----------------------
// GET USER PROFILE
// -----------------------
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id)
      .select("-password")
      .populate("enrolledCourses");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};

// -----------------------
// UPDATE PROFILE
// -----------------------
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {
      name,
      skills,
      interests,
      experienceLevel,
      preferredRoles,
      jobTitle,
      educationLevel,
    } = req.body;

    const photo = req.file;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    const updates = {};

    if (name) updates.name = name;
    if (skills)
      updates.skills =
        typeof skills === "string"
          ? skills.split(",").map((s) => s.trim())
          : skills;

    if (interests)
      updates.interests =
        typeof interests === "string"
          ? interests.split(",").map((i) => i.trim())
          : interests;

    if (experienceLevel) updates.experienceLevel = experienceLevel;

    if (preferredRoles)
      updates.preferredRoles =
        typeof preferredRoles === "string"
          ? preferredRoles.split(",").map((r) => r.trim())
          : preferredRoles;

    if (jobTitle) updates.jobTitle = jobTitle;
    if (educationLevel) updates.educationLevel = educationLevel;

    if (photo) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      const upload = await uploadMedia(photo.path);
      updates.photoUrl = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
