// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Send, MessageSquare, X } from "lucide-react";
// import { toast } from "sonner";

// const HeroSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [trendingCourses, setTrendingCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatMessages, setChatMessages] = useState([
//     { sender: "bot", text: "Hello! This is the MeroPathsala ChatBot How can I assist you with your learning today?" },
//   ]);
//   const [userMessage, setUserMessage] = useState("");
//   const [isChatLoading, setIsChatLoading] = useState(false);
//   const chatContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth || {});

//   // Fetch trending courses from backend API on mount
//   useEffect(() => {
//     const fetchTrendingCourses = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("http://localhost:8080/api/v1/course/trending");
//         if (!res.ok) {
//           throw new Error("Failed to fetch trending courses");
//         }
//         const data = await res.json();
//         setTrendingCourses(data.trendingCourses || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrendingCourses();
//   }, []);

//   // Scroll to the bottom of the chat when new messages are added
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatMessages]);

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       navigate(`/course/search?query=${searchQuery}`);
//     }
//     setSearchQuery("");
//   };

//   const handleChatSubmit = async (e) => {
//     e.preventDefault();
//     if (userMessage.trim() === "") return;

//     // Add user message to chat
//     setChatMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
//     setIsChatLoading(true);

//     try {
//       // Send message to backend with auth token
//       const headers = {
//         'Content-Type': 'application/json',
//       };
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }

//       const res = await fetch('http://localhost:8080/api/v1/ai/chat', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ message: userMessage }),
//       });

//       if (!res.ok) {
//         throw new Error('Failed to get response from server');
//       }

//       const data = await res.json();
//       setChatMessages((prev) => [...prev, { sender: "bot", text: data.message }]);
//     } catch (error) {
//       toast.error("Failed to get response. Please try again.");
//       setChatMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Sorry, something went wrong. Please try again." },
//       ]);
//     } finally {
//       setIsChatLoading(false);
//       setUserMessage("");
//     }
//   };

//   const categories = [
//     "Web Development",
//     "Design",
//     "AI/ML",
//     "Marketing",
//     "Data Science",
//   ];

//   if (loading) return <p className="text-center py-10">Loading trending courses...</p>;
//   if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

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
//               className="bg-white dark:bg-gray-800 text-center px-4 py-6 rounded-xl shadow hover:scale-105 transition cursor-pointer"
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
//         <h2 className="text-2xl font-bold text-center mb-10">Trending Courses</h2>
//         <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
//           {trendingCourses.length === 0 ? (
//             <p className="text-center col-span-3">No trending courses available.</p>
//           ) : (
//             trendingCourses.map((course) => (
//               <div
//                 key={course._id}
//                 className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer"
//                 onClick={() => navigate(`/course-detail/${course._id}`)}
//               >
//                 <img
//                   src={
//                     course.courseThumbnail ||
//                     "https://via.placeholder.com/300x180"
//                   }
//                   alt={course.courseTitle}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-bold">{course.courseTitle}</h3>
//                   <p className="text-sm text-gray-500">{course.subTitle}</p>
//                   <div className="flex items-center justify-between mt-2">
//                     <span className="text-green-600 font-semibold">
//                       ₹{course.coursePrice}
//                     </span>
//                     <span className="text-sm text-yellow-500 font-semibold">
//                       🔥 {course.purchaseCount} bought
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
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
//       <section className="dark:bg-gray-900 text-gray-500 py-16 text-center">
//         <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
//         <p className="mb-6">Join thousands of learners from around the world.</p>
//         <Button
//           onClick={() => navigate("/login")}
//           className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
//         >
//           Get Started
//         </Button>
//       </section>

//       {/* ChatBot Floating Button */}
//       <motion.div
//         className="fixed bottom-6 right-6 z-50"
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <Button
//           onClick={() => setIsChatOpen(true)}
//           className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-4 shadow-lg hover:from-blue-600 hover:to-indigo-700"
//         >
//           <MessageSquare className="w-6 h-6" />
//         </Button>
//       </motion.div>

//       {/* ChatBot Dialog */}
//       <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
//         <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
//           <DialogHeader className="flex justify-between items-center">
//             <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white">
//               MeroPathshala AI
//             </DialogTitle>
//             <Button
//               variant="ghost"
//               onClick={() => setIsChatOpen(false)}
//               className="p-1"
//             >
//               <X className="w-5 h-5 text-gray-500 dark:text-gray-300" />
//             </Button>
//           </DialogHeader>
//           <div
//             ref={chatContainerRef}
//             className="max-h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
//           >
//             {chatMessages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   message.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-xs p-3 rounded-lg ${
//                     message.sender === "user"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               </div>
//             ))}
//             {isChatLoading && (
//               <div className="flex justify-start">
//                 <div className="max-w-xs p-3 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100">
//                   Thinking...
//                 </div>
//               </div>
//             )}
//           </div>
//           <form onSubmit={handleChatSubmit} className="mt-4 flex gap-2">
//             <Input
//               value={userMessage}
//               onChange={(e) => setUserMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-grow border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg py-2"
//               disabled={isChatLoading}
//             />
//             <Button
//               type="submit"
//               disabled={isChatLoading}
//               className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800"
//             >
//               <Send className="w-5 h-5" />
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default HeroSection;

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Send, MessageSquare, X, Bot, User, Sparkles } from "lucide-react";
// import { toast } from "sonner";

// const HeroSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [trendingCourses, setTrendingCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatMessages, setChatMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hello! This is the MeroPathsala ChatBot. How can I assist you with your learning today?",
//     },
//   ]);
//   const [userMessage, setUserMessage] = useState("");
//   const [isChatLoading, setIsChatLoading] = useState(false);
//   const chatContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth || {});

//   useEffect(() => {
//     const fetchTrendingCourses = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("http://localhost:8080/api/v1/course/trending");
//         if (!res.ok) {
//           throw new Error("Failed to fetch trending courses");
//         }
//         const data = await res.json();
//         setTrendingCourses(data.trendingCourses || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrendingCourses();
//   }, []);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatMessages]);

//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       navigate(`/course/search?query=${searchQuery}`);
//     }
//     setSearchQuery("");
//   };

//   const handleChatSubmit = async (e) => {
//     e.preventDefault();
//     if (userMessage.trim() === "") return;

//     setChatMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
//     setIsChatLoading(true);

//     try {
//       const headers = {
//         "Content-Type": "application/json",
//       };
//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const res = await fetch("http://localhost:8080/api/v1/ai/chat", {
//         method: "POST",
//         headers,
//         body: JSON.stringify({ message: userMessage }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to get response from server");
//       }

//       const data = await res.json();
//       setChatMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: data.message },
//       ]);
//     } catch (error) {
//       toast.error("Failed to get response. Please try again.");
//       setChatMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "Sorry, something went wrong. Please try again.",
//         },
//       ]);
//     } finally {
//       setIsChatLoading(false);
//       setUserMessage("");
//     }
//   };

//   const categories = [
//     "Web Development",
//     "Design",
//     "AI/ML",
//     "Marketing",
//     "Data Science",
//   ];

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-400">Loading trending courses...</p>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-red-500 text-center">{error}</div>
//       </div>
//     );

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
//           >
//             Find the Best Courses for You
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className="text-xl text-gray-600 dark:text-gray-300 mb-10"
//           >
//             Discover, Learn, and Upskill with our wide range of courses
//           </motion.p>

//           <motion.form
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             onSubmit={searchHandler}
//             className="flex items-center max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden mb-8"
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
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700"
//             >
//               Search
//             </Button>
//           </motion.form>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//           >
//             <Button
//               onClick={() => navigate(`/course/search?query`)}
//               className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
//             >
//               Explore Courses
//             </Button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Popular Categories */}
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
//           Popular Categories
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {categories.map((cat, idx) => (
//             <motion.div
//               key={idx}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-6 py-3 cursor-pointer shadow-md hover:shadow-xl transition-shadow"
//             >
//               {cat}
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Trending Courses */}
//       <div className="bg-gray-50 dark:bg-gray-900 py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
//             Trending Courses
//           </h2>
//           {trendingCourses.length === 0 ? (
//             <p className="text-center text-gray-600 dark:text-gray-400">
//               No trending courses available.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {trendingCourses.map((course) => (
//                 <motion.div
//                   key={course._id}
//                   whileHover={{ y: -8 }}
//                   className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
//                   onClick={() => navigate(`/course-detail/${course._id}`)}
//                 >
//                   <img
//                     src={course.courseThumbnail}
//                     alt={course.courseTitle}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-6">
//                     <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
//                       {course.courseTitle}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
//                       {course.subTitle}
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
//                         ₹{course.coursePrice}
//                       </span>
//                       <span className="text-orange-500 text-sm font-medium">
//                         🔥 {course.purchaseCount} bought
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div className="py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
//             What Our Learners Say
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 text: "This platform helped me land my first tech job!",
//                 author: "Aayush Timilsina, Nepal",
//               },
//               {
//                 text: "Great content, practical courses, and excellent support.",
//                 author: "Kanak Shakya",
//               },
//               {
//                 text: "Love the flexibility and variety of courses offered!",
//                 author: "Raj Pote",
//               },
//             ].map((testimonial, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.2 }}
//                 className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
//               >
//                 <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
//                   "{testimonial.text}"
//                 </p>
//                 <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
//                   – {testimonial.author}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Call to Action */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold text-white mb-4">
//             Ready to Start Learning?
//           </h2>
//           <p className="text-indigo-100 text-lg mb-8">
//             Join thousands of learners from around the world.
//           </p>
//           <Button
//             onClick={() => navigate("/login")}
//             className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 shadow-xl text-lg"
//           >
//             Get Started
//           </Button>
//         </div>
//       </div>

//       {/* ChatBot Floating Button */}
//       <AnimatePresence>
//         {!isChatOpen && (
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0, opacity: 0 }}
//             className="fixed bottom-6 right-6 z-50"
//           >
//             <Button
//               onClick={() => setIsChatOpen(true)}
//               className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-5 shadow-2xl hover:from-blue-600 hover:to-indigo-700 hover:shadow-3xl transition-all duration-300 group"
//             >
//               <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
//             </Button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ChatBot Dialog - Enhanced UI */}
//       <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
//         <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-2 border-indigo-200 dark:border-indigo-800">
//           {/* Header */}
//           <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white rounded-t-lg">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
//                   <Bot className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <DialogTitle className="text-xl font-bold text-white">
//                     MeroPathshala AI
//                   </DialogTitle>
//                   <DialogDescription className="text-indigo-100 text-sm">
//                     Your learning assistant
//                   </DialogDescription>
//                 </div>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setIsChatOpen(false)}
//                 className="text-white hover:bg-white/20 rounded-full"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
//           </DialogHeader>

//           {/* Chat Messages */}
//           <div
//             ref={chatContainerRef}
//             className="flex-1 overflow-y-auto p-6 space-y-4 h-[400px] bg-white/50 dark:bg-gray-900/50"
//           >
//             <AnimatePresence>
//               {chatMessages.map((message, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex gap-3 ${
//                     message.sender === "user" ? "flex-row-reverse" : "flex-row"
//                   }`}
//                 >
//                   {/* Avatar */}
//                   <div
//                     className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
//                       message.sender === "user"
//                         ? "bg-gradient-to-br from-indigo-500 to-purple-600"
//                         : "bg-gradient-to-br from-blue-500 to-indigo-600"
//                     } shadow-lg`}
//                   >
//                     {message.sender === "user" ? (
//                       <User className="w-5 h-5 text-white" />
//                     ) : (
//                       <Bot className="w-5 h-5 text-white" />
//                     )}
//                   </div>

//                   {/* Message Bubble */}
//                   <div
//                     className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-md ${
//                       message.sender === "user"
//                         ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-none"
//                         : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700"
//                     }`}
//                   >
//                     <p className="text-sm leading-relaxed whitespace-pre-wrap">
//                       {message.text}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {/* Loading Indicator */}
//             {isChatLoading && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex gap-3"
//               >
//                 <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3 border border-gray-200 dark:border-gray-700 shadow-md">
//                   <div className="flex items-center gap-2">
//                     <div className="flex gap-1">
//                       <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
//                       <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
//                       <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
//                     </div>
//                     <span className="text-sm text-gray-600 dark:text-gray-400">
//                       Thinking...
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           {/* Input Area */}
//           <DialogFooter className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
//             <form onSubmit={handleChatSubmit} className="flex gap-2 w-full">
//               <Input
//                 value={userMessage}
//                 onChange={(e) => setUserMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-grow border-2 border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-full py-3 px-5 bg-gray-50 dark:bg-gray-900"
//                 disabled={isChatLoading}
//               />
//               <Button
//                 type="submit"
//                 disabled={isChatLoading || !userMessage.trim()}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full p-3 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
//               >
//                 <Send className="w-5 h-5" />
//               </Button>
//             </form>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default HeroSection;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Send,
  MessageSquare,
  X,
  Bot,
  User,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

// Component to parse and render message content with course links
const MessageContent = ({ text, sender, navigate }) => {
  // Regex to detect course links in format [Course Name](url)
  const linkRegex = /\[([^\]]+)\]\((http[^\)]+)\)/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.substring(lastIndex, match.index),
      });
    }

    // Add the link
    parts.push({
      type: "link",
      title: match[1],
      url: match[2],
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.substring(lastIndex),
    });
  }

  // If no links found, render plain text
  if (parts.length === 0) {
    return (
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
    );
  }

  const handleCourseClick = (url) => {
    // Extract course ID from URL
    const match = url.match(/course-detail\/([a-zA-Z0-9]+)/);
    if (match) {
      navigate(`/course-detail/${match[1]}`);
    }
  };

  return (
    <div className="text-sm leading-relaxed space-y-2">
      {parts.map((part, index) => {
        if (part.type === "text") {
          return (
            <p key={index} className="whitespace-pre-wrap">
              {part.content}
            </p>
          );
        } else {
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCourseClick(part.url)}
              className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                sender === "user"
                  ? "bg-white/20 hover:bg-white/30"
                  : "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 border border-indigo-200 dark:border-indigo-800"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  sender === "user"
                    ? "bg-white/30"
                    : "bg-gradient-to-br from-indigo-500 to-purple-600"
                }`}
              >
                <BookOpen
                  className={`w-4 h-4 ${
                    sender === "user" ? "text-white" : "text-white"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p
                  className={`font-semibold text-sm ${
                    sender === "user"
                      ? "text-white"
                      : "text-indigo-700 dark:text-indigo-300"
                  }`}
                >
                  {part.title}
                </p>
                <p
                  className={`text-xs ${
                    sender === "user"
                      ? "text-white/80"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Click to view course
                </p>
              </div>
              <ExternalLink
                className={`w-4 h-4 ${
                  sender === "user"
                    ? "text-white/60"
                    : "text-indigo-400 dark:text-indigo-500"
                }`}
              />
            </motion.div>
          );
        }
      })}
    </div>
  );
};

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hello! This is the MeroPathsala ChatBot. How can I assist you with your learning today?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth || {});

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (userMessage.trim() === "") return;

    setChatMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsChatLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("http://localhost:8080/api/v1/ai/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from server");
      }

      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.message },
      ]);
    } catch (error) {
      toast.error("Failed to get response. Please try again.");
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsChatLoading(false);
      setUserMessage("");
    }
  };

  const categories = [
    "Web Development",
    "Design",
    "AI/ML",
    "Marketing",
    "Data Science",
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading trending courses...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
          >
            Find the Best Courses for You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-10"
          >
            Discover, Learn, and Upskill with our wide range of courses
          </motion.p>

          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={searchHandler}
            className="flex items-center max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden mb-8"
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
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-indigo-700 hover:to-purple-700"
            >
              Search
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => navigate(`/course/search?query`)}
              className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
            >
              Explore Courses
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Popular Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-6 py-3 cursor-pointer shadow-md hover:shadow-xl transition-shadow"
            >
              {cat}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending Courses */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Trending Courses
          </h2>
          {trendingCourses.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No trending courses available.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingCourses.map((course) => (
                <motion.div
                  key={course._id}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/course-detail/${course._id}`)}
                >
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                      {course.courseTitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {course.subTitle}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                        Rs{course.coursePrice}
                      </span>
                      <span className="text-orange-500 text-sm font-medium">
                        🔥 {course.purchaseCount} bought
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            What Our Learners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "This platform helped me land my first tech job!",
                author: "Aayush Timilsina, Nepal",
              },
              {
                text: "Great content, practical courses, and excellent support.",
                author: "Kanak Shakya",
              },
              {
                text: "Love the flexibility and variety of courses offered!",
                author: "Raj Pote",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  – {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join thousands of learners from around the world.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 shadow-xl text-lg"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* ChatBot Floating Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsChatOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-5 shadow-2xl hover:from-blue-600 hover:to-indigo-700 hover:shadow-3xl transition-all duration-300 group"
            >
              <MessageSquare className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ChatBot Dialog - Enhanced UI */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-2 border-indigo-200 dark:border-indigo-800">
          {/* Header */}
          <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-white">
                    MeroPathshala AI
                  </DialogTitle>
                  <DialogDescription className="text-indigo-100 text-sm">
                    Your learning assistant
                  </DialogDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 h-[400px] bg-white/50 dark:bg-gray-900/50"
          >
            <AnimatePresence>
              {chatMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                        : "bg-gradient-to-br from-blue-500 to-indigo-600"
                    } shadow-lg`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-md ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-none"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <MessageContent
                      text={message.text}
                      sender={message.sender}
                      navigate={navigate}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isChatLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3 border border-gray-200 dark:border-gray-700 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Thinking...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <DialogFooter className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleChatSubmit} className="flex gap-2 w-full">
              <Input
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border-2 border-indigo-200 dark:border-indigo-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-full py-3 px-5 bg-gray-50 dark:bg-gray-900"
                disabled={isChatLoading}
              />
              <Button
                type="submit"
                disabled={isChatLoading || !userMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full p-3 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
