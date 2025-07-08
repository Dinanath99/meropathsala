// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
// const navigate = useNavigate();
//   const searchHandler = (e) => {
//     e.preventDefault();
//     if(searchQuery.trim() !== ""){
//       navigate(`/course/search?query=${searchQuery}`)
//     }
//     setSearchQuery("");
//   }

//   return (
//     <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-white text-4xl font-bold mb-4">
//           Find the Best Courses for You
//         </h1>
//         <p className="text-gray-200 dark:text-gray-400 mb-8">
//           Discover, Learn, and Upskill with our wide range of courses
//         </p>

//         <form onSubmit={searchHandler} className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
//           <Input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search Courses"
//             className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
//           />
//           <Button type="submit" className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</Button>
//         </form>
//        <Button onClick={()=> navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">Explore Courses</Button>
//       </div>
//     </div>
//   );
// };

//export default HeroSection;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  const trendingCourses = [
    {
      id: 1,
      title: "React for Beginners",
      instructor: "Rashik Chauhan",
      rating: 4.5,
      price: 19.99,
      image: "https://via.placeholder.com/300x180",
    },
    {
      id: 2,
      title: "Mastering Python",
      instructor: "Aayush",
      rating: 4.8,
      price: 24.99,
      image: "https://via.placeholder.com/300x180",
    },
    {
      id: 3,
      title: "UI/UX Design Basics",
      instructor: "Aadarsh",
      rating: 4.7,
      price: 14.99,
      image: "https://via.placeholder.com/300x180",
    },
  ];

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
              className="bg-white dark:bg-gray-800 text-center px-4 py-6 rounded-xl shadow hover:scale-105 transition"
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
        <h2 className="text-2xl font-bold text-center mb-10">
          Trending Courses
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {trendingCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-gray-500">by {course.instructor}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-yellow-500">⭐ {course.rating}</span>
                  <span className="text-green-600 font-semibold">
                    ₹{course.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
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
        <p className="mb-6">
          Join thousands of learners from around the world.
        </p>
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





// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useUpdateUserMutation } from "@/features/api/authApi";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";

// const HeroSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openModal, setOpenModal] = useState(false);
//   const [skills, setSkills] = useState("");
//   const [interests, setInterests] = useState("");

//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useSelector((state) => state.authSlice);
//   const [updateUser, { isLoading }] = useUpdateUserMutation();

//   // Trigger modal if user is missing skills or interests
//   useEffect(() => {
//     if (
//       isAuthenticated &&
//       user &&
//       (!user.skills ||
//         user.skills.length === 0 ||
//         !user.interests ||
//         user.interests.length === 0)
//     ) {
//       setOpenModal(true);
//     }
//   }, [user, isAuthenticated]);

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       navigate(`/course/search?query=${searchQuery}`);
//     }
//     setSearchQuery("");
//   };

//   const handleSubmit = async () => {
//     if (!skills.trim() || !interests.trim()) {
//       toast.error("Please enter both skills and interests");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("skills", skills);
//     formData.append("interests", interests);

//     try {
//       const res = await updateUser(formData).unwrap();
//       toast.success(res.message || "Profile updated successfully");
//       setOpenModal(false);
//       window.location.reload();
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update profile");
//     }
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

//       {/* CTA */}
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

//       {/* Interest Modal */}
//       <Dialog open={openModal}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Tell us about your interests</DialogTitle>
//             <DialogDescription>
//               Add your top skills and interests to get course recommendations.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-2">
//             <div>
//               <Label>Skills (comma separated)</Label>
//               <Input
//                 value={skills}
//                 onChange={(e) => setSkills(e.target.value)}
//                 placeholder="e.g. React, Node.js"
//               />
//             </div>
//             <div>
//               <Label>Interests (comma separated)</Label>
//               <Input
//                 value={interests}
//                 onChange={(e) => setInterests(e.target.value)}
//                 placeholder="e.g. Web Dev, UI/UX"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleSubmit} disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 "Save & Continue"
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default HeroSection;
