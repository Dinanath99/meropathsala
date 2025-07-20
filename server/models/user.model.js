import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["instructor", "student"],
      default: "student",
    },
    skills: [String],
    interests: [String],
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    photoUrl: { type: String, default: "" },

    preferredRoles: {
      type: [String],
      enum: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "DevOps Engineer",
        "Machine Learning Engineer",
        "UI/UX Designer",
        "Cybersecurity Analyst",
        "Software Engineer",
        "Data Scientist",
        "Mobile App Developer",
      ],
      default: [],
    },

    jobTitle: { type: String },
    educationLevel: {
      type: String,
      enum: [
        "Less than high school diploma",
        "High school diploma",
        "Some college",
        "Associate Degree",
        "Bachelor's degree",
        "Master's degree",
        "Professional school degree",
        "Doctorate degree",
      ],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
