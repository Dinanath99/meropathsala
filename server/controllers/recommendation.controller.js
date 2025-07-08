import { User } from "../models/user.model.js";
export const getCourseRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { skills, interests, experienceLevel } = user;

    if (!skills || !interests || !experienceLevel) {
      return res.status(400).json({ message: "Incomplete profile" });
    }

    const query = {
      $or: [
        { tags: { $in: skills } },
        { category: { $in: interests } },
        { level: experienceLevel },
      ],
      published: true,
    };

    const courses = await Course.find(query).limit(10);
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ message: "Error getting recommendations" });
  }
};