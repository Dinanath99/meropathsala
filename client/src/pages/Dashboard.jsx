// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Course from "@/components/Course"; // Ensure this exists
import { toast } from "sonner";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8080/api/v1/recommendations/recommend",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(res.data.recommendedCourses);
    } catch (error) {
      toast.error("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Recommended for You</h1>
      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No course recommendations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
