// models/userCourseInteraction.model.js
import mongoose from "mongoose";

const userCourseInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  enrolled: { type: Boolean, default: false },
  liked: { type: Boolean, default: false }, // optional for future
  rating: { type: Number, min: 1, max: 5 }, // optional for future
}, { timestamps: true });

export const UserCourseInteraction = mongoose.model("UserCourseInteraction", userCourseInteractionSchema);
