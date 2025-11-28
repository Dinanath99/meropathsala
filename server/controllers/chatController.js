import OpenAI from "openai";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { CourseProgress } from "../models/courseProgress.js";

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL || "http://localhost:5173";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();

const buildCourseSnippet = (course) => ({
  id: course._id.toString(),
  title: course.courseTitle,
  subtitle: course.subTitle,
  price: course.coursePrice,
  level: course.courseLevel,
  category: course.category,
  tags: course.tags,
  link: `${CLIENT_BASE_URL}/course-detail/${course._id}`,
});

const extractSkillsFromMessage = (message = "") => {
  const triggers = [
    "my skill is",
    "my skills are",
    "skill is",
    "skills are",
    "skills:",
    "skill:",
  ];
  const lowerMessage = message.toLowerCase();

  for (const trigger of triggers) {
    const triggerIndex = lowerMessage.indexOf(trigger);
    if (triggerIndex !== -1) {
      const skillsPart = message.slice(triggerIndex + trigger.length).trim();
      const cleanedPart = skillsPart.replace(/[:.]/g, " ");
      const skills = cleanedPart
        .split(/,|\/|\\| and | & | \+ /i)
        .map((skill) => skill.replace(/[^a-z0-9+#.\s]/gi, "").trim())
        .filter(Boolean);
      if (skills.length) {
        return skills;
      }
    }
  }

  const fallbackMatch = message.match(
    /skills?\s*(?:are|is|:)\s*([a-z0-9,#\s+\-\/]+)/i
  );
  if (fallbackMatch?.[1]) {
    return fallbackMatch[1]
      .split(/,|\/|\\| and | & /i)
      .map((skill) => skill.replace(/[^a-z0-9+#.\s]/gi, "").trim())
      .filter(Boolean);
  }

  return [];
};

export const chatHandler = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Valid message is required" });
    }

    let responseData = {};
    const lowerMessage = message.toLowerCase();
    const parsedSkills = extractSkillsFromMessage(message);

    if (lowerMessage.includes("how many courses")) {
      const courseCount = await Course.countDocuments({ isPublished: true });
      responseData = { type: "course_count", count: courseCount };
    } else if (
      lowerMessage.includes("recommend") ||
      lowerMessage.includes("suggest")
    ) {
      let recommendedCourses = [];
      if (req.user) {
        const user = await User.findById(req.user.id).select(
          "skills interests"
        );
        const userSkills = user?.skills || [];
        const userInterests = user?.interests || [];

        recommendedCourses = await Course.find({
          isPublished: true,
          $or: [
            { tags: { $in: userSkills } },
            { tags: { $in: userInterests } },
            { category: { $in: userInterests } },
          ],
        })
          .select("courseTitle subTitle coursePrice courseLevel category tags")
          .limit(5);
      } else {
        recommendedCourses = await Course.find({ isPublished: true })
          .sort({ purchaseCount: -1 })
          .select("courseTitle subTitle coursePrice courseLevel category tags")
          .limit(5);
      }
      responseData = {
        type: "recommendations",
        courses: recommendedCourses.map(buildCourseSnippet),
      };
    } else if (
      lowerMessage.includes("beginner") ||
      lowerMessage.includes("medium") ||
      lowerMessage.includes("advance")
    ) {
      const levelMap = {
        beginner: "Beginner",
        medium: "Medium",
        advance: "Advance",
      };
      const level = Object.keys(levelMap).find((key) =>
        lowerMessage.includes(key)
      );
      if (level) {
        const courses = await Course.find({
          isPublished: true,
          courseLevel: levelMap[level],
        })
          .select("courseTitle subTitle coursePrice courseLevel category tags")
          .limit(5);
        responseData = {
          type: "level_courses",
          level: levelMap[level],
          courses: courses.map(buildCourseSnippet),
        };
      }
    } else if (lowerMessage.includes("my courses") && req.user) {
      const user = await User.findById(req.user.id).populate({
        path: "enrolledCourses",
        select: "courseTitle subTitle coursePrice",
      });
      responseData = {
        type: "enrolled_courses",
        courses: user.enrolledCourses,
      };
    } else if (lowerMessage.includes("progress") && req.user) {
      const progress = await CourseProgress.find({
        userId: req.user.id,
      }).populate({
        path: "courseId",
        select: "courseTitle",
      });
      responseData = { type: "course_progress", progress };
    } else if (parsedSkills.length) {
      const skillRegexes = parsedSkills.map(
        (skill) => new RegExp(escapeRegex(skill), "i")
      );
      const skillCourses = await Course.find({
        isPublished: true,
        $or: [
          { tags: { $in: skillRegexes } },
          { category: { $in: skillRegexes } },
          { courseTitle: { $in: skillRegexes } },
        ],
      })
        .select("courseTitle subTitle coursePrice courseLevel category tags")
        .limit(5);

      responseData = {
        type: "skill_recommendations",
        skills: parsedSkills,
        courses: skillCourses.map(buildCourseSnippet),
      };
    } else if (
      lowerMessage.includes("course") &&
      (lowerMessage.includes("detail") || lowerMessage.includes("about"))
    ) {
      const courseTitle =
        message.match(/"([^"]+)"/)?.[1] ||
        lowerMessage.split("about ")[1]?.split(" ")[0];
      if (courseTitle) {
        const course = await Course.findOne({
          isPublished: true,
          courseTitle: { $regex: courseTitle, $options: "i" },
        }).select("courseTitle subTitle coursePrice courseLevel category tags");
        responseData = {
          type: "course_details",
          course: course ? buildCourseSnippet(course) : null,
        };
      }
    }

    const courses = await Course.find({ isPublished: true })
      .select("courseTitle subTitle coursePrice courseLevel category tags")
      .limit(10);
    const courseContext = courses.map(buildCourseSnippet);

    let userContext = "";
    if (req.user) {
      const user = await User.findById(req.user.id).select(
        "name skills interests enrolledCourses"
      );
      userContext = `User: ${user.name}, Skills: ${user.skills.join(
        ", "
      )}, Interests: ${user.interests.join(", ")}, Enrolled Courses: ${
        user.enrolledCourses.length
      }`;
    }

    const systemPrompt = `
      You are a helpful learning assistant for Mero Pathshala, an online course platform.
      Answer user queries concisely and accurately based on the provided data and context.
      Use this course data: ${JSON.stringify(courseContext, null, 2)}
      ${
        req.user ? `User context: ${userContext}` : "User is not authenticated."
      }
      Response data: ${JSON.stringify(responseData, null, 2)}
      If the response data contains specific information (e.g., course_count, recommendations), use it to craft your response.
      When courses include a link, mention it so users can quickly open the page.
      For general queries, provide helpful learning advice.
      Keep responses friendly, professional, and under 150 words.
      Do not disclose sensitive information like API keys.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const botResponse = completion.choices[0].message.content.trim();

    res.status(200).json({ message: botResponse });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
