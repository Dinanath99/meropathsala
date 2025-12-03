import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

import { CourseClick } from "../models/courseclick.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import cosineSimilarity from "compute-cosine-similarity";

const normalize = (str) => str.trim().toLowerCase();

export const recommendCollaborativeCourses = async (req, res) => {
  try {
    const currentUserId = req.id;

    // Get completed purchases
    const allPurchases = await CoursePurchase.find({
      status: "completed",
    }).select("userId courseId");

    // Courses current user already purchased
    const userPurchasedSet = new Set(
      allPurchases
        .filter((p) => p.userId.toString() === currentUserId)
        .map((p) => p.courseId.toString())
    );

    // Count purchases excluding already purchased by current user
    const purchaseCountMap = new Map();
    allPurchases.forEach((p) => {
      const courseId = p.courseId.toString();
      if (!userPurchasedSet.has(courseId)) {
        purchaseCountMap.set(
          courseId,
          (purchaseCountMap.get(courseId) || 0) + 1
        );
      }
    });

    // Get click counts by other users (not the current one)
    const allClicks = await CourseClick.find({
      userId: { $ne: currentUserId },
    }).select("courseId");

    const clickCountMap = new Map();
    allClicks.forEach((c) => {
      const courseId = c.courseId.toString();
      if (!userPurchasedSet.has(courseId)) {
        clickCountMap.set(courseId, (clickCountMap.get(courseId) || 0) + 1);
      }
    });

    // Combine click and purchase scores
    const scoreMap = new Map(); // courseId => score

    const allCourseIds = new Set([
      ...purchaseCountMap.keys(),
      ...clickCountMap.keys(),
    ]);

    allCourseIds.forEach((courseId) => {
      const purchaseScore = purchaseCountMap.get(courseId) || 0;
      const clickScore = clickCountMap.get(courseId) || 0;

      // Weighted score: give more priority to clicks
      const totalScore = clickScore * 2 + purchaseScore;
      scoreMap.set(courseId, totalScore);
    });

    // Sort and get top courseIds by totalScore descending
    const recommendedCourseIds = Array.from(scoreMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([courseId]) => courseId);

    // Fetch course details for these courses
    const courses = await Course.find({
      _id: { $in: recommendedCourseIds },
      isPublished: true,
    }).select("courseTitle courseThumbnail courseLevel coursePrice");

    // Merge stats into course objects
    let courseWithStats = courses.map((course) => {
      const courseId = course._id.toString();
      return {
        ...course.toObject(),
        totalPurchases: purchaseCountMap.get(courseId) || 0,
        totalClicks: clickCountMap.get(courseId) || 0,
        totalScore: scoreMap.get(courseId) || 0,
      };
    });

    // Sort final response by totalPurchases descending
    courseWithStats.sort((a, b) => b.totalPurchases - a.totalPurchases);

    return res.status(200).json({
      message: "Recommended courses based on highest purchases",
      recommendedCourses: courseWithStats,
    });
  } catch (err) {
    console.error("Error in recommendCollaborativeCourses:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const recommendCourses = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const normalize = (str) => (str || "").toLowerCase().trim();

    // Normalize user data
    const userSkills = (user.skills || []).map(normalize).filter(Boolean);
    const userEducationLevel = normalize(user.educationLevel);
    const enrolledIds = (user.enrolledCourses || []).map((id) => id.toString());

    // Education level synonyms
    const educationSynonyms = {
      "bachelor's degree": ["bachelor", "bachelor’s degree", "undergraduate"],
      "master's degree": ["master", "master’s degree", "graduate"],
      "doctorate degree": ["doctorate", "phd", "doctoral"],
      "less than high school diploma": ["less than high school", "no diploma"],
      "high school diploma": ["high school", "secondary education"],
      "some college": ["some college", "partial college"],
      "associate degree": ["associate", "associate degree"],
      "professional school degree": [
        "professional degree",
        "professional school",
      ],
    };

    // Get all available published, not enrolled courses
    const allCourses = await Course.find({
      isPublished: true,
      _id: { $nin: enrolledIds },
    }).lean();

    // Log for debugging
    console.log("User Skills:", userSkills);
    console.log("User Education Level:", userEducationLevel);
    console.log("Available Courses:", allCourses.length);

    // Score all courses
    const scoredCourses = allCourses
      .map((course) => {
        const title = normalize(course.courseTitle || "");
        const subTitle = normalize(course.subTitle || "");
        const tags = (course.tags || []).map(normalize).filter(Boolean);

        // Log course details for debugging
        console.log(`Course: ${course.courseTitle}, Tags: ${tags}`);

        // Enhanced skill matching with synonyms
        const skillSynonyms = {
          javascript: [
            "javascript",
            "js",
            "node.js",
            "react",
            "next.js",

            "angular",
            "vue",
          ],
          python: ["python", "py", "django", "flask"],
          android: ["android", "mobile development", "kotlin", "flutter"],
          java: [
            "java",
            "core java",
            "advanced java",
            "spring",
            "spring boot",
            "spring mvc",
            "hibernate",
            "jakarta ee",
            "microservices",
          ],
        };

        const skillMatches = userSkills.reduce((count, skill) => {
          const synonyms = skillSynonyms[skill] || [skill];
          return (
            count +
            synonyms.reduce((synCount, syn) => {
              const regex = new RegExp(syn, "i");
              return (
                synCount +
                (regex.test(title) ||
                regex.test(subTitle) ||
                tags.some((tag) => regex.test(tag))
                  ? 1
                  : 0)
              );
            }, 0)
          );
        }, 0);
        const skillScore = userSkills.length
          ? skillMatches / userSkills.length
          : 0.1; // Fallback score

        // Education bonus
        const educationTerms = educationSynonyms[userEducationLevel] || [
          userEducationLevel,
        ];
        const educationBonus = educationTerms.some(
          (term) =>
            new RegExp(term, "i").test(title) ||
            new RegExp(term, "i").test(subTitle) ||
            tags.some((tag) => new RegExp(term, "i").test(tag))
        )
          ? 0.2 // Bonus for education match
          : 0;

        // Adjusted weights
        const totalScore =
          skillScore * 0.8 + // Prioritize skills
          educationBonus + // Education as a bonus
          0.1; // Base score to ensure some courses pass

        console.log(
          `Course: ${course.courseTitle}, SkillScore: ${skillScore}, EducationBonus: ${educationBonus}, TotalScore: ${totalScore}`
        );

        return {
          ...course,
          score: totalScore,
        };
      })
      .filter((course) => course.score >= 0.2) // Keep threshold
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    // Fallback: If no courses match, return top beginner courses
    if (scoredCourses.length === 0) {
      console.log("No courses matched, returning top beginner courses");
      const fallbackCourses = await Course.find({
        isPublished: true,
        _id: { $nin: enrolledIds },
        courseLevel: "Beginner",
      })
        .lean()
        .limit(5);
      return res.status(200).json({
        success: true,
        recommendedCourses: fallbackCourses.map((course) => ({
          ...course,
          score: 0.2,
        })),
      });
    }

    // Log final recommended courses
    console.log(
      "Recommended Courses:",
      scoredCourses.map((c) => ({ title: c.courseTitle, score: c.score }))
    );

    return res.status(200).json({
      success: true,
      recommendedCourses: scoredCourses,
    });
  } catch (error) {
    console.error("Recommendation Error:", error);
    return res.status(500).json({ message: "Failed to get recommendations" });
  }
};
