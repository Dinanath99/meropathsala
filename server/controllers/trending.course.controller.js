import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Course } from "../models/course.model.js";

export const getTrendingCourses = async (req, res) => {
  try {
    // Aggregate CoursePurchases with status 'completed' and group by courseId
    const purchasedCourses = await CoursePurchase.aggregate([
      { $match: { status: "completed" } }, // only successful purchases
      {
        $group: {
          _id: "$courseId",
          purchaseCount: { $sum: 1 },
        },
      },
      { $match: { purchaseCount: { $gte: 2 } } }, // only courses bought by 2 or more users
      { $sort: { purchaseCount: -1 } },
      { $limit: 10 }, // top 10 trending courses
    ]);

    // Extract courseIds from aggregation result
    const courseIds = purchasedCourses.map((c) => c._id);

    // Find course details for these courseIds and isPublished = true
    const courses = await Course.find({
      _id: { $in: courseIds },
      isPublished: true,
    }).lean();

    // To maintain order by purchaseCount descending,
    // map courses with purchaseCount and sort manually
    const coursesWithCount = courses.map((course) => {
      const purchaseInfo = purchasedCourses.find(
        (c) => c._id.toString() === course._id.toString()
      );
      return {
        ...course,
        purchaseCount: purchaseInfo ? purchaseInfo.purchaseCount : 0,
      };
    });

    coursesWithCount.sort((a, b) => b.purchaseCount - a.purchaseCount);

    return res.status(200).json({
      success: true,
      trendingCourses: coursesWithCount,
    });
  } catch (error) {
    console.error("Error fetching trending courses:", error);
    return res.status(500).json({
      message: "Failed to fetch trending courses",
    });
  }
};
