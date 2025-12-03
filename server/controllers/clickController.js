import { CourseClick } from "../models/courseclick.model.js";

export const recordCourseClick = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Check if the user has already clicked this course
    const existingClick = await CourseClick.findOne({ userId, courseId });

    if (existingClick) {
      return res.status(200).json({
        success: true,
        message: "Course click already recorded",
      });
    }

    // Save click record
    await CourseClick.create({
      userId,
      courseId,
    });

    return res.status(201).json({
      success: true,
      message: "Course click recorded",
    });
  } catch (err) {
    console.error("Click Error:", err);
    return res.status(500).json({ message: "Failed to record click" });
  }
};
