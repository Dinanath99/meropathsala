// pages/student/Dashboard.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Course from "./Course"; // ✅ reuse your existing course card

const StudentDashboard = () => {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8080/api/v1/recommendations/recommend",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setRecommendedCourses(res.data.recommendedCourses);
      } else {
        toast.error("No recommendations found.");
      }
    } catch (err) {
      toast.error("Failed to fetch recommended courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Recommended Courses for You
      </h1>
      {loading ? (
        <p className="text-center">Loading recommendations...</p>
      ) : recommendedCourses.length === 0 ? (
        <p className="text-center">
          No recommendations available. Please update your interests in profile.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {recommendedCourses.map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
