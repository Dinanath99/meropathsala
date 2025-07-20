

// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useUpdateUserMutation } from "@/features/api/authApi";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";

// // ✅ Lucide icons for roles
// import {
//   Brain,
//   Server,
//   UserCog,
//   BarChart3,
//   Presentation,
//   PieChart,
//   FileSearch,
//   MonitorCheck,
//   ClipboardList,
// } from "lucide-react";

// const goalsOptions = [
//   "Start my career",
//   "Change my career",
//   "Grow in my current role",
//   "Explore topics outside of work",
// ];

// // ✅ Replaced images with Lucide icons
// const rolesOptions = [
//   { label: "Data Scientist", icon: Brain },
//   { label: "IT Project Manager", icon: ClipboardList },
//   { label: "Technology Consultant", icon: UserCog },
//   { label: "Machine Learning Engineer", icon: Server },
//   { label: "Business Intelligence Analyst", icon: BarChart3 },
//   { label: "Product Manager", icon: Presentation },
//   { label: "Business / Management Analyst", icon: PieChart },
//   { label: "Data Analyst", icon: FileSearch },
//   { label: "Data Warehouse Developer", icon: MonitorCheck },
// ];

// const skillsOptions = [
//   "Data Science",
//   "Machine Learning",
//   "Python Programming",
//   "SQL",
//   "Data Analysis",
//   "Statistics",
//   "Algorithms",
//   "Data Visualization",
//   "Deep Learning",
// ];

// const educationLevels = [
//   "Less than high school diploma",
//   "High school diploma",
//   "Some college",
//   "Associate Degree",
//   "Bachelor's degree",
//   "Master's degree",
//   "Professional school degree",
//   "Doctorate degree",
// ];

// const experienceLevels = ["beginner", "intermediate", "advanced"];

// const stepVariants = {
//   initial: { opacity: 0, x: 50 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: -50 },
// };

// const cardVariants = {
//   hover: { scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" },
//   tap: { scale: 0.95 },
// };

// const buttonVariants = {
//   hover: { scale: 1.05 },
//   tap: { scale: 0.95 },
// };

// const MainLayout = () => {
//   const auth = useSelector((state) => state.auth || {});
//   const { user, isAuthenticated } = auth;
//   const navigate = useNavigate();

//   const [openModal, setOpenModal] = useState(false);
//   const [step, setStep] = useState(0);

//   const [goal, setGoal] = useState("");
//   const [selectedRoles, setSelectedRoles] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [jobTitle, setJobTitle] = useState("");
//   const [educationLevel, setEducationLevel] = useState("");
//   const [experienceLevel, setExperienceLevel] = useState("");
//   const [interests, setInterests] = useState("");

//   const [updateUser, { isLoading }] = useUpdateUserMutation();

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       if (user.role === "instructor") {
//         navigate("/");
//       } else if (
//         (!user.skills || user.skills.length === 0) ||
//         (!user.interests || user.interests.length === 0)
//       ) {
//         setOpenModal(true);
//       }
//     }
//   }, [user, isAuthenticated, navigate]);

//   const toggleRole = (role) => {
//     setSelectedRoles((prev) =>
//       prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
//     );
//   };

//   const toggleSkill = (skill) => {
//     setSelectedSkills((prev) =>
//       prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
//     );
//   };

//   const handleNext = () => {
//     if (step === 0 && !goal) return toast.error("Please select a goal.");
//     if (step === 1 && selectedRoles.length === 0)
//       return toast.error("Please select at least one role.");
//     if (step === 2 && selectedSkills.length === 0)
//       return toast.error("Please select at least one skill.");
//     if (step === 3 && !jobTitle.trim())
//       return toast.error("Please enter your current job title.");
//     if (step === 4 && (!educationLevel || !experienceLevel))
//       return toast.error("Please complete all fields.");
//     setStep((prev) => prev + 1);
//   };

//   const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

//   const handleSubmit = async () => {
//     const interestsArr = interests
//       .split(",")
//       .map((i) => i.trim())
//       .filter(Boolean);

//     const payload = {
//       goal,
//       preferredRoles: selectedRoles,
//       skills: selectedSkills,
//       jobTitle,
//       educationLevel,
//       experienceLevel,
//       interests: interestsArr,
//     };

//     try {
//       const response = await updateUser(payload).unwrap();
//       toast.success(response.message || "Preferences updated");
//       setOpenModal(false);
//       window.location.reload();
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update preferences");
//     }
//   };

//   const renderStepContent = () => {
//     switch (step) {
//       case 0:
//         return (
//           <>
//             <DialogTitle className="text-2xl font-semibold">
//               Hello {user?.name || "Student"}!
//             </DialogTitle>
//             <DialogDescription className="text-gray-600 mt-2">
//               Tell me a little about yourself so I can make the best recommendations.
//               First, what's your goal?
//             </DialogDescription>
//             <motion.div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {goalsOptions.map((g) => (
//                 <motion.button
//                   key={g}
//                   onClick={() => setGoal(g)}
//                   className={`rounded-lg border px-5 py-4 font-medium text-left transition-shadow
//                     ${goal === g
//                       ? "bg-blue-600 text-white shadow-lg"
//                       : "bg-white text-gray-800 border-gray-300 hover:shadow-md"
//                     }`}
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                   type="button"
//                 >
//                   {g}
//                 </motion.button>
//               ))}
//             </motion.div>
//           </>
//         );
//       case 1:
//         return (
//           <>
//             <DialogTitle className="text-xl font-semibold">Step 2 of 6</DialogTitle>
//             <DialogDescription className="text-gray-700 mt-1 mb-4">
//               Great! Which role(s) are you interested in?
//             </DialogDescription>
//             <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[320px] overflow-auto">
//               {rolesOptions.map(({ label, icon: Icon }) => {
//                 const isSelected = selectedRoles.includes(label);
//                 return (
//                   <motion.button
//                     key={label}
//                     onClick={() => toggleRole(label)}
//                     type="button"
//                     className={`rounded-xl border px-5 py-4 text-center flex flex-col items-center justify-center gap-2 transition-shadow
//                 ${isSelected
//                         ? "bg-blue-600 text-white border-blue-600 shadow-lg"
//                         : "bg-white text-gray-800 border-gray-300 hover:shadow-md hover:border-blue-400"
//                       }`}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                   >
//                     <Icon className={`h-7 w-7 ${isSelected ? "text-white" : "text-blue-600"}`} />
//                     <span className="text-sm font-semibold">{label}</span>
//                   </motion.button>
//                 );
//               })}
//             </motion.div>
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <DialogTitle className="text-xl font-semibold">Step 3 of 6</DialogTitle>
//             <DialogDescription className="text-gray-700 mt-1 mb-2">
//               Select the skills you'd like to develop
//             </DialogDescription>
//             <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[280px] overflow-auto mt-4">
//               {skillsOptions.map((skill) => {
//                 const isSelected = selectedSkills.includes(skill);
//                 return (
//                   <motion.button
//                     key={skill}
//                     onClick={() => toggleSkill(skill)}
//                     type="button"
//                     className={`rounded-xl border px-5 py-4 text-sm font-semibold text-center transition-shadow
//             ${isSelected
//                         ? "bg-blue-600 text-white border-blue-600 shadow-lg"
//                         : "bg-white text-gray-800 border-gray-300 hover:shadow-md hover:border-blue-400"
//                       }`}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                   >
//                     {skill}
//                   </motion.button>
//                 );
//               })}
//             </motion.div>
//           </>

//         );
//       case 3:
//         return (
//           <>
//             <DialogTitle className="text-xl font-semibold">Step 4 of 6</DialogTitle>
//             <DialogDescription className="text-gray-700 mt-1 mb-2">
//               What's your current job title?
//             </DialogDescription>
//             <Input
//               type="text"
//               placeholder="e.g. Backend Developer"
//               value={jobTitle}
//               onChange={(e) => setJobTitle(e.target.value)}
//               className="mt-2"
//             />
//           </>
//         );
//       case 4:
//         return (
//           <>
//   <DialogTitle className="text-xl font-semibold">Step 5 of 6</DialogTitle>
//   <DialogDescription className="text-gray-700 mt-1 mb-4">
//     Tell us about your education and experience
//   </DialogDescription>

//   {/* Education Level */}
//   <Label className="font-medium text-gray-700">Education Level</Label>
//   <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
//     {educationLevels.map((level) => {
//       const isSelected = educationLevel === level;
//       return (
//         <motion.button
//           key={level}
//           onClick={() => setEducationLevel(level)}
//           type="button"
//           className={`rounded-lg border px-4 py-3 text-sm font-medium text-left transition
//             ${isSelected
//               ? "bg-blue-600 text-white border-blue-600 shadow-md"
//               : "bg-white text-gray-800 border-gray-300 hover:border-blue-500 hover:shadow"
//             }`}
//           variants={buttonVariants}
//           whileHover="hover"
//           whileTap="tap"
//         >
//           {level}
//         </motion.button>
//       );
//     })}
//   </div>

//   {/* Experience Level */}
//   <Label className="font-medium text-gray-700 mt-6 block">Experience Level</Label>
//   <div className="mt-3 flex flex-wrap gap-3">
//     {experienceLevels.map((level) => {
//       const isActive = experienceLevel === level;
//       return (
//         <motion.button
//           key={level}
//           onClick={() => setExperienceLevel(level)}
//           type="button"
//           className={`px-4 py-2 text-sm rounded-md font-semibold capitalize border transition
//             ${isActive
//               ? "bg-blue-600 text-white border-blue-600 shadow"
//               : "bg-white text-gray-800 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
//             }`}
//           variants={buttonVariants}
//           whileHover="hover"
//           whileTap="tap"
//         >
//           {level}
//         </motion.button>
//       );
//     })}
//   </div>
// </>

//         );
//       case 5:
//         return (
//           <>
//             <DialogTitle className="text-xl font-semibold">Step 6 of 6</DialogTitle>
//             <DialogDescription className="text-gray-700 mt-1 mb-2">
//               What are your interests? (comma separated)
//             </DialogDescription>
//             <Input
//               placeholder="e.g. Web Development, Backend, UI/UX"
//               value={interests}
//               onChange={(e) => setInterests(e.target.value)}
//               className="mt-2"
//             />
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-1 mt-16">
//         <Outlet />
//       </div>

//       <Dialog open={openModal}>
//         <DialogContent className="max-w-lg sm:max-w-xl">
//           <DialogHeader>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={step}
//                 variants={stepVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 transition={{ duration: 0.3 }}
//               >
//                 {renderStepContent()}
//               </motion.div>
//             </AnimatePresence>
//           </DialogHeader>

//           <DialogFooter className="flex justify-between mt-6">
//             {step > 0 && (
//               <Button variant="outline" onClick={handlePrev}>
//                 Previous
//               </Button>
//             )}
//             {step < 5 ? (
//               <Button onClick={handleNext}>Next</Button>
//             ) : (
//               <Button onClick={handleSubmit} disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   "Save & Continue"
//                 )}
//               </Button>
//             )}
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default MainLayout;



// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useUpdateUserMutation } from "@/features/api/authApi";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Brain, Server, UserCog, BarChart3, Presentation,
//   PieChart, FileSearch, MonitorCheck, ClipboardList,
// } from "lucide-react";

// // Constants
// const goalsOptions = ["Start my career", "Change my career", "Grow in my current role", "Explore topics outside of work"];
// const rolesOptions = [
//   { label: "Data Scientist", icon: Brain },
//   { label: "IT Project Manager", icon: ClipboardList },
//   { label: "Technology Consultant", icon: UserCog },
//   { label: "Machine Learning Engineer", icon: Server },
//   { label: "Business Intelligence Analyst", icon: BarChart3 },
//   { label: "Product Manager", icon: Presentation },
//   { label: "Business Analyst", icon: PieChart },
//   { label: "Data Analyst", icon: FileSearch },
//   { label: "Data Warehouse Developer", icon: MonitorCheck },
// ];
// const skillsOptions = [
//   "Data Science", "Machine Learning", "Python Programming", "SQL", "Data Analysis",
//   "Statistics", "Algorithms", "Data Visualization", "Deep Learning",
// ];
// const educationLevels = [
//   "Less than high school diploma", "High school diploma", "Some college", "Associate Degree",
//   "Bachelor's degree", "Master's degree", "Professional school degree", "Doctorate degree",
// ];
// const experienceLevels = ["beginner", "intermediate", "advanced"];

// // Variants
// const stepVariants = {
//   initial: { opacity: 0, y: 30 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -30 }
// };
// const buttonVariants = {
//   hover: { scale: 1.05, transition: { duration: 0.2 } },
//   tap: { scale: 0.95 }
// };
// const cardVariants = {
//   hover: { y: -5, transition: { duration: 0.2 } }
// };

// // Main Component
// const MainLayout = () => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth || {});
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = useState(false);
//   const [step, setStep] = useState(0);

//   const [goal, setGoal] = useState("");
//   const [selectedRoles, setSelectedRoles] = useState([]);
//   const [customRole, setCustomRole] = useState("");
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [customSkill, setCustomSkill] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [educationLevel, setEducationLevel] = useState("");
//   const [experienceLevel, setExperienceLevel] = useState("");
//   const [interests, setInterests] = useState("");

//   const [updateUser, { isLoading }] = useUpdateUserMutation();

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       if (user.role === "instructor") {
//         navigate("/");
//       } else if (!user.skills?.length || !user.interests?.length) {
//         setOpenModal(true);
//       }
//     }
//   }, [user, isAuthenticated, navigate]);

//   const toggleItem = (item, list, setter) => {
//     setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
//   };

//   const handleNext = () => {
//     switch (step) {
//       case 0:
//         if (!goal) return toast.error("Please select a goal.");
//         break;
//       case 1:
//         if (!selectedRoles.length && !customRole.trim()) return toast.error("Select or enter a role.");
//         break;
//       case 2:
//         if (!selectedSkills.length && !customSkill.trim()) return toast.error("Select or enter a skill.");
//         break;
//       case 3:
//         if (!jobTitle.trim()) return toast.error("Please enter your job title.");
//         break;
//       case 4:
//         if (!educationLevel || !experienceLevel) return toast.error("Please fill all fields.");
//         break;
//     }
//     setStep((prev) => prev + 1);
//   };

//   const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

//   const handleSubmit = async () => {
//     const allRoles = [...selectedRoles, ...(customRole ? [customRole.trim()] : [])];
//     const allSkills = [...selectedSkills, ...(customSkill ? [customSkill.trim()] : [])];
//     const interestList = interests.split(",").map((i) => i.trim()).filter(Boolean);

//     const payload = {
//       goal,
//       preferredRoles: allRoles,
//       skills: allSkills,
//       jobTitle,
//       educationLevel,
//       experienceLevel,
//       interests: interestList,
//     };

//     try {
//       const res = await updateUser(payload).unwrap();
//       toast.success(res.message || "Profile updated!");
//       setOpenModal(false);
//       window.location.reload();
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update");
//     }
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 0:
//         return (
//           <>
//             <DialogTitle className="text-3xl font-bold text-gray-800">Welcome, {user?.name || "User"}!</DialogTitle>
//             <DialogDescription className="text-gray-500 text-lg mt-2">Choose a goal to tailor your journey.</DialogDescription>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
//               {goalsOptions.map((g) => (
//                 <motion.div
//                   key={g}
//                   variants={cardVariants}
//                   whileHover="hover"
//                 >
//                   <Button
//                     onClick={() => setGoal(g)}
//                     className={`w-full py-4 rounded-xl text-lg font-medium transition-all duration-300 shadow-md ${goal === g
//                         ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
//                         : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
//                       }`}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                   >
//                     {g}
//                   </Button>
//                 </motion.div>
//               ))}
//             </div>
//           </>
//         );
//       case 1:
//         return (
//           <>
//             <DialogTitle className="text-3xl font-bold text-gray-800">Interested Roles</DialogTitle>
//             <DialogDescription className="text-gray-500 text-lg mt-2">Select or add roles that inspire you.</DialogDescription>
//             {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
//               {rolesOptions.map(({ label, icon: Icon }) => (
//                 <motion.div
//                   key={label}
//                   variants={cardVariants}
//                   whileHover="hover"
//                 >
//                   <Button
//                     onClick={() => toggleItem(label, selectedRoles, setSelectedRoles)}
//                     className={`w-full py-4 flex flex-col items-center rounded-xl shadow-md transition-all duration-300 ${
//                       selectedRoles.includes(label)
//                         ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
//                         : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
//                     }`}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                   >
//                     <Icon className="w-8 h-8 mb-2" />
//                     <span className="text-sm font-medium">{label}</span>
//                   </Button>
//                 </motion.div>
//               ))}
//             </div> */}


//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//               {rolesOptions.map(({ label, icon: Icon }) => (
//                 <motion.div
//                   key={label}
//                   variants={cardVariants}
//                   whileHover="hover"
//                   className="h-32"
//                 >
//                   <Button
//                     onClick={() => toggleItem(label, selectedRoles, setSelectedRoles)}
//                     className={`w-full h-full flex flex-col items-center justify-center rounded-2xl shadow-lg transition-all duration-300 p-6 ${selectedRoles.includes(label)
//                         ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
//                         : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:shadow-xl"
//                       }`}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                   >
//                     <Icon className="w-10 h-10 mb-3" />
//                     <span className="text-base font-semibold text-center">{label}</span>
//                   </Button>
//                 </motion.div>
//               ))}
//             </div>
//             <Input
//               placeholder="Add a custom role (optional)"
//               className="mt-6 text-black border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
//               value={customRole}
//               onChange={(e) => setCustomRole(e.target.value)}
//             />
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <DialogTitle className="text-3xl font-bold text-gray-800">Skills</DialogTitle>
//             <DialogDescription className="text-gray-500 text-lg mt-2">Select or add skills you want to master.</DialogDescription>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
//               {skillsOptions.map((skill) => (
//                 <motion.div
//                   key={skill}
//                   variants={cardVariants}
//                   whileHover="hover"
//                 >
//                   <Button
//                     onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills)}
//                     className={`w-full py-3 rounded-xl text-sm font-medium shadow-md transition-all duration-300 ${selectedSkills.includes(skill)
//                         ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
//                         : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
//                       }`}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                   >
//                     {skill}
//                   </Button>
//                 </motion.div>
//               ))}
//             </div>
//             <Input
//               placeholder="Add a custom skill (optional)"
//               className="mt-6 text-black border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
//               value={customSkill}
//               onChange={(e) => setCustomSkill(e.target.value)}
//             />
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <DialogTitle className="text-3xl font-bold text-gray-800">Job Title</DialogTitle>
//             <DialogDescription className="text-gray-500 text-lg mt-2">Tell us about your current or most recent role.</DialogDescription>
//             <Input
//               className="mt-6 text-black border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
//               placeholder="e.g. Software Engineer"
//               value={jobTitle}
//               onChange={(e) => setJobTitle(e.target.value)}
//             />
//           </>
//         );
//       case 4:
//         return (
//           <>
//             <DialogTitle className="text-3xl font-bold text-gray-800">Education & Experience</DialogTitle>
//             <DialogDescription className="text-gray-500 text-lg mt-2">Share your education and experience level.</DialogDescription>
//             <Label className="mt-6 text-gray-700 font-semibold text-lg">Education</Label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
//               {educationLevels.map((ed) => (
//                 <motion.div
//                   key={ed}
//                   variants={cardVariants}
//                   whileHover="hover"
//                 >
//                   <Button
//                     onClick={() => setEducationLevel(ed)}
//                     className={`w-full py-3 rounded-xl text-sm font-medium shadow-md transition-all duration-300 ${educationLevel === ed
//                         ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
//                         : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
//                       }`}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                   >
//                     {ed}
//                   </Button>
//                 </motion.div>
//               ))}
//             </div>
//             <Label className="mt-6 block text-gray-700 font-semibold text-lg">Experience</Label>
//             <div className="flex gap-4 mt-3">
//               {experienceLevels.map((ex) => (
//                 <motion.div
//                   key={ex}
//                   variants={cardVariants}
//                   whileHover="hover"
//                 >
//                   <Button
//                     onClick={() => setExperienceLevel(ex)}
//                     className={`w-full py-3 rounded-xl capitalize text-sm font-medium shadow-md transition-all duration-300 ${experienceLevel === ex
//                         ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
//                         : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
//                       }`}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                   >
//                     {ex}
//                   </Button>
//                 </motion.div>
//               ))}
//             </div>
//           </>
//         );
//       case 5:
//         return (
//           <>
//             <DialogTitle className="text-3xl font-bold text-gray-800">Interests (Optional)</DialogTitle>
//             <DialogDescription className="text-gray-500 text-lg mt-2">Add interests to personalize your experience (comma-separated).</DialogDescription>
//             <Input
//               className="mt-6 border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
//               placeholder="e.g. UI/UX, Web Dev"
//               value={interests}
//               onChange={(e) => setInterests(e.target.value)}
//             />
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
//       <Navbar />
//       <div className="flex-1 mt-16 px-4 sm:px-8 lg:px-12">
//         <Outlet />
//       </div>

//       <Dialog open={openModal}>
//         <DialogContent className="max-w-lg sm:max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
//           <DialogHeader>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={step}
//                 variants={stepVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//               >
//                 {renderStep()}
//               </motion.div>
//             </AnimatePresence>
//           </DialogHeader>

//           <DialogFooter className="mt-8 flex justify-between">
//             {step > 0 && (
//               <Button
//                 variant="outline"
//                 onClick={handlePrev}
//                 className="border-gray-300 text-gray-700 bg-white hover:bg-gray-500 rounded-lg py-3 px-6"
//               >
//                 Back
//               </Button>
//             )}
//             {step < 5 ? (
//               <Button
//                 onClick={handleNext}
//                 className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 rounded-lg py-3 px-6"
//               >
//                 Next
//               </Button>
//             ) : (
//               <Button
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 rounded-lg py-3 px-6"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...
//                   </>
//                 ) : (
//                   "Save & Continue"
//                 )}
//               </Button>
//             )}
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default MainLayout;




import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Server, UserCog, BarChart3, Presentation,
  PieChart, FileSearch, MonitorCheck, ClipboardList,
} from "lucide-react";

// Constants
const goalsOptions = ["Start my career", "Change my career", "Grow in my current role", "Explore topics outside of work"];
const rolesOptions = [
  { label: "Data Scientist", icon: Brain },
  { label: "IT Project Manager", icon: ClipboardList },
  { label: "Technology Consultant", icon: UserCog },
  { label: "Machine Learning Engineer", icon: Server },
  { label: "Business Intelligence Analyst", icon: BarChart3 },
  { label: "Product Manager", icon: Presentation },
  { label: "Business Analyst", icon: PieChart },
  { label: "Data Analyst", icon: FileSearch },
  { label: "Data Warehouse Developer", icon: MonitorCheck },
];
const skillsOptions = [
  "Data Science", "Machine Learning", "Python Programming", "SQL", "Data Analysis",
  "Statistics", "Algorithms", "Data Visualization", "Deep Learning",
];
const educationLevels = [
  "Less than high school diploma", "High school diploma", "Some college", "Associate Degree",
  "Bachelor's degree", "Master's degree", "Professional school degree", "Doctorate degree",
];
const experienceLevels = ["beginner", "intermediate", "advanced"];

// Variants
const stepVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};
const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};
const cardVariants = {
  hover: { y: -5, transition: { duration: 0.2 } }
};

// Main Component
const MainLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(0);

  const [goal, setGoal] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [customRole, setCustomRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [interests, setInterests] = useState("");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "instructor") {
        navigate("/");
      } else if (!user.skills?.length) {
        setOpenModal(true);
      }
    }
  }, [user, isAuthenticated, navigate]);

  const toggleItem = (item, list, setter) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleNext = () => {
    switch (step) {
      case 0:
        if (!goal) return toast.error("Please select a goal.");
        break;
      case 1:
        if (!selectedRoles.length && !customRole.trim()) return toast.error("Select or enter a role.");
        break;
      case 2:
        if (!selectedSkills.length && !customSkill.trim()) return toast.error("Select or enter a skill.");
        break;
      case 3:
        if (!jobTitle.trim()) return toast.error("Please enter your job title.");
        break;
      case 4:
        if (!educationLevel || !experienceLevel) return toast.error("Please fill all fields.");
        break;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const allRoles = [...selectedRoles, ...(customRole ? [customRole.trim()] : [])];
    const allSkills = [...selectedSkills, ...(customSkill ? [customSkill.trim()] : [])];
    const interestList = interests.split(",").map((i) => i.trim()).filter(Boolean);

    const payload = {
      goal,
      preferredRoles: allRoles,
      skills: allSkills,
      jobTitle,
      educationLevel,
      experienceLevel,
      interests: interestList, // Interests are optional, so empty array is valid
    };

    try {
      const res = await updateUser(payload).unwrap();
      toast.success(res.message || "Profile updated!", { duration: 3000 });
      setOpenModal(false);
      navigate("/"); // Replace with your desired route
    } catch (err) {
      console.error("Update user error:", err); // Log for debugging
      toast.error(err?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <DialogTitle className="text-3xl font-bold text-gray-800">Welcome, {user?.name || "User"}!</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Choose a goal to tailor your journey.</DialogDescription>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {goalsOptions.map((g) => (
                <motion.div
                  key={g}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Button
                    onClick={() => setGoal(g)}
                    className={`w-full py-4 rounded-xl text-lg font-medium transition-all duration-300 shadow-md ${
                      goal === g
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {g}
                  </Button>
                </motion.div>
              ))}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <DialogTitle className="text-3xl font-bold text-gray-800">Interested Roles</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Select or add roles that inspire you.</DialogDescription>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {rolesOptions.map(({ label, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={cardVariants}
                  whileHover="hover"
                  className="h-32"
                >
                  <Button
                    onClick={() => toggleItem(label, selectedRoles, setSelectedRoles)}
                    className={`w-full h-full flex flex-col items-center justify-center rounded-2xl shadow-lg transition-all duration-300 p-6 ${
                      selectedRoles.includes(label)
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:shadow-xl"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Icon className="w-10 h-10 mb-3" />
                    <span className="text-base font-semibold text-center">{label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            <Input
              placeholder="Add a custom role (optional)"
              className="mt-6 text-black border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <DialogTitle className="text-3xl font-bold text-gray-800">Skills</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Select or add skills you want to master.</DialogDescription>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {skillsOptions.map((skill) => (
                <motion.div
                  key={skill}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Button
                    onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills)}
                    className={`w-full py-3 rounded-xl text-sm font-medium shadow-md transition-all duration-300 ${
                      selectedSkills.includes(skill)
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {skill}
                  </Button>
                </motion.div>
              ))}
            </div>
            <Input
              placeholder="Add a custom skill (optional)"
              className="mt-6 text-black border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
            />
          </>
        );
      case 3:
        return (
          <>
            <DialogTitle className="text-3xl font-bold text-gray-800">Job Title</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Tell us about your current or most recent role.</DialogDescription>
            <Input
              className="mt-6 text-black border-gray-200 focus:ring-2 focus:ring-indigo-500 rounded-lg py-3"
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </>
        );
      case 4:
        return (
          <>
            <DialogTitle className="text-3xl font-bold text-gray-800">Education & Experience</DialogTitle>
            <DialogDescription className="text-gray-500 text-lg mt-2">Share your education and experience level.</DialogDescription>
            <Label className="mt-6 text-gray-700 font-semibold text-lg">Education</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              {educationLevels.map((ed) => (
                <motion.div
                  key={ed}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Button
                    onClick={() => setEducationLevel(ed)}
                    className={`w-full py-3 rounded-xl text-sm font-medium shadow-md transition-all duration-300 ${
                      educationLevel === ed
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {ed}
                  </Button>
                </motion.div>
              ))}
            </div>
            <Label className="mt-6 block text-gray-700 font-semibold text-lg">Experience</Label>
            <div className="flex gap-4 mt-3">
              {experienceLevels.map((ex) => (
                <motion.div
                  key={ex}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Button
                    onClick={() => setExperienceLevel(ex)}
                    className={`w-full py-3 rounded-xl capitalize text-sm font-medium shadow-md transition-all duration-300 ${
                      experienceLevel === ex
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {ex}
                  </Button>
                </motion.div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="flex-1 mt-16 px-4 sm:px-8 lg:px-12">
        <Outlet />
      </div>

      <Dialog open={openModal}>
        <DialogContent className="max-w-lg sm:max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
          <DialogHeader>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </DialogHeader>

          <DialogFooter className="mt-8 flex justify-between">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="border-gray-300 text-gray-700 bg-white hover:bg-gray-100 rounded-lg py-3 px-6"
              >
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 rounded-lg py-3 px-6"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 rounded-lg py-3 px-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainLayout;