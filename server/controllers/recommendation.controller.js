import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

export const recommendCourses = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allCourses = await Course.find({ isPublished: true }).lean();

    const recommendedCourses = allCourses
      .map((course) => {
        let score = 0;

        // Match experience level
        if (
          user.experienceLevel &&
          course.courseLevel &&
          user.experienceLevel.toLowerCase() ===
            course.courseLevel.toLowerCase()
        ) {
          score += 2;
        }

        // Match skills
        const matchedSkills =
          user.skills?.filter((skill) => course.tags?.includes(skill)) || [];
        score += matchedSkills.length * 2;

        // Match interests
        const matchedInterests =
          user.interests?.filter((interest) =>
            course.tags?.includes(interest)
          ) || [];
        score += matchedInterests.length;

        return { ...course, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // top 10 results

    return res.status(200).json({
      success: true,
      recommendedCourses,
    });
  } catch (error) {
    console.error("Error recommending courses:", error);
    return res.status(500).json({ message: "Failed to get recommendations" });
  }
};
