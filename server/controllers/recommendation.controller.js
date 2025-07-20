

import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

import { CoursePurchase } from "../models/coursePurchase.model.js";
import cosineSimilarity from "compute-cosine-similarity";

const normalize = (str) => str.trim().toLowerCase();

const experienceLevelScore = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

const courseLevelScore = {
  Beginner: 0,
  Medium: 1,
  Advance: 2,
};

export const recommendCourses = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const userSkills = (user.skills || []).map(normalize);
    const userInterests = (user.interests || []).map(normalize);
    const userPreferredRoles = (user.preferredRoles || []).map(normalize);
    const userExperience = user.experienceLevel?.toLowerCase() || "beginner";
    const userEducationLevel = user.educationLevel?.toLowerCase();
    const enrolledIds = user.enrolledCourses?.map((id) => id.toString()) || [];

    // Map user experience to course level exactly
    const levelMapping = {
      beginner: "Beginner",
      intermediate: "Medium",
      advanced: "Advance",
    };
    const matchedLevel = levelMapping[userExperience] || "Beginner";

    // Get all courses not enrolled and published
    const allCourses = await Course.find({
      isPublished: true,
      _id: { $nin: enrolledIds },
    }).lean();

    // Filter courses with exact level + skill relevance (dynamic)
    const filteredCourses = allCourses.filter((course) => {
      const title = course.courseTitle?.toLowerCase() || "";
      const subTitle = course.subTitle?.toLowerCase() || "";
      const tags = (course.tags || []).map(normalize);
      const level = course.courseLevel;

      // Check if any user skill matches course title, subtitle, or tags
      const skillMatch = userSkills.some(
        (skill) =>
          title.includes(skill) || subTitle.includes(skill) || tags.includes(skill)
      );

      return level === matchedLevel && skillMatch;
    });

    // Scoring function (same logic as before)
    const calculateScore = (course) => {
      let score = 0;

      const title = course.courseTitle?.toLowerCase() || "";
      const subTitle = course.subTitle?.toLowerCase() || "";
      const tags = (course.tags || []).map(normalize);
      const courseLevel = courseLevelScore[course.courseLevel] ?? 1;
      const userExpScore = experienceLevelScore[userExperience] ?? 0;

      // Skills
      const skillMatches = userSkills.filter(
        (skill) =>
          title.includes(skill) || subTitle.includes(skill) || tags.includes(skill)
      ).length;
      const skillScore = skillMatches / (userSkills.length || 1);
      score += skillScore * 0.4;

      // Interests
      const interestMatches = userInterests.filter(
        (interest) =>
          title.includes(interest) || subTitle.includes(interest) || tags.includes(interest)
      ).length;
      const interestScore = interestMatches / (userInterests.length || 1);
      score += interestScore * 0.2;

      // Experience match
      const levelDiff = Math.abs(userExpScore - courseLevel);
      const levelScore = 1 - levelDiff / 2;
      score += levelScore * 0.15;

      // Preferred roles
      const roleMatches = userPreferredRoles.filter(
        (role) => title.includes(role) || subTitle.includes(role)
      ).length;
      const roleScore = roleMatches / (userPreferredRoles.length || 1);
      score += roleScore * 0.15;

      // Education level boost
      if (
        userEducationLevel &&
        (title.includes("bachelor") ||
          subTitle.includes("bachelor") ||
          tags.includes("bachelor"))
      ) {
        score += 0.1;
      }

      return score;
    };

    // Final scored recommendations
    const scoredCourses = filteredCourses
      .map((course) => ({
        ...course,
        score: calculateScore(course),
      }))
      .filter((course) => course.score >= 0.5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      recommendedCourses: scoredCourses,
    });
  } catch (error) {
    console.error("Recommendation Error:", error);
    return res.status(500).json({ message: "Failed to get recommendations" });
  }
};





// Binary vector of courses a user has purchased
const getUserCourseVector = async (userId, allCourses) => {
  const purchases = await CoursePurchase.find({
    userId,
    status: "completed",
  }).select("courseId");

  const purchasedIds = purchases.map(p => p.courseId.toString());

  return allCourses.map(course =>
    purchasedIds.includes(course._id.toString()) ? 1 : 0
  );
};

export const recommendCollaborativeCourses = async (req, res) => {
  try {
    const currentUserId = req.id; // injected from token middleware

    const users = await User.find().select("_id");
    const allCourses = await Course.find().select("_id courseTitle");

    const userVectors = await Promise.all(
      users.map(async user => ({
        userId: user._id.toString(),
        vector: await getUserCourseVector(user._id, allCourses),
      }))
    );

    const currentUserVector = userVectors.find(
      u => u.userId === currentUserId
    )?.vector;

    if (!currentUserVector) {
      return res
        .status(404)
        .json({ message: "No course data available for current user." });
    }

    const similarities = userVectors
      .filter(u => u.userId !== currentUserId)
      .map(u => ({
        userId: u.userId,
        similarity: cosineSimilarity(currentUserVector, u.vector),
        vector: u.vector,
      }))
      .sort((a, b) => b.similarity - a.similarity);

    const topUsers = similarities.slice(0, 3);

    const recommendedIndices = new Set();
    topUsers.forEach(({ vector }) => {
      vector.forEach((val, i) => {
        if (val === 1 && currentUserVector[i] === 0) {
          recommendedIndices.add(i);
        }
      });
    });

    const recommendedCourses = Array.from(recommendedIndices).map(
      i => allCourses[i]
    );

    res.status(200).json({
      message: "Recommended courses based on collaborative filtering",
      recommendedCourses,
    });
  } catch (err) {
    console.error("Error in recommendation:", err);
    res.status(500).json({ error: "Server error in recommendation" });
  }
};