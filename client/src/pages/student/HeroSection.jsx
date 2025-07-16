

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       navigate(`/course/search?query=${searchQuery}`);
//     }
//     setSearchQuery("");
//   };

//   const categories = [
//     "Web Development",
//     "Design",
//     "AI/ML",
//     "Marketing",
//     "Data Science",
//   ];

//   const trendingCourses = [
//     {
//       id: 1,
//       title: "React for Beginners",
//       instructor: "Rashik Chauhan",
//       rating: 4.5,
//       price: 19.99,
//       image: "https://via.placeholder.com/300x180",
//     },
//     {
//       id: 2,
//       title: "Mastering Python",
//       instructor: "Aayush",
//       rating: 4.8,
//       price: 24.99,
//       image: "https://via.placeholder.com/300x180",
//     },
//     {
//       id: 3,
//       title: "UI/UX Design Basics",
//       instructor: "Aadarsh",
//       rating: 4.7,
//       price: 14.99,
//       image: "https://via.placeholder.com/300x180",
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
//         <div className="max-w-3xl mx-auto">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-white text-4xl font-bold mb-4"
//           >
//             Find the Best Courses for You
//           </motion.h1>
//           <p className="text-gray-200 dark:text-gray-400 mb-8">
//             Discover, Learn, and Upskill with our wide range of courses
//           </p>

//           <form
//             onSubmit={searchHandler}
//             className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
//           >
//             <Input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search Courses"
//               className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
//             />
//             <Button
//               type="submit"
//               className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800"
//             >
//               Search
//             </Button>
//           </form>
//           <Button
//             onClick={() => navigate(`/course/search?query`)}
//             className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
//           >
//             Explore Courses
//           </Button>
//         </div>
//       </div>

//       {/* Popular Categories */}
//       <section className="py-16 bg-gray-50 dark:bg-gray-950">
//         <h2 className="text-2xl font-bold text-center mb-10">
//           Popular Categories
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
//           {categories.map((cat, idx) => (
//             <div
//               key={idx}
//               className="bg-white dark:bg-gray-800 text-center px-4 py-6 rounded-xl shadow hover:scale-105 transition"
//             >
//               <p className="font-semibold text-blue-600 dark:text-white">
//                 {cat}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Trending Courses */}
//       <section className="py-16 bg-white dark:bg-gray-900">
//         <h2 className="text-2xl font-bold text-center mb-10">
//           Trending Courses
//         </h2>
//         <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
//           {trendingCourses.map((course) => (
//             <div
//               key={course.id}
//               className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
//             >
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-bold">{course.title}</h3>
//                 <p className="text-sm text-gray-500">by {course.instructor}</p>
//                 <div className="flex items-center justify-between mt-2">
//                   <span className="text-yellow-500">⭐ {course.rating}</span>
//                   <span className="text-green-600 font-semibold">
//                     ₹{course.price}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="bg-gray-100 dark:bg-gray-950 py-16">
//         <h2 className="text-2xl font-bold text-center mb-10">
//           What Our Learners Say
//         </h2>
//         <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//             <p className="italic">
//               "This platform helped me land my first tech job!"
//             </p>
//             <h4 className="font-bold mt-4">– Aayush Timilsina, Nepal</h4>
//           </div>
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//             <p className="italic">
//               "Great content, practical courses, and excellent support."
//             </p>
//             <h4 className="font-bold mt-4">– Kanak Shakya</h4>
//           </div>
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//             <p className="italic">
//               "Love the flexibility and variety of courses offered!"
//             </p>
//             <h4 className="font-bold mt-4">– Raj Pote</h4>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="dark:bg-gray-900 text-white py-16 text-center">
//         <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
//         <p className="mb-6">
//           Join thousands of learners from around the world.
//         </p>
//         <Button
//           onClick={() => navigate("/login")}
//           className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
//         >
//           Get Started
//         </Button>
//       </section>
//     </>
//   );
// };

// export default HeroSection;



// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [trendingCourses, setTrendingCourses] = useState([]);
//   const [loadingTrending, setLoadingTrending] = useState(false);
//   const [errorTrending, setErrorTrending] = useState(null);
//   const navigate = useNavigate();

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       navigate(`/course/search?query=${searchQuery}`);
//     }
//     setSearchQuery("");
//   };

//   // Fetch trending courses from backend on mount
//   useEffect(() => {
//     const fetchTrendingCourses = async () => {
//       setLoadingTrending(true);
//       setErrorTrending(null);

//       try {
//         const res = await fetch("http://localhost:8080/api/v1/course/trending");
//         if (!res.ok) throw new Error("Failed to fetch trending courses");

//         const data = await res.json();
//         if (data.success && data.trendingCourses) {
//           setTrendingCourses(data.trendingCourses);
//         } else {
//           setTrendingCourses([]);
//         }
//       } catch (err) {
//         setErrorTrending(err.message || "Something went wrong");
//       } finally {
//         setLoadingTrending(false);
//       }
//     };

//     fetchTrendingCourses();
//   }, []);

//   const categories = [
//     "Web Development",
//     "Design",
//     "AI/ML",
//     "Marketing",
//     "Data Science",
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
//         <div className="max-w-3xl mx-auto">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-white text-4xl font-bold mb-4"
//           >
//             Find the Best Courses for You
//           </motion.h1>
//           <p className="text-gray-200 dark:text-gray-400 mb-8">
//             Discover, Learn, and Upskill with our wide range of courses
//           </p>

//           <form
//             onSubmit={searchHandler}
//             className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
//           >
//             <Input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search Courses"
//               className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
//             />
//             <Button
//               type="submit"
//               className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800"
//             >
//               Search
//             </Button>
//           </form>
//           <Button
//             onClick={() => navigate(`/course/search?query`)}
//             className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
//           >
//             Explore Courses
//           </Button>
//         </div>
//       </div>

//       {/* Popular Categories */}
//       <section className="py-16 bg-gray-50 dark:bg-gray-950">
//         <h2 className="text-2xl font-bold text-center mb-10">
//           Popular Categories
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
//           {categories.map((cat, idx) => (
//             <div
//               key={idx}
//               className="bg-white dark:bg-gray-800 text-center px-4 py-6 rounded-xl shadow hover:scale-105 transition"
//             >
//               <p className="font-semibold text-blue-600 dark:text-white">
//                 {cat}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Trending Courses */}
//       <section className="py-16 bg-white dark:bg-gray-900">
//         <h2 className="text-2xl font-bold text-center mb-10">
//           Trending Courses
//         </h2>

//         {loadingTrending && <p className="text-center">Loading trending courses...</p>}
//         {errorTrending && <p className="text-center text-red-500">{errorTrending}</p>}

//         {!loadingTrending && !errorTrending && trendingCourses.length === 0 && (
//           <p className="text-center">No trending courses found.</p>
//         )}

//         <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
//           {trendingCourses.map((course) => (
//             <div
//               key={course._id}
//               className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer"
//               onClick={() => navigate(`/course/${course._id}`)}
//             >
//               <img
//                 src={course.courseThumbnail || "https://via.placeholder.com/300x180"}
//                 alt={course.courseTitle}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-bold">{course.courseTitle}</h3>
//                 <p className="text-sm text-gray-500">{course.subTitle || ""}</p>
//                 <div className="flex items-center justify-between mt-2">
//                   <span className="text-green-600 font-semibold">
//                     ₹{course.coursePrice}
//                   </span>
//                   <span className="text-sm text-yellow-500 font-semibold">
//                     🔥 {course.purchaseCount} bought
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials and Call to Action sections unchanged */}
//       {/* ... */}
//     </>
//   );
// };

// export default HeroSection;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch trending courses from backend API on mount
  useEffect(() => {
    const fetchTrendingCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/v1/course/trending");
        if (!res.ok) {
          throw new Error("Failed to fetch trending courses");
        }
        const data = await res.json();
        setTrendingCourses(data.trendingCourses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCourses();
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  const categories = [
    "Web Development",
    "Design",
    "AI/ML",
    "Marketing",
    "Data Science",
  ];

  if (loading) return <p className="text-center py-10">Loading trending courses...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl font-bold mb-4"
          >
            Find the Best Courses for You
          </motion.h1>
          <p className="text-gray-200 dark:text-gray-400 mb-8">
            Discover, Learn, and Upskill with our wide range of courses
          </p>

          <form
            onSubmit={searchHandler}
            className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <Button
              type="submit"
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              Search
            </Button>
          </form>
          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
          >
            Explore Courses
          </Button>
        </div>
      </div>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-center mb-10">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 text-center px-4 py-6 rounded-xl shadow hover:scale-105 transition cursor-pointer"
            >
              <p className="font-semibold text-blue-600 dark:text-white">
                {cat}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Courses */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-center mb-10">Trending Courses</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {trendingCourses.length === 0 ? (
            <p className="text-center col-span-3">No trending courses available.</p>
          ) : (
            trendingCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer"
                onClick={() => navigate(`/course-detail/${course._id}`)}
              >
                <img
                  src={
                    course.courseThumbnail ||
                    "https://via.placeholder.com/300x180"
                  }
                  alt={course.courseTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{course.courseTitle}</h3>
                  <p className="text-sm text-gray-500">{course.subTitle}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-600 font-semibold">
                      ₹{course.coursePrice}
                    </span>
                    <span className="text-sm text-yellow-500 font-semibold">
                      🔥 {course.purchaseCount} bought
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 dark:bg-gray-950 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          What Our Learners Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="italic">
              "This platform helped me land my first tech job!"
            </p>
            <h4 className="font-bold mt-4">– Aayush Timilsina, Nepal</h4>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="italic">
              "Great content, practical courses, and excellent support."
            </p>
            <h4 className="font-bold mt-4">– Kanak Shakya</h4>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="italic">
              "Love the flexibility and variety of courses offered!"
            </p>
            <h4 className="font-bold mt-4">– Raj Pote</h4>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="dark:bg-gray-900 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="mb-6">Join thousands of learners from around the world.</p>
        <Button
          onClick={() => navigate("/login")}
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
        >
          Get Started
        </Button>
      </section>
    </>
  );
};

export default HeroSection;
