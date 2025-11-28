// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter, 
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   useLoadUserQuery,
//   useUpdateUserMutation,
// } from "@/features/api/authApi";
// import {
//   useGetRecommendedCoursesQuery,
//   useGetCollaborativeCoursesQuery,
// } from "@/features/api/courseApi";

// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import Course from "./Course";

// const Profile = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Local form state
//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");
//   const [preferredRoles, setPreferredRoles] = useState([]);
//   const [jobTitle, setJobTitle] = useState("");
//   const [educationLevel, setEducationLevel] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   // Load user data (skip if not authenticated)
//   const { data, isLoading, refetch: refetchUser } = useLoadUserQuery(undefined, {
//     skip: !isAuthenticated,
//     refetchOnMountOrArgChange: true,
//   });

//   // Recommendations queries
//   const {
//     data: recommendationData,
//     isLoading: recommendationLoading,
//     refetch: refetchRecommended,
//   } = useGetRecommendedCoursesQuery(undefined, {
//     skip: !isAuthenticated,
//     refetchOnMountOrArgChange: true,
//   });

//   const {
//     data: collaborativeData,
//     isLoading: collaborativeLoading,
//     isError: collaborativeError,
//     error: collaborativeErrorMsg,
//   } = useGetCollaborativeCoursesQuery(undefined, {
//     skip: !isAuthenticated,
//     refetchOnMountOrArgChange: true,
//   });

//   const recommendedCourses = recommendationData?.recommendedCourses || [];
//   const collaborativeCourses = collaborativeData?.recommendedCourses || [];

//   // Update user mutation
//   const [
//     updateUser,
//     {
//       isLoading: updateUserIsLoading,
//       isError: updateErrorOccurred,
//       error: updateError,
//       isSuccess: updateSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const user = data?.user;
//   const isStudent = user?.role === "student";
//   const isInstructor = user?.role === "instructor";

//   // Sync local form state when user or auth status changes
//   useEffect(() => {
//     if (!isAuthenticated) {
//       // Clear form
//       setName("");
//       setSkills([]);
//       setInterests([]);
//       setExperienceLevel("beginner");
//       setPreferredRoles([]);
//       setJobTitle("");
//       setEducationLevel("");
//       setProfilePhoto(null);
//       setIsDialogOpen(false);
//       return;
//     }

//     if (user) {
//       setName(user.name || "");
//       setSkills(Array.isArray(user.skills) ? user.skills : []);
//       setInterests(Array.isArray(user.interests) ? user.interests : []);
//       setExperienceLevel(user.experienceLevel || "beginner");
//       setPreferredRoles(Array.isArray(user.preferredRoles) ? user.preferredRoles : []);
//       setJobTitle(user.jobTitle || "");
//       setEducationLevel(user.educationLevel || "");
//       setProfilePhoto(null);
//     }
//   }, [user, isAuthenticated]);

//   // Handle side effects on mutation success/failure and collaborative fetch error
//   useEffect(() => {
//     if (updateSuccess) {
//       toast.success("Profile updated successfully.");
//       setIsDialogOpen(false);
//       refetchUser();
//       refetchRecommended();
//       setProfilePhoto(null);
//     }
//     if (updateErrorOccurred) {
//       toast.error(updateError?.data?.message || "Failed to update profile.");
//     }
//     if (collaborativeError) {
//       toast.error(
//         collaborativeErrorMsg?.data?.message ||
//           "Failed to load collaborative recommendations."
//       );
//     }
//   }, [
//     updateSuccess,
//     updateErrorOccurred,
//     updateError,
//     collaborativeError,
//     collaborativeErrorMsg,
//     refetchUser,
//     refetchRecommended,
//   ]);

//   // Submit handler for updating profile
//   const updateUserHandler = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       if (profilePhoto) formData.append("profilePhoto", profilePhoto);
//       if (isStudent) {
//         skills.forEach((skill) => formData.append("skills[]", skill));
//         interests.forEach((interest) => formData.append("interests[]", interest));
//         preferredRoles.forEach((role) => formData.append("preferredRoles[]", role));
//         formData.append("experienceLevel", experienceLevel);
//         formData.append("educationLevel", educationLevel);
//       }
//       formData.append("jobTitle", jobTitle);

//       await updateUser(formData).unwrap();
//     } catch (err) {
//       toast.error(err?.data?.message || "Error updating profile.");
//     }
//   };

//   // Loading and auth guards
//   if (!isAuthenticated) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-700 dark:text-gray-300">
//         <p>Please log in to view your profile.</p>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="flex items-center space-x-2 text-gray-800 dark:text-white">
//           <Loader2 className="h-6 w-6 animate-spin" />
//           <span className="text-xl font-semibold">Loading profile...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-8 py-12">
//       <div className="max-w-7xl mx-auto space-y-12">
//         {/* Profile Header */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
//           <Avatar className="h-32 w-32 md:h-40 md:w-40 shadow-md border-4 border-blue-500 dark:border-blue-400">
//             <AvatarImage
//               src={user?.photoUrl || "https://avatar.iran.liara.run/public/boy"}
//               alt={user?.name || "User"}
//               className="object-cover"
//             />
//             <AvatarFallback className="text-3xl font-extrabold bg-gray-200 dark:bg-gray-700">
//               {user?.name
//                 ? user.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")
//                     .toUpperCase()
//                 : "NA"}
//             </AvatarFallback>
//           </Avatar>
//           <div className="flex-1 space-y-4 text-center md:text-left">
//             <h2 className="text-3xl md:text-4xl font-bold">{user?.name}</h2>
//             <p className="text-lg text-gray-600 dark:text-gray-300">{user?.email}</p>
//             <p className="text-sm uppercase font-semibold text-blue-600 dark:text-blue-400">
//               {user?.role}
//             </p>
//             {jobTitle && (
//               <p className="text-gray-700 dark:text-gray-200">
//                 <span className="font-semibold">Job Title:</span> {jobTitle}
//               </p>
//             )}
//             {isStudent && educationLevel && (
//               <p className="text-gray-700 dark:text-gray-200">
//                 <span className="font-semibold">Education Level:</span> {educationLevel}
//               </p>
//             )}
//             {isStudent && experienceLevel && (
//               <p className="text-gray-700 dark:text-gray-200">
//                 <span className="font-semibold">Experience Level:</span> {experienceLevel}
//               </p>
//             )}
//             <Button
//               onClick={() => setIsDialogOpen(true)}
//               className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform transform hover:scale-105"
//             >
//               Edit Profile
//             </Button>
//           </div>
//         </div>

//         {/* Details Cards (only for students) */}
//         {!isInstructor && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
//               <h3 className="font-semibold text-xl mb-4">Skills</h3>
//               {skills.length ? (
//                 <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
//                   {skills.map((skill) => (
//                     <li key={skill} className="text-sm">
//                       {skill}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 italic text-sm">
//                   No skills added yet. Update your profile to add skills!
//                 </p>
//               )}
//             </section>
//             <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
//               <h3 className="font-semibold text-xl mb-4">Interests</h3>
//               {interests.length ? (
//                 <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
//                   {interests.map((interest) => (
//                     <li key={interest} className="text-sm">
//                       {interest}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 italic text-sm">
//                   No interests added yet. Share your interests to get better recommendations!
//                 </p>
//               )}
//             </section>
//             <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
//               <h3 className="font-semibold text-xl mb-4">Preferred Roles</h3>
//               {preferredRoles.length ? (
//                 <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
//                   {preferredRoles.map((role) => (
//                     <li key={role} className="text-sm">
//                       {role}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 italic text-sm">
//                   No preferred roles selected. Choose roles to tailor your learning path!
//                 </p>
//               )}
//             </section>
//           </div>
//         )}

//         {/* Enrolled Courses (only for students) */}
//         {isStudent && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-6 relative">
//               Enrolled Courses
//               <span className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
//             </h2>
//             {user?.enrolledCourses?.length === 0 ? (
//               <p className="text-gray-600 dark:text-gray-400 italic">
//                 You haven't enrolled in any courses yet. Explore courses to start learning!
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {user?.enrolledCourses?.map((course) => (
//                   <Course course={course} key={course._id} />
//                 ))}
//               </div>
//             )}
//           </section>
//         )}

//         {/* Content-Based Recommended Courses (only for students) */}
//         {isStudent && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-6 relative">
//               Recommended Courses Based on Your Profile
//               <span className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
//             </h2>
//             {recommendationLoading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(3)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse"
//                   >
//                     <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : recommendedCourses.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {recommendedCourses.map((course) => (
//                   <Course course={course} key={course._id} />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600 dark:text-gray-400 italic">
//                 No recommendations yet. Add skills and interests to get personalized suggestions!
//               </p>
//             )}
//           </section>
//         )}

//         {/* Collaborative Recommended Courses (only for students) */}
//         {isStudent && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-6 relative">
//               Courses Popular Among Similar Learners
//               <span className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
//             </h2>
//             {collaborativeLoading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(3)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse"
//                   >
//                     <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : collaborativeCourses.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {collaborativeCourses.map((course) => (
//                   <Course course={course} key={course._id} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-gray-600 dark:text-gray-400 italic">
//                 <p>No collaborative recommendations yet.</p>
//                 <p className="mt-2">
//                   Enroll in more courses to discover what similar learners are studying!
//                   <a
//                     href="/course/search?query"
//                     className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
//                   >
//                     Explore Courses
//                   </a>
//                 </p>
//               </div>
//             )}
//           </section>
//         )}

//         {/* Edit Profile Dialog */}
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogContent className="max-w-3xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//             <DialogHeader>
//               <DialogTitle>Edit Profile</DialogTitle>
//               <DialogDescription>
//                 Update your profile details to enhance your learning experience.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-6 py-6">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Name</Label>
//                 <Input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Your name"
//                   className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Profile Photo</Label>
//                 <Input
//                   onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
//                   type="file"
//                   accept="image/*"
//                   className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//               {!isInstructor && (
//                 <>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Skills</Label>
//                     <Input
//                       value={skills.join(",")}
//                       onChange={(e) =>
//                         setSkills(
//                           e.target.value
//                             .split(",")
//                             .map((s) => s.trim())
//                             .filter(Boolean)
//                         )
//                       }
//                       placeholder="e.g., JavaScript, Python"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Interests</Label>
//                     <Input
//                       value={interests.join(", ")}
//                       onChange={(e) =>
//                         setInterests(
//                           e.target.value
//                             .split(",")
//                             .map((s) => s.trim())
//                             .filter(Boolean)
//                         )
//                       }
//                       placeholder="e.g., Web Development, AI"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Preferred Roles</Label>
//                     <Input
//                       value={preferredRoles.join(", ")}
//                       onChange={(e) =>
//                         setPreferredRoles(
//                           e.target.value
//                             .split(",")
//                             .map((s) => s.trim())
//                             .filter(Boolean)
//                         )
//                       }
//                       placeholder="e.g., Frontend Developer, Data Scientist"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Experience Level</Label>
//                     <select
//                       value={experienceLevel}
//                       onChange={(e) => setExperienceLevel(e.target.value)}
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 rounded"
//                     >
//                       <option value="beginner">Beginner</option>
//                       <option value="intermediate">Intermediate</option>
//                       <option value="advanced">Advanced</option>
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Education Level</Label>
//                     <Input
//                       value={educationLevel}
//                       onChange={(e) => setEducationLevel(e.target.value)}
//                       placeholder="e.g., Bachelor's, Master's"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                 </>
//               )}
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Job Title</Label>
//                 <Input
//                   value={jobTitle}
//                   onChange={(e) => setJobTitle(e.target.value)}
//                   placeholder="e.g., Software Engineer"
//                   className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//             </div>

//             <DialogFooter>
//               <Button
//                 onClick={updateUserHandler}
//                 disabled={updateUserIsLoading}
//                 className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform transform hover:scale-105"
//               >
//                 {updateUserIsLoading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     Updating...
//                   </>
//                 ) : (
//                   "Update Profile"
//                 )}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default Profile;





// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//   useLoadUserQuery,
//   useUpdateUserMutation,
// } from "@/features/api/authApi";
// import {
//   useGetRecommendedCoursesQuery,
//   useGetCollaborativeCoursesQuery,
// } from "@/features/api/courseApi";

// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import Course from "./Course";

// const Profile = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   // Local form state
//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");
//   const [preferredRoles, setPreferredRoles] = useState([]);
//   const [jobTitle, setJobTitle] = useState("");
//   const [educationLevel, setEducationLevel] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [skillsInput, setSkillsInput] = useState(""); // New state for skills input

//   // Load user data (skip if not authenticated)
//   const { data, isLoading, refetch: refetchUser } = useLoadUserQuery(undefined, {
//     skip: !isAuthenticated,
//     refetchOnMountOrArgChange: true,
//   });

//   // Recommendations queries
//   const {
//     data: recommendationData,
//     isLoading: recommendationLoading,
//     refetch: refetchRecommended,
//   } = useGetRecommendedCoursesQuery(undefined, {
//     skip: !isAuthenticated,
//     refetchOnMountOrArgChange: true,
//   });

//   const {
//     data: collaborativeData,
//     isLoading: collaborativeLoading,
//     isError: collaborativeError,
//     error: collaborativeErrorMsg,
//   } = useGetCollaborativeCoursesQuery(undefined, {
//     skip: !isAuthenticated,
//     refetchOnMountOrArgChange: true,
//   });

//   const recommendedCourses = recommendationData?.recommendedCourses || [];
//   const collaborativeCourses = collaborativeData?.recommendedCourses || [];

//   // Update user mutation
//   const [
//     updateUser,
//     {
//       isLoading: updateUserIsLoading,
//       isError: updateErrorOccurred,
//       error: updateError,
//       isSuccess: updateSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const user = data?.user;
//   const isStudent = user?.role === "student";
//   const isInstructor = user?.role === "instructor";

//   // Sync local form state when user or auth status changes
//   useEffect(() => {
//     if (!isAuthenticated) {
//       // Clear form
//       setName("");
//       setSkills([]);
//       setInterests([]);
//       setExperienceLevel("beginner");
//       setPreferredRoles([]);
//       setJobTitle("");
//       setEducationLevel("");
//       setProfilePhoto(null);
//       setIsDialogOpen(false);
//       setSkillsInput("");
//       return;
//     }

//     if (user) {
//       setName(user.name || "");
//       setSkills(Array.isArray(user.skills) ? user.skills : []);
//       setInterests(Array.isArray(user.interests) ? user.interests : []);
//       setExperienceLevel(user.experienceLevel || "beginner");
//       setPreferredRoles(Array.isArray(user.preferredRoles) ? user.preferredRoles : []);
//       setJobTitle(user.jobTitle || "");
//       setEducationLevel(user.educationLevel || "");
//       setProfilePhoto(null);
//       setSkillsInput(Array.isArray(user.skills) ? user.skills.join(", ") : "");
//     }
//   }, [user, isAuthenticated]);

//   // Handle side effects on mutation success/failure and collaborative fetch error
//   useEffect(() => {
//     if (updateSuccess) {
//       toast.success("Profile updated successfully.");
//       setIsDialogOpen(false);
//       refetchUser();
//       refetchRecommended();
//       setProfilePhoto(null);
//     }
//     if (updateErrorOccurred) {
//       toast.error(updateError?.data?.message || "Failed to update profile.");
//     }
//     if (collaborativeError) {
//       toast.error(
//         collaborativeErrorMsg?.data?.message ||
//           "Failed to load collaborative recommendations."
//       );
//     }
//   }, [
//     updateSuccess,
//     updateErrorOccurred,
//     updateError,
//     collaborativeError,
//     collaborativeErrorMsg,
//     refetchUser,
//     refetchRecommended,
//   ]);

//   // Submit handler for updating profile
//   const updateUserHandler = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       if (profilePhoto) formData.append("profilePhoto", profilePhoto);
//       if (isStudent) {
//         skills.forEach((skill) => formData.append("skills[]", skill));
//         interests.forEach((interest) => formData.append("interests[]", interest));
//         preferredRoles.forEach((role) => formData.append("preferredRoles[]", role));
//         formData.append("experienceLevel", experienceLevel);
//         formData.append("educationLevel", educationLevel);
//       }
//       formData.append("jobTitle", jobTitle);

//       await updateUser(formData).unwrap();
//     } catch (err) {
//       toast.error(err?.data?.message || "Error updating profile.");
//     }
//   };

//   // Handle skills input change
//   const handleSkillsInputChange = (e) => {
//     const input = e.target.value;
//     setSkillsInput(input);
//     const newSkills = input
//       .split(",")
//       .map((s) => s.trim())
//       .filter((s) => s); // Only update skills when user finishes typing
//     setSkills(newSkills);
//   };

//   // Loading and auth guards
//   if (!isAuthenticated) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-700 dark:text-gray-300">
//         <p>Please log in to view your profile.</p>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="flex items-center space-x-2 text-gray-800 dark:text-white">
//           <Loader2 className="h-6 w-6 animate-spin" />
//           <span className="text-xl font-semibold">Loading profile...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-8 py-12">
//       <div className="max-w-7xl mx-auto space-y-12">
//         {/* Profile Header */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
//           <Avatar className="h-32 w-32 md:h-40 md:w-40 shadow-md border-4 border-blue-500 dark:border-blue-400">
//             <AvatarImage
//               src={user?.photoUrl || "https://avatar.iran.liara.run/public/boy"}
//               alt={user?.name || "User"}
//               className="object-cover"
//             />
//             <AvatarFallback className="text-3xl font-extrabold bg-gray-200 dark:bg-gray-700">
//               {user?.name
//                 ? user.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")
//                     .toUpperCase()
//                 : "NA"}
//             </AvatarFallback>
//           </Avatar>
//           <div className="flex-1 space-y-4 text-center md:text-left">
//             <h2 className="text-3xl md:text-4xl font-bold">{user?.name}</h2>
//             <p className="text-lg text-gray-600 dark:text-gray-300">{user?.email}</p>
//             <p className="text-sm uppercase font-semibold text-blue-600 dark:text-blue-400">
//               {user?.role}
//             </p>
//             {jobTitle && (
//               <p className="text-gray-700 dark:text-gray-200">
//                 <span className="font-semibold">Job Title:</span> {jobTitle}
//               </p>
//             )}
//             {isStudent && educationLevel && (
//               <p className="text-gray-700 dark:text-gray-200">
//                 <span className="font-semibold">Education Level:</span> {educationLevel}
//               </p>
//             )}
//             {isStudent && experienceLevel && (
//               <p className="text-gray-700 dark:text-gray-200">
//                 <span className="font-semibold">Experience Level:</span> {experienceLevel}
//               </p>
//             )}
//             <Button
//               onClick={() => setIsDialogOpen(true)}
//               className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform transform hover:scale-105"
//             >
//               Edit Profile
//             </Button>
//           </div>
//         </div>

//         {/* Details Cards (only for students) */}
//         {!isInstructor && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
//               <h3 className="font-semibold text-xl mb-4">Skills</h3>
//               {skills.length ? (
//                 <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
//                   {skills.map((skill) => (
//                     <li key={skill} className="text-sm">
//                       {skill}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 italic text-sm">
//                   No skills added yet. Update your profile to add skills!
//                 </p>
//               )}
//             </section>
//             <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
//               <h3 className="font-semibold text-xl mb-4">Interests</h3>
//               {interests.length ? (
//                 <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
//                   {interests.map((interest) => (
//                     <li key={interest} className="text-sm">
//                       {interest}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 italic text-sm">
//                   No interests added yet. Share your interests to get better recommendations!
//                 </p>
//               )}
//             </section>
//             <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
//               <h3 className="font-semibold text-xl mb-4">Preferred Roles</h3>
//               {preferredRoles.length ? (
//                 <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
//                   {preferredRoles.map((role) => (
//                     <li key={role} className="text-sm">
//                       {role}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 italic text-sm">
//                   No preferred roles selected. Choose roles to tailor your learning path!
//                 </p>
//               )}
//             </section>
//           </div>
//         )}

//         {/* Enrolled Courses (only for students) */}
//         {isStudent && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-6 relative">
//               Enrolled Courses
//               <span className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
//             </h2>
//             {user?.enrolledCourses?.length === 0 ? (
//               <p className="text-gray-600 dark:text-gray-400 italic">
//                 You haven't enrolled in any courses yet. Explore courses to start learning!
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {user?.enrolledCourses?.map((course) => (
//                   <Course course={course} key={course._id} />
//                 ))}
//               </div>
//             )}
//           </section>
//         )}

//         {/* Content-Based Recommended Courses (only for students) */}
//         {isStudent && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-6 relative">
//               Recommended Courses Based on Your Profile
//               <span className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
//             </h2>
//             {recommendationLoading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(3)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse"
//                   >
//                     <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : recommendedCourses.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {recommendedCourses.map((course) => (
//                   <Course course={course} key={course._id} />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600 dark:text-gray-400 italic">
//                 No recommendations yet. Add skills and interests to get personalized suggestions!
//               </p>
//             )}
//           </section>
//         )}

//         {/* Collaborative Recommended Courses (only for students) */}
//         {isStudent && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-6 relative">
//               Courses Popular Among Similar Learners
//               <span className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
//             </h2>
//             {collaborativeLoading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(3)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse"
//                   >
//                     <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
//                     <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : collaborativeCourses.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {collaborativeCourses.map((course) => (
//                   <Course course={course} key={course._id} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-gray-600 dark:text-gray-400 italic">
//                 <p>No collaborative recommendations yet.</p>
//                 <p className="mt-2">
//                   Enroll in more courses to discover what similar learners are studying!
//                   <a
//                     href="/course/search?query"
//                     className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
//                   >
//                     Explore Courses
//                   </a>
//                 </p>
//               </div>
//             )}
//           </section>
//         )}

//         {/* Edit Profile Dialog */}
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogContent className="max-w-3xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//             <DialogHeader>
//               <DialogTitle>Edit Profile</DialogTitle>
//               <DialogDescription>
//                 Update your profile details to enhance your learning experience.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-6 py-6">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Name</Label>
//                 <Input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Your name"
//                   className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Profile Photo</Label>
//                 <Input
//                   onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
//                   type="file"
//                   accept="image/*"
//                   className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//               {!isInstructor && (
//                 <>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Skills</Label>
//                     <Input
//                       value={skillsInput}
//                       onChange={handleSkillsInputChange}
//                       placeholder="e.g., JavaScript, Python"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Interests</Label>
//                     <Input
//                       value={interests.join(", ")}
//                       onChange={(e) =>
//                         setInterests(
//                           e.target.value
//                             .split(",")
//                             .map((s) => s.trim())
//                             .filter(Boolean)
//                         )
//                       }
//                       placeholder="e.g., Web Development, AI"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Preferred Roles</Label>
//                     <Input
//                       value={preferredRoles.join(", ")}
//                       onChange={(e) =>
//                         setPreferredRoles(
//                           e.target.value
//                             .split(",")
//                             .map((s) => s.trim())
//                             .filter(Boolean)
//                         )
//                       }
//                       placeholder="e.g., Frontend Developer, Data Scientist"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Experience Level</Label>
//                     <select
//                       value={experienceLevel}
//                       onChange={(e) => setExperienceLevel(e.target.value)}
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 rounded"
//                     >
//                       <option value="beginner">Beginner</option>
//                       <option value="intermediate">Intermediate</option>
//                       <option value="advanced">Advanced</option>
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Education Level</Label>
//                     <Input
//                       value={educationLevel}
//                       onChange={(e) => setEducationLevel(e.target.value)}
//                       placeholder="e.g., Bachelor's, Master's"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                 </>
//               )}
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Job Title</Label>
//                 <Input
//                   value={jobTitle}
//                   onChange={(e) => setJobTitle(e.target.value)}
//                   placeholder="e.g., Software Engineer"
//                   className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//             </div>

//             <DialogFooter>
//               <Button
//                 onClick={updateUserHandler}
//                 disabled={updateUserIsLoading}
//                 className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform transform hover:scale-105"
//               >
//                 {updateUserIsLoading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                     Updating...
//                   </>
//                 ) : (
//                   "Update Profile"
//                 )}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import {
  useGetRecommendedCoursesQuery,
  useGetCollaborativeCoursesQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Course from "./Course";

// Custom Select component styled like Shadcn/UI Input
const Select = ({ value, onChange, options, placeholder, multiple = false, className, ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      multiple={multiple}
      className={`col-span-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent ${multiple ? "h-24" : ""} ${className}`}
      {...props}
    >
      {!multiple && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const Profile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Local form state
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [preferredRoles, setPreferredRoles] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [skillsInput, setSkillsInput] = useState("");
  const [interestsInput, setInterestsInput] = useState("");

  // Load user data (skip if not authenticated)
  const { data, isLoading, refetch: refetchUser } = useLoadUserQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  // Recommendations queries
  const {
    data: recommendationData,
    isLoading: recommendationLoading,
    refetch: refetchRecommended,
  } = useGetRecommendedCoursesQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: collaborativeData,
    isLoading: collaborativeLoading,
    isError: collaborativeError,
    error: collaborativeErrorMsg,
  } = useGetCollaborativeCoursesQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  const recommendedCourses = recommendationData?.recommendedCourses || [];
  const collaborativeCourses = collaborativeData?.recommendedCourses || [];

  // Update user mutation
  const [
    updateUser,
    {
      isLoading: updateUserIsLoading,
      isError: updateErrorOccurred,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateUserMutation();

  const user = data?.user;
  const isStudent = user?.role === "student";
  const isInstructor = user?.role === "instructor";

  // Enum options from User schema
  const experienceLevelOptions = ["beginner", "intermediate", "advanced"];
  const educationLevelOptions = [
    "Less than high school diploma",
    "High school diploma",
    "Some college",
    "Associate Degree",
    "Bachelor's degree",
    "Master's degree",
    "Professional school degree",
    "Doctorate degree",
  ];
  const preferredRolesOptions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Machine Learning Engineer",
    "UI/UX Designer",
    "Cybersecurity Analyst",
    "Software Engineer",
    "Data Scientist",
    "Mobile App Developer",
  ];

  // Sync local form state when user or auth status changes
  useEffect(() => {
    if (!isAuthenticated) {
      // Clear form
      setName("");
      setSkills([]);
      setInterests([]);
      setExperienceLevel("beginner");
      setPreferredRoles([]);
      setJobTitle("");
      setEducationLevel("");
      setProfilePhoto(null);
      setIsDialogOpen(false);
      setSkillsInput("");
      setInterestsInput("");
      return;
    }

    if (user) {
      setName(user.name || "");
      setSkills(Array.isArray(user.skills) ? user.skills : []);
      setInterests(Array.isArray(user.interests) ? user.interests : []);
      setExperienceLevel(user.experienceLevel || "beginner");
      setPreferredRoles(Array.isArray(user.preferredRoles) ? user.preferredRoles : []);
      setJobTitle(user.jobTitle || "");
      setEducationLevel(user.educationLevel || "");
      setProfilePhoto(null);
      setSkillsInput(Array.isArray(user.skills) ? user.skills.join(", ") : "");
      setInterestsInput(Array.isArray(user.interests) ? user.interests.join(", ") : "");
    }
  }, [user, isAuthenticated]);

  // Handle side effects on mutation success/failure and collaborative fetch error
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Profile updated successfully.");
      setIsDialogOpen(false);
      refetchUser();
      refetchRecommended();
      setProfilePhoto(null);
    }
    if (updateErrorOccurred) {
      toast.error(updateError?.data?.message || "Failed to update profile.");
    }
    if (collaborativeError) {
      toast.error(
        collaborativeErrorMsg?.data?.message ||
          "Failed to load collaborative recommendations."
      );
    }
  }, [
    updateSuccess,
    updateErrorOccurred,
    updateError,
    collaborativeError,
    collaborativeErrorMsg,
    refetchUser,
    refetchRecommended,
  ]);

  // Submit handler for updating profile
  const updateUserHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);
      if (isStudent) {
        skills.forEach((skill) => formData.append("skills[]", skill));
        interests.forEach((interest) => formData.append("interests[]", interest));
        preferredRoles.forEach((role) => formData.append("preferredRoles[]", role));
        formData.append("experienceLevel", experienceLevel);
        formData.append("educationLevel", educationLevel);
      }
      formData.append("jobTitle", jobTitle);

      await updateUser(formData).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Error updating profile.");
    }
  };

  // Handle skills input change
  const handleSkillsInputChange = (e) => {
    const input = e.target.value;
    setSkillsInput(input);
    const newSkills = input
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setSkills(newSkills);
  };

  // Handle interests input change
  const handleInterestsInputChange = (e) => {
    const input = e.target.value;
    setInterestsInput(input);
    const newInterests = input
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setInterests(newInterests);
  };

  // Handle preferred roles multi-select
  const handlePreferredRolesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setPreferredRoles(selectedOptions);
  };

  // Loading and auth guards
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 dark:text-gray-300">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2 text-gray-800 dark:text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-xl font-semibold">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 shadow-md border-4 border-blue-500 dark:border-blue-400">
            <AvatarImage
              src={user?.photoUrl || "https://avatar.iran.liara.run/public/boy"}
              alt={user?.name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="text-3xl font-extrabold bg-gray-200 dark:bg-gray-700">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "NA"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">{user?.name}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{user?.email}</p>
            <p className="text-sm uppercase font-semibold text-blue-600 dark:text-blue-400">
              {user?.role}
            </p>
            {jobTitle && (
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Job Title:</span> {jobTitle}
              </p>
            )}
            {isStudent && educationLevel && (
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Education Level:</span> {educationLevel}
              </p>
            )}
            {isStudent && experienceLevel && (
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Experience Level:</span> {experienceLevel}
              </p>
            )}
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Details Cards (only for students) */}
        {!isInstructor && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
              <h3 className="font-semibold text-xl mb-4">Skills</h3>
              {skills.length ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                  {skills.map((skill) => (
                    <li key={skill} className="text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic text-sm">
                  No skills added yet. Update your profile to add skills!
                </p>
              )}
            </section>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
              <h3 className="font-semibold text-xl mb-4">Interests</h3>
              {interests.length ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                  {interests.map((interest) => (
                    <li key={interest} className="text-sm">
                      {interest}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic text-sm">
                  No interests added yet. Share your interests to get better recommendations!
                </p>
              )}
            </section>
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl">
              <h3 className="font-semibold text-xl mb-4">Preferred Roles</h3>
              {preferredRoles.length ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                  {preferredRoles.map((role) => (
                    <li key={role} className="text-sm">
                      {role}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic text-sm">
                  No preferred roles selected. Choose roles to tailor your learning path!
                </p>
              )}
            </section>
          </div>
        )}

        {/* Enrolled Courses (only for students) */}
        {isStudent && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 relative">
              Enrolled Courses
              <span className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h2>
            {user?.enrolledCourses?.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 italic">
                You haven't enrolled in any courses yet. Explore courses to start learning!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user?.enrolledCourses?.map((course) => (
                  <Course course={course} key={course._id} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Content-Based Recommended Courses (only for students) */}
        {isStudent && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 relative">
              Recommended Courses Based on Your Profile
              <span className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h2>
            {recommendationLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse"
                  >
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recommendedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <Course course={course} key={course._id} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 italic">
                No recommendations yet. Add skills and interests to get personalized suggestions!
              </p>
            )}
          </section>
        )}

        {/* Collaborative Recommended Courses (only for students) */}
        {isStudent && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 relative">
              Courses Popular Among Similar Learners
              <span className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h2>
            {collaborativeLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse"
                  >
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : collaborativeCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collaborativeCourses.map((course) => (
                  <Course course={course} key={course._id} />
                ))}
              </div>
            ) : (
              <div className="text-gray-600 dark:text-gray-400 italic">
                <p>No collaborative recommendations yet.</p>
                <p className="mt-2">
                  Enroll in more courses to discover what similar learners are studying!
                  <a
                    href="/course/search?query"
                    className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
                  >
                    Explore Courses
                  </a>
                </p>
              </div>
            )}
          </section>
        )}

        {/* Edit Profile Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile details to enhance your learning experience.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Profile Photo</Label>
                <Input
                  onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
                  type="file"
                  accept="image/*"
                  className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
              {!isInstructor && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Skills</Label>
                    <Input
                      value={skillsInput}
                      onChange={handleSkillsInputChange}
                      placeholder="e.g., JavaScript, Python"
                      className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Interests</Label>
                    <Input
                      value={interestsInput}
                      onChange={handleInterestsInputChange}
                      placeholder="e.g., Web Development, AI"
                      className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Preferred Roles</Label>
                    <Select
                      multiple
                      value={preferredRoles}
                      onChange={handlePreferredRolesChange}
                      options={preferredRolesOptions}
                      placeholder="Select preferred roles"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Experience Level</Label>
                    <Select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      options={experienceLevelOptions}
                      placeholder="Select experience level"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Education Level</Label>
                    <Select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      options={educationLevelOptions}
                      placeholder="Select education level"
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Job Title</Label>
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={updateUserHandler}
                disabled={updateUserIsLoading}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                {updateUserIsLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;