// import Footer from '@/components/Footer'
// import Navbar from '@/components/Navbar'
// import React from 'react'
// import { Outlet } from 'react-router-dom'

// const MainLayout = () => {
//   return (
//     <div className='flex flex-col min-h-screen'>
//         <Navbar/>
//         <div className='flex-1 mt-16'>
//             <Outlet/>
//         </div>
//         <Footer/>
//     </div>
//   )
// }

// export default MainLayout


// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
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

// const MainLayout = () => {
//   const auth = useSelector((state) => state.auth || {}); // ✅ Prevent destructure crash
//   const { user, isAuthenticated } = auth;

//   const [openModal, setOpenModal] = useState(false);
//   const [skills, setSkills] = useState("");
//   const [interests, setInterests] = useState("");

//   const [updateUser, { isLoading }] = useUpdateUserMutation();

//   // ✅ Show modal only when authenticated and skills or interests are missing
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

//   const handleSubmit = async () => {
//     if (!skills.trim() || !interests.trim()) {
//       toast.error("Please enter both skills and interests");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("skills", skills);
//     formData.append("interests", interests);

//     try {
//       const response = await updateUser(formData).unwrap();
//       toast.success(response.message || "Preferences updated");
//       setOpenModal(false);
//       window.location.reload(); // Optional: force reload to update state
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update preferences");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-1 mt-16">
//         <Outlet />
//       </div>
//       {/* <Footer /> */}

//       {/* 🎯 Skills & Interests Modal */}
//       <Dialog open={openModal}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Tell us about your interests</DialogTitle>
//             <DialogDescription>
//               Please add your top skills and interests to get better course
//               recommendations.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4 py-2">
//             <div>
//               <Label>Skills (comma separated)</Label>
//               <Input
//                 placeholder="e.g. JavaScript, React, Node.js"
//                 value={skills}
//                 onChange={(e) => setSkills(e.target.value)}
//               />
//             </div>
//             <div>
//               <Label>Interests (comma separated)</Label>
//               <Input
//                 placeholder="e.g. Web Development, Backend, UI/UX"
//                 value={interests}
//                 onChange={(e) => setInterests(e.target.value)}
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
//     </div>
//   );
// };

// export default MainLayout;


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

// const MainLayout = () => {
//   const auth = useSelector((state) => state.auth || {});
//   const { user, isAuthenticated } = auth;

//   const [openModal, setOpenModal] = useState(false);
//   const [step, setStep] = useState(0);

//   const [skills, setSkills] = useState("");
//   const [interests, setInterests] = useState("");
//   const [education, setEducation] = useState("");

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

//   const handleNext = () => {
//     if (step === 1 && !skills.trim()) {
//       toast.error("Please enter your skills.");
//       return;
//     }
//     if (step === 2 && !interests.trim()) {
//       toast.error("Please enter your interests.");
//       return;
//     }
//     if (step === 3 && !education.trim()) {
//       toast.error("Please enter your education.");
//       return;
//     }
//     setStep((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     setStep((prev) => prev - 1);
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("skills", skills);
//     formData.append("interests", interests);
//     formData.append("education", education);

//     try {
//       const response = await updateUser(formData).unwrap();
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
//             <DialogTitle>Welcome, {user?.fullname || "Student"}!</DialogTitle>
//             <DialogDescription>
//               Let's personalize your experience by asking a few questions.
//             </DialogDescription>
//           </>
//         );
//       case 1:
//         return (
//           <>
//             <DialogTitle>What are your top skills?</DialogTitle>
//             <Label className="mt-4">Skills (comma separated)</Label>
//             <Input
//               placeholder="e.g. JavaScript, React, Node.js"
//               value={skills}
//               onChange={(e) => setSkills(e.target.value)}
//             />
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <DialogTitle>What are your interests?</DialogTitle>
//             <Label className="mt-4">Interests (comma separated)</Label>
//             <Input
//               placeholder="e.g. Web Development, Backend, UI/UX"
//               value={interests}
//               onChange={(e) => setInterests(e.target.value)}
//             />
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <DialogTitle>Your Education</DialogTitle>
//             <Label className="mt-4">Education Details</Label>
//             <Input
//               placeholder="e.g. BSc Computer Science, Kathmandu University"
//               value={education}
//               onChange={(e) => setEducation(e.target.value)}
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
//         <DialogContent>
//           <DialogHeader>{renderStepContent()}</DialogHeader>

//           <DialogFooter className="flex justify-between mt-6">
//             {step > 0 && (
//               <Button variant="outline" onClick={handlePrev}>
//                 Previous
//               </Button>
//             )}

//             {step < 3 ? (
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

// const MainLayout = () => {
//   const auth = useSelector((state) => state.auth || {});
//   const { user, isAuthenticated } = auth;

//   const [openModal, setOpenModal] = useState(false);
//   const [step, setStep] = useState(0);

//   // New states for extra steps
//   const [goal, setGoal] = useState("");
//   const [selectedRoles, setSelectedRoles] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [jobTitle, setJobTitle] = useState("");

//   // Original fields, you can keep or merge as needed
//   const [skills, setSkills] = useState("");
//   const [interests, setInterests] = useState("");
//   const [education, setEducation] = useState("");

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
//     setStep((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     setStep((prev) => Math.max(prev - 1, 0));
//   };

//   const handleSubmit = async () => {
//     // Prepare final data to send, you can structure as needed
//     const payload = {
//       goal,
//       roles: selectedRoles,
//       skills: selectedSkills,
//       jobTitle,
//       education,
//       interests,
//       // If you want to keep old skills input, or replace with selectedSkills
//       skillsText: skills,
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
//             <DialogTitle>Hello {user?.fullname || "Student"}!</DialogTitle>
//             <DialogDescription>
//               Tell me a little about yourself so I can make the best recommendations.
//               First, what's your goal?
//             </DialogDescription>
//             <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {goalsOptions.map((g) => (
//                 <Button
//                   key={g}
//                   variant={goal === g ? "default" : "outline"}
//                   onClick={() => setGoal(g)}
//                   className="text-left"
//                 >
//                   {g}
//                 </Button>
//               ))}
//             </div>
//           </>
//         );
//       case 1:
//         return (
//           <>
//             <DialogTitle>Step 2 of 5</DialogTitle>
//             <DialogDescription>Great! Which role(s) are you interested in?</DialogDescription>
//             <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[300px] overflow-auto">
//               {rolesOptions.map(({ label, img }) => {
//                 const selected = selectedRoles.includes(label);
//                 return (
//                   <div
//                     key={label}
//                     onClick={() => toggleRole(label)}
//                     className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center text-center transition 
//                       ${selected ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-400"}`}
//                   >
//                     <img
//                       src={img}
//                       alt={label}
//                       className="h-12 w-12 object-contain mb-2"
//                       loading="lazy"
//                     />
//                     <span className="text-sm font-medium">{label}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <DialogTitle>Step 3 of 5</DialogTitle>
//             <DialogDescription>Select the skills you'd like to develop</DialogDescription>
//             <p className="text-sm text-muted-foreground mb-2">
//               These are recommended based on your role(s)
//             </p>
//             <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[280px] overflow-auto">
//               {skillsOptions.map((skill) => {
//                 const selected = selectedSkills.includes(skill);
//                 return (
//                   <Button
//                     key={skill}
//                     variant={selected ? "default" : "outline"}
//                     onClick={() => toggleSkill(skill)}
//                     className="text-sm"
//                   >
//                     {skill}
//                   </Button>
//                 );
//               })}
//             </div>
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <DialogTitle>Step 4 of 5</DialogTitle>
//             <DialogDescription>What's your current job title?</DialogDescription>
//             <Input
//               type="text"
//               placeholder="Type to search"
//               value={jobTitle}
//               onChange={(e) => setJobTitle(e.target.value)}
//               className="mt-4"
//             />
//           </>
//         );
//       case 4:
//         return (
//           <>
//             <DialogTitle>Step 5 of 5</DialogTitle>
//             <DialogDescription>
//               Lastly, tell me about your education and interests
//             </DialogDescription>
//             <Label className="mt-4">Education Details</Label>
//             <Input
//               placeholder="e.g. BSc Computer Science, Kathmandu University"
//               value={education}
//               onChange={(e) => setEducation(e.target.value)}
//               className="mb-4"
//             />
//             <Label>Interests (comma separated)</Label>
//             <Input
//               placeholder="e.g. Web Development, Backend, UI/UX"
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
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-1 mt-16">
//         <Outlet />
//       </div>

//       {/* Onboarding Modal */}
//       <Dialog open={openModal}>
//         <DialogContent className="max-w-lg">
//           <DialogHeader>{renderStepContent()}</DialogHeader>

//           <DialogFooter className="flex justify-between mt-6">
//             {step > 0 && (
//               <Button variant="outline" onClick={handlePrev}>
//                 Previous
//               </Button>
//             )}

//             {step < 4 ? (
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
//   const [education, setEducation] = useState("");
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
//     setStep((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     setStep((prev) => Math.max(prev - 1, 0));
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       goal,
//       roles: selectedRoles,
//       skills: selectedSkills,
//       jobTitle,
//       education,
//       interests,
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
//               Hello {user?.fullname || "Student"}!
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
//             <DialogTitle className="text-xl font-semibold">Step 2 of 5</DialogTitle>
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
//             <DialogTitle className="text-xl font-semibold">Step 3 of 5</DialogTitle>
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
//             <DialogTitle className="text-xl font-semibold">Step 4 of 5</DialogTitle>
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
//             <DialogTitle className="text-xl font-semibold">Step 5 of 5</DialogTitle>
//             <DialogDescription className="text-gray-700 mt-1 mb-4">
//               Lastly, tell me about your education and interests
//             </DialogDescription>
//             <Label className="mt-2 font-medium text-gray-700">Education Details</Label>
//             <Input
//               placeholder="e.g. BSc Computer Science, Kathmandu University"
//               value={education}
//               onChange={(e) => setEducation(e.target.value)}
//               className="mb-4 mt-1"
//             />
//             <Label className="font-medium text-gray-700">Interests (comma separated)</Label>
//             <Input
//               placeholder="e.g. Web Development, Backend, UI/UX"
//               value={interests}
//               onChange={(e) => setInterests(e.target.value)}
//               className="mt-1"
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
//         <DialogContent className="max-w-lg">
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
//               <motion.button
//                 onClick={handlePrev}
//                 className="btn btn-outline"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//                 type="button"
//               >
//                 Previous
//               </motion.button>
//             )}

//             {step < 4 ? (
//               <motion.button
//                 onClick={handleNext}
//                 className="btn btn-primary"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//                 type="button"
//               >
//                 Next
//               </motion.button>
//             ) : (
//               <motion.button
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className={`btn btn-primary flex items-center justify-center ${
//                   isLoading ? "cursor-not-allowed opacity-60" : ""
//                 }`}
//                 variants={buttonVariants}
//                 whileHover={isLoading ? {} : "hover"}
//                 whileTap={isLoading ? {} : "tap"}
//                 type="button"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   "Save & Continue"
//                 )}
//               </motion.button>
//             )}
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default MainLayout;





import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
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

const goalsOptions = [
  "Start my career",
  "Change my career",
  "Grow in my current role",
  "Explore topics outside of work",
];

const rolesOptions = [
  { label: "Data Scientist", img: "/images/role-ds.png" },
  { label: "IT Project Manager", img: "/images/role-itpm.png" },
  { label: "Technology Consultant", img: "/images/role-techconsult.png" },
  { label: "Machine Learning Engineer", img: "/images/role-ml.png" },
  { label: "Business Intelligence Analyst", img: "/images/role-bia.png" },
  { label: "Product Manager", img: "/images/role-pm.png" },
  { label: "Business / Management Analyst", img: "/images/role-bma.png" },
  { label: "Data Analyst", img: "/images/role-da.png" },
  { label: "Data Warehouse Developer", img: "/images/role-dwd.png" },
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
    if (
      isAuthenticated &&
      user &&
      (!user.skills || user.skills.length === 0 || !user.interests || user.interests.length === 0)
    ) {
      setOpenModal(true);
    }
  }, [user, isAuthenticated]);

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
    // Validation per step
    if (step === 0 && !goal) {
      toast.error("Please select a goal.");
      return;
    }
    if (step === 1 && selectedRoles.length === 0) {
      toast.error("Please select at least one role.");
      return;
    }
    if (step === 2 && selectedSkills.length === 0) {
      toast.error("Please select at least one skill.");
      return;
    }
    if (step === 3 && !jobTitle.trim()) {
      toast.error("Please enter your current job title.");
      return;
    }
    if (step === 4 && !educationLevel) {
      toast.error("Please select your education level.");
      return;
    }
    if (step === 4 && !experienceLevel) {
      toast.error("Please select your experience level.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    // Convert comma separated interests to array
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
            <motion.div
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {goalsOptions.map((g) => (
                <motion.button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`rounded-lg border px-5 py-4 font-medium text-left transition-shadow
                    ${
                      goal === g
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
              {rolesOptions.map(({ label, img }) => {
                const selected = selectedRoles.includes(label);
                return (
                  <motion.div
                    key={label}
                    onClick={() => toggleRole(label)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && toggleRole(label)}
                    className={`cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center text-center border transition
                    ${
                      selected
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-gray-300 hover:border-blue-400 hover:shadow-sm"
                    }`}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <img
                      src={img}
                      alt={label}
                      className="h-12 w-12 object-contain mb-2"
                      loading="lazy"
                    />
                    <span className="text-sm font-semibold">{label}</span>
                  </motion.div>
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
            <p className="text-sm text-gray-500 mb-4">
              These are recommended based on your role(s)
            </p>
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[280px] overflow-auto">
              {skillsOptions.map((skill) => {
                const selected = selectedSkills.includes(skill);
                return (
                  <motion.button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition
                    ${
                      selected
                        ? "bg-blue-600 text-white border-blue-600 shadow"
                        : "bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
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
              placeholder="Type to search"
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
              Lastly, tell me about your education level and experience
            </DialogDescription>

            <Label className="font-medium text-gray-700 mt-2">Education Level</Label>
            <select
              className="w-full mt-1 border rounded-md p-2"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
            >
              <option value="">Select education level</option>
              {educationLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <Label className="font-medium text-gray-700 mt-4">Experience Level</Label>
            <div className="flex gap-4 mt-1">
              {experienceLevels.map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={level}
                    checked={experienceLevel === level}
                    onChange={() => setExperienceLevel(level)}
                    className="cursor-pointer"
                  />
                  <span className="capitalize">{level}</span>
                </label>
              ))}
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

      {/* Onboarding Modal */}
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
              <Button
                variant="outline"
                onClick={handlePrev}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Previous
              </Button>
            )}

            {step < 5 ? (
              <Button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
