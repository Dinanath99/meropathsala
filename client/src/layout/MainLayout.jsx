
// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
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

// const goalsOptions = [
//   "Start my career",
//   "Change my career",
//   "Grow in my current role",
//   "Explore topics outside of work",
// ];

// const rolesOptions = [
//   { label: "Data Scientist", img: "/images/role-ds.png" },
//   { label: "IT Project Manager", img: "/images/role-itpm.png" },
//   { label: "Technology Consultant", img: "/images/role-techconsult.png" },
//   { label: "Machine Learning Engineer", img: "/images/role-ml.png" },
//   { label: "Business Intelligence Analyst", img: "/images/role-bia.png" },
//   { label: "Product Manager", img: "/images/role-pm.png" },
//   { label: "Business / Management Analyst", img: "/images/role-bma.png" },
//   { label: "Data Analyst", img: "/images/role-da.png" },
//   { label: "Data Warehouse Developer", img: "/images/role-dwd.png" },
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
//     if (
//       isAuthenticated &&
//       user &&
//       (!user.skills || user.skills.length === 0 || !user.interests || user.interests.length === 0)
//     ) {
//       setOpenModal(true);
//     }
//   }, [user, isAuthenticated]);

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
//     // Validation per step
//     if (step === 0 && !goal) {
//       toast.error("Please select a goal.");
//       return;
//     }
//     if (step === 1 && selectedRoles.length === 0) {
//       toast.error("Please select at least one role.");
//       return;
//     }
//     if (step === 2 && selectedSkills.length === 0) {
//       toast.error("Please select at least one skill.");
//       return;
//     }
//     if (step === 3 && !jobTitle.trim()) {
//       toast.error("Please enter your current job title.");
//       return;
//     }
//     if (step === 4 && !educationLevel) {
//       toast.error("Please select your education level.");
//       return;
//     }
//     if (step === 4 && !experienceLevel) {
//       toast.error("Please select your experience level.");
//       return;
//     }
//     setStep((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     setStep((prev) => Math.max(prev - 1, 0));
//   };

//   const handleSubmit = async () => {
//     // Convert comma separated interests to array
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
//             <motion.div
//               className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
//               initial="rest"
//               whileHover="hover"
//               whileTap="tap"
//             >
//               {goalsOptions.map((g) => (
//                 <motion.button
//                   key={g}
//                   onClick={() => setGoal(g)}
//                   className={`rounded-lg border px-5 py-4 font-medium text-left transition-shadow
//                     ${
//                       goal === g
//                         ? "bg-blue-600 text-white shadow-lg"
//                         : "bg-white text-gray-800 border-gray-300 hover:shadow-md"
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
//               {rolesOptions.map(({ label, img }) => {
//                 const selected = selectedRoles.includes(label);
//                 return (
//                   <motion.div
//                     key={label}
//                     onClick={() => toggleRole(label)}
//                     role="button"
//                     tabIndex={0}
//                     onKeyDown={(e) => e.key === "Enter" && toggleRole(label)}
//                     className={`cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center text-center border transition
//                     ${
//                       selected
//                         ? "border-blue-600 bg-blue-50 shadow-md"
//                         : "border-gray-300 hover:border-blue-400 hover:shadow-sm"
//                     }`}
//                     variants={cardVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                   >
//                     <img
//                       src={img}
//                       alt={label}
//                       className="h-12 w-12 object-contain mb-2"
//                       loading="lazy"
//                     />
//                     <span className="text-sm font-semibold">{label}</span>
//                   </motion.div>
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
//             <p className="text-sm text-gray-500 mb-4">
//               These are recommended based on your role(s)
//             </p>
//             <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[280px] overflow-auto">
//               {skillsOptions.map((skill) => {
//                 const selected = selectedSkills.includes(skill);
//                 return (
//                   <motion.button
//                     key={skill}
//                     onClick={() => toggleSkill(skill)}
//                     className={`rounded-md border px-4 py-2 text-sm font-medium transition
//                     ${
//                       selected
//                         ? "bg-blue-600 text-white border-blue-600 shadow"
//                         : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400"
//                     }`}
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     type="button"
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
//               placeholder="Type to search"
//               value={jobTitle}
//               onChange={(e) => setJobTitle(e.target.value)}
//               className="mt-2"
//             />
//           </>
//         );
//       case 4:
//         return (
//           <>
//             <DialogTitle className="text-xl font-semibold">Step 5 of 6</DialogTitle>
//             <DialogDescription className="text-gray-700 mt-1 mb-4">
//               Lastly, tell me about your education level and experience
//             </DialogDescription>

//             <Label className="font-medium text-gray-700 mt-2">Education Level</Label>
//             <select
//               className="w-full mt-1 border rounded-md p-2"
//               value={educationLevel}
//               onChange={(e) => setEducationLevel(e.target.value)}
//             >
//               <option value="">Select education level</option>
//               {educationLevels.map((level) => (
//                 <option key={level} value={level}>
//                   {level}
//                 </option>
//               ))}
//             </select>

//             <Label className="font-medium text-gray-700 mt-4">Experience Level</Label>
//             <div className="flex gap-4 mt-1">
//               {experienceLevels.map((level) => (
//                 <label key={level} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="experienceLevel"
//                     value={level}
//                     checked={experienceLevel === level}
//                     onChange={() => setExperienceLevel(level)}
//                     className="cursor-pointer"
//                   />
//                   <span className="capitalize">{level}</span>
//                 </label>
//               ))}
//             </div>
//           </>
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

//       {/* Onboarding Modal */}
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
//               <Button
//                 variant="outline"
//                 onClick={handlePrev}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Previous
//               </Button>
//             )}

//             {step < 5 ? (
//               <Button
//                 onClick={handleNext}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Next
//               </Button>
//             ) : (
//               <Button
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
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

// Other section 

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

// const goalsOptions = [
//   "Start my career",
//   "Change my career",
//   "Grow in my current role",
//   "Explore topics outside of work",
// ];

// const rolesOptions = [
//   { label: "Data Scientist", img: "/images/role-ds.png" },
//   { label: "IT Project Manager", img: "/images/role-itpm.png" },
//   { label: "Technology Consultant", img: "/images/role-techconsult.png" },
//   { label: "Machine Learning Engineer", img: "/images/role-ml.png" },
//   { label: "Business Intelligence Analyst", img: "/images/role-bia.png" },
//   { label: "Product Manager", img: "/images/role-pm.png" },
//   { label: "Business / Management Analyst", img: "/images/role-bma.png" },
//   { label: "Data Analyst", img: "/images/role-da.png" },
//   { label: "Data Warehouse Developer", img: "/images/role-dwd.png" },
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
//     if (step === 0 && !goal) {
//       toast.error("Please select a goal.");
//       return;
//     }
//     if (step === 1 && selectedRoles.length === 0) {
//       toast.error("Please select at least one role.");
//       return;
//     }
//     if (step === 2 && selectedSkills.length === 0) {
//       toast.error("Please select at least one skill.");
//       return;
//     }
//     if (step === 3 && !jobTitle.trim()) {
//       toast.error("Please enter your current job title.");
//       return;
//     }
//     if (step === 4 && (!educationLevel || !experienceLevel)) {
//       toast.error("Please complete all fields.");
//       return;
//     }
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
//                     ${
//                       goal === g
//                         ? "bg-blue-600 text-white shadow-lg"
//                         : "bg-white text-gray-800 border-gray-300 hover:shadow-md"
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
//               {rolesOptions.map(({ label, img }) => (
//                 <motion.div
//                   key={label}
//                   onClick={() => toggleRole(label)}
//                   className={`cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center text-center border transition
//                     ${
//                       selectedRoles.includes(label)
//                         ? "border-blue-600 bg-blue-50 shadow-md"
//                         : "border-gray-300 hover:border-blue-400 hover:shadow-sm"
//                     }`}
//                   variants={cardVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                 >
//                   <img src={img} alt={label} className="h-12 w-12 mb-2" />
//                   <span className="text-sm font-semibold">{label}</span>
//                 </motion.div>
//               ))}
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
//             <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[280px] overflow-auto">
//               {skillsOptions.map((skill) => (
//                 <motion.button
//                   key={skill}
//                   onClick={() => toggleSkill(skill)}
//                   className={`rounded-md border px-4 py-2 text-sm font-medium transition
//                     ${
//                       selectedSkills.includes(skill)
//                         ? "bg-blue-600 text-white border-blue-600 shadow"
//                         : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400"
//                     }`}
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                   type="button"
//                 >
//                   {skill}
//                 </motion.button>
//               ))}
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
//             <DialogTitle className="text-xl font-semibold">Step 5 of 6</DialogTitle>
//             <DialogDescription className="text-gray-700 mt-1 mb-4">
//               Tell us about your education and experience
//             </DialogDescription>
//             <Label className="font-medium text-gray-700 mt-2">Education Level</Label>
//             <select
//               className="w-full mt-1 border rounded-md p-2"
//               value={educationLevel}
//               onChange={(e) => setEducationLevel(e.target.value)}
//             >
//               <option value="">Select education level</option>
//               {educationLevels.map((level) => (
//                 <option key={level} value={level}>
//                   {level}
//                 </option>
//               ))}
//             </select>

//             <Label className="font-medium text-gray-700 mt-4">Experience Level</Label>
//             <div className="flex gap-4 mt-1">
//               {experienceLevels.map((level) => (
//                 <label key={level} className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="experienceLevel"
//                     value={level}
//                     checked={experienceLevel === level}
//                     onChange={() => setExperienceLevel(level)}
//                   />
//                   <span className="capitalize">{level}</span>
//                 </label>
//               ))}
//             </div>
//           </>
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

// ✅ Lucide icons for roles
import {
  Brain,
  Server,
  UserCog,
  BarChart3,
  Presentation,
  PieChart,
  FileSearch,
  MonitorCheck,
  ClipboardList,
} from "lucide-react";

const goalsOptions = [
  "Start my career",
  "Change my career",
  "Grow in my current role",
  "Explore topics outside of work",
];

// ✅ Replaced images with Lucide icons
const rolesOptions = [
  { label: "Data Scientist", icon: Brain },
  { label: "IT Project Manager", icon: ClipboardList },
  { label: "Technology Consultant", icon: UserCog },
  { label: "Machine Learning Engineer", icon: Server },
  { label: "Business Intelligence Analyst", icon: BarChart3 },
  { label: "Product Manager", icon: Presentation },
  { label: "Business / Management Analyst", icon: PieChart },
  { label: "Data Analyst", icon: FileSearch },
  { label: "Data Warehouse Developer", icon: MonitorCheck },
];

const skillsOptions = [
  "Data Science",
  "Machine Learning",
  "Python Programming",
  "SQL",
  "Data Analysis",
  "Statistics",
  "Algorithms",
  "Data Visualization",
  "Deep Learning",
];

const educationLevels = [
  "Less than high school diploma",
  "High school diploma",
  "Some college",
  "Associate Degree",
  "Bachelor's degree",
  "Master's degree",
  "Professional school degree",
  "Doctorate degree",
];

const experienceLevels = ["beginner", "intermediate", "advanced"];

const stepVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const cardVariants = {
  hover: { scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" },
  tap: { scale: 0.95 },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const MainLayout = () => {
  const auth = useSelector((state) => state.auth || {});
  const { user, isAuthenticated } = auth;
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(0);

  const [goal, setGoal] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [interests, setInterests] = useState("");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "instructor") {
        navigate("/");
      } else if (
        (!user.skills || user.skills.length === 0) ||
        (!user.interests || user.interests.length === 0)
      ) {
        setOpenModal(true);
      }
    }
  }, [user, isAuthenticated, navigate]);

  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleNext = () => {
    if (step === 0 && !goal) return toast.error("Please select a goal.");
    if (step === 1 && selectedRoles.length === 0)
      return toast.error("Please select at least one role.");
    if (step === 2 && selectedSkills.length === 0)
      return toast.error("Please select at least one skill.");
    if (step === 3 && !jobTitle.trim())
      return toast.error("Please enter your current job title.");
    if (step === 4 && (!educationLevel || !experienceLevel))
      return toast.error("Please complete all fields.");
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const interestsArr = interests
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const payload = {
      goal,
      preferredRoles: selectedRoles,
      skills: selectedSkills,
      jobTitle,
      educationLevel,
      experienceLevel,
      interests: interestsArr,
    };

    try {
      const response = await updateUser(payload).unwrap();
      toast.success(response.message || "Preferences updated");
      setOpenModal(false);
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update preferences");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <DialogTitle className="text-2xl font-semibold">
              Hello {user?.name || "Student"}!
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Tell me a little about yourself so I can make the best recommendations.
              First, what's your goal?
            </DialogDescription>
            <motion.div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goalsOptions.map((g) => (
                <motion.button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`rounded-lg border px-5 py-4 font-medium text-left transition-shadow
                    ${goal === g
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-800 border-gray-300 hover:shadow-md"
                    }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="button"
                >
                  {g}
                </motion.button>
              ))}
            </motion.div>
          </>
        );
      case 1:
        return (
          <>
            <DialogTitle className="text-xl font-semibold">Step 2 of 6</DialogTitle>
            <DialogDescription className="text-gray-700 mt-1 mb-4">
              Great! Which role(s) are you interested in?
            </DialogDescription>
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[320px] overflow-auto">
              {rolesOptions.map(({ label, icon: Icon }) => {
                const isSelected = selectedRoles.includes(label);
                return (
                  <motion.button
                    key={label}
                    onClick={() => toggleRole(label)}
                    type="button"
                    className={`rounded-xl border px-5 py-4 text-center flex flex-col items-center justify-center gap-2 transition-shadow
                ${isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                        : "bg-white text-gray-800 border-gray-300 hover:shadow-md hover:border-blue-400"
                      }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Icon className={`h-7 w-7 ${isSelected ? "text-white" : "text-blue-600"}`} />
                    <span className="text-sm font-semibold">{label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        );
      case 2:
        return (
          <>
            <DialogTitle className="text-xl font-semibold">Step 3 of 6</DialogTitle>
            <DialogDescription className="text-gray-700 mt-1 mb-2">
              Select the skills you'd like to develop
            </DialogDescription>
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[280px] overflow-auto mt-4">
              {skillsOptions.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <motion.button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    type="button"
                    className={`rounded-xl border px-5 py-4 text-sm font-semibold text-center transition-shadow
            ${isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                        : "bg-white text-gray-800 border-gray-300 hover:shadow-md hover:border-blue-400"
                      }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {skill}
                  </motion.button>
                );
              })}
            </motion.div>
          </>

        );
      case 3:
        return (
          <>
            <DialogTitle className="text-xl font-semibold">Step 4 of 6</DialogTitle>
            <DialogDescription className="text-gray-700 mt-1 mb-2">
              What's your current job title?
            </DialogDescription>
            <Input
              type="text"
              placeholder="e.g. Backend Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-2"
            />
          </>
        );
      case 4:
        return (
          <>
  <DialogTitle className="text-xl font-semibold">Step 5 of 6</DialogTitle>
  <DialogDescription className="text-gray-700 mt-1 mb-4">
    Tell us about your education and experience
  </DialogDescription>

  {/* Education Level */}
  <Label className="font-medium text-gray-700">Education Level</Label>
  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
    {educationLevels.map((level) => {
      const isSelected = educationLevel === level;
      return (
        <motion.button
          key={level}
          onClick={() => setEducationLevel(level)}
          type="button"
          className={`rounded-lg border px-4 py-3 text-sm font-medium text-left transition
            ${isSelected
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-gray-800 border-gray-300 hover:border-blue-500 hover:shadow"
            }`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {level}
        </motion.button>
      );
    })}
  </div>

  {/* Experience Level */}
  <Label className="font-medium text-gray-700 mt-6 block">Experience Level</Label>
  <div className="mt-3 flex flex-wrap gap-3">
    {experienceLevels.map((level) => {
      const isActive = experienceLevel === level;
      return (
        <motion.button
          key={level}
          onClick={() => setExperienceLevel(level)}
          type="button"
          className={`px-4 py-2 text-sm rounded-md font-semibold capitalize border transition
            ${isActive
              ? "bg-blue-600 text-white border-blue-600 shadow"
              : "bg-white text-gray-800 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {level}
        </motion.button>
      );
    })}
  </div>
</>

        );
      case 5:
        return (
          <>
            <DialogTitle className="text-xl font-semibold">Step 6 of 6</DialogTitle>
            <DialogDescription className="text-gray-700 mt-1 mb-2">
              What are your interests? (comma separated)
            </DialogDescription>
            <Input
              placeholder="e.g. Web Development, Backend, UI/UX"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="mt-2"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 mt-16">
        <Outlet />
      </div>

      <Dialog open={openModal}>
        <DialogContent className="max-w-lg sm:max-w-xl">
          <DialogHeader>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </DialogHeader>

          <DialogFooter className="flex justify-between mt-6">
            {step > 0 && (
              <Button variant="outline" onClick={handlePrev}>
                Previous
              </Button>
            )}
            {step < 5 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
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
