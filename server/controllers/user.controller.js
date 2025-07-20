

import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields including role are required.",
      });
    }

    // Validate role
    if (!["student", "instructor"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role value.",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

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

    // Log roles for debugging (remove in production)
    console.log("Login role input:", role);
    console.log("User role from DB:", user.role);

    // Check role only if user.role exists, else allow login (for legacy users)
    if (user.role && user.role !== role) {
      return res.status(400).json({
        success: false,
        message: "Role mismatch for this user",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Generate token and send cookie (assuming your generateToken sets the cookie)
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.id;
//     const {
//       name,
//       skills,
//       interests,
//       experienceLevel,
//       roles,
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

//     // Skills - accept string or array
//     if (skills) {
//       if (typeof skills === "string") {
//         updatedData.skills = skills.split(",").map((s) => s.trim());
//       } else if (Array.isArray(skills)) {
//         updatedData.skills = skills;
//       }
//     }

//     // Interests - accept string or array
//     if (interests) {
//       if (typeof interests === "string") {
//         updatedData.interests = interests.split(",").map((i) => i.trim());
//       } else if (Array.isArray(interests)) {
//         updatedData.interests = interests;
//       }
//     }

//     if (experienceLevel) updatedData.experienceLevel = experienceLevel;

//     // New fields from multi-step modal:
//     if (roles) {
//       if (typeof roles === "string") {
//         updatedData.roles = roles.split(",").map((r) => r.trim());
//       } else if (Array.isArray(roles)) {
//         updatedData.roles = roles;
//       }
//     }

//     if (jobTitle) updatedData.jobTitle = jobTitle;

//     if (educationLevel) updatedData.educationLevel = educationLevel;

//     // Profile Photo Handling (existing logic)
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





export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {
      name,
      skills,
      interests,
      experienceLevel,
      preferredRoles, // <-- changed from roles
      jobTitle,
      educationLevel,
    } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const updatedData = {};

    if (name) updatedData.name = name;

    if (skills) {
      updatedData.skills = typeof skills === "string"
        ? skills.split(",").map((s) => s.trim())
        : skills;
    }

    if (interests) {
      updatedData.interests = typeof interests === "string"
        ? interests.split(",").map((i) => i.trim())
        : interests;
    }

    if (experienceLevel) updatedData.experienceLevel = experienceLevel;

    // ✅ Fixed preferredRoles field
    if (preferredRoles) {
      updatedData.preferredRoles = typeof preferredRoles === "string"
        ? preferredRoles.split(",").map((r) => r.trim())
        : preferredRoles;
    }

    if (jobTitle) updatedData.jobTitle = jobTitle;
    if (educationLevel) updatedData.educationLevel = educationLevel;

    if (profilePhoto) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      const cloudResponse = await uploadMedia(profilePhoto.path);
      updatedData.photoUrl = cloudResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};
