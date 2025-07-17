

import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

export const recommendCourses = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const skills = (user.skills || [])
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s);

    const interests = (user.interests || [])
      .map((i) => i.trim().toLowerCase())
      .filter((i) => i);

    const keywords = [...new Set([...skills, ...interests])];

    if (keywords.length === 0) {
      return res.status(200).json({ success: true, recommendedCourses: [] });
    }

    const enrolledIds = user.enrolledCourses?.map((id) => id.toString()) || [];

    const allCourses = await Course.find({
      isPublished: true,
      _id: { $nin: enrolledIds },
    }).lean();

    const recommendedCourses = allCourses.filter((course) => {
      const title = course.courseTitle?.toLowerCase() || "";
      const subTitle = course.subTitle?.toLowerCase() || "";

      return keywords.some((keyword) => 
        title.includes(keyword) || subTitle.includes(keyword)
      );
    });

    return res.status(200).json({
      success: true,
      recommendedCourses,
    });
  } catch (error) {
    console.error("Recommendation Error:", error);
    return res.status(500).json({ message: "Failed to get recommendations" });
  }
};
