// import { Course } from "../models/course.model.js";
// import { User } from "../models/user.model.js";

// export const recommendCourses = async (req, res) => {
//   try {
//     const userId = req.id;
//     const user = await User.findById(userId).lean();

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const allCourses = await Course.find({ isPublished: true }).lean();

//     const recommendedCourses = allCourses
//       .map((course) => {
//         let score = 0;

//         // Match experience level
//         if (
//           user.experienceLevel &&
//           course.courseLevel &&
//           user.experienceLevel.toLowerCase() ===
//             course.courseLevel.toLowerCase()
//         ) {
//           score += 2;
//         }

//         // Match skills
//         const matchedSkills =
//           user.skills?.filter((skill) => course.tags?.includes(skill)) || [];
//         score += matchedSkills.length * 2;

//         // Match interests
//         const matchedInterests =
//           user.interests?.filter((interest) =>
//             course.tags?.includes(interest)
//           ) || [];
//         score += matchedInterests.length;

//         return { ...course, score };
//       })
//       .sort((a, b) => b.score - a.score)
//       .slice(0, 10); // top 10 results

//     return res.status(200).json({
//       success: true,
//       recommendedCourses,
//     });
//   } catch (error) {
//     console.error("Error recommending courses:", error);
//     return res.status(500).json({ message: "Failed to get recommendations" });
//   }
// };

import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

export const recommendCourses = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🛑 Block if skills array is empty or contains only empty strings
    const validSkills =
      user.skills?.filter((skill) => skill.trim() !== "") || [];

    if (validSkills.length === 0) {
      return res.status(200).json({
        success: true,
        recommendedCourses: [],
      });
    }

    const allCourses = await Course.find({ isPublished: true }).lean();

    const recommendedCourses = allCourses
      .map((course) => {
        let score = 0;

        const tags = course.tags?.map((tag) => tag.toLowerCase()) || [];
        const title = course.courseTitle?.toLowerCase() || "";
        const subTitle = course.subTitle?.toLowerCase() || "";
        const description = course.description?.toLowerCase() || "";
        const courseLevel = course.courseLevel?.toLowerCase() || "";
        const userLevel = user.experienceLevel?.toLowerCase() || "";

        // 🎯 Match experience level
        if (userLevel && userLevel === courseLevel) {
          score += 2;
        }

        // 🏷️ Match skills in tags, title, subtitle, and description
        validSkills.forEach((skill) => {
          const lowerSkill = skill.toLowerCase().trim();

          if (tags.includes(lowerSkill)) {
            score += 3;
          }

          if (title.includes(lowerSkill)) {
            score += 2;
          }

          if (subTitle.includes(lowerSkill)) {
            score += 1;
          }

          if (description.includes(lowerSkill)) {
            score += 1;
          }
        });

        // if no score, skip course
        if (score === 0) return null;

        return { ...course, score };
      })
      .filter(Boolean) // remove nulls
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // top 10

    return res.status(200).json({
      success: true,
      recommendedCourses,
    });
  } catch (error) {
    console.error("Error recommending courses:", error);
    return res.status(500).json({ message: "Failed to get recommendations" });
  }
};
