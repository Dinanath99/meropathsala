

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
// import { useGetRecommendedCoursesQuery } from "@/features/api/courseApi";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import Course from "./Course";

// const Profile = () => {
//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");
//   const [preferredRoles, setPreferredRoles] = useState([]);
//   const [jobTitle, setJobTitle] = useState("");
//   const [educationLevel, setEducationLevel] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const { data, isLoading, refetch: refetchUser } = useLoadUserQuery();

//   const {
//     data: recommendationData,
//     isLoading: recommendationLoading,
//     refetch: refetchRecommended,
//   } = useGetRecommendedCoursesQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   const recommendedCourses = recommendationData?.recommendedCourses || [];

//   const [
//     updateUser,
//     { isLoading: updateUserIsLoading, isError, error, isSuccess },
//   ] = useUpdateUserMutation();

//   const user = data?.user;
//   const isStudent = user?.role === "student";
//   const isInstructor = user?.role === "instructor";

//   useEffect(() => {
//     if (user) {
//       setName(user.name || "");
//       setSkills(user.skills || []);
//       setInterests(user.interests || []);
//       setExperienceLevel(user.experienceLevel || "beginner");
//       setPreferredRoles(user.preferredRoles || []);
//       setJobTitle(user.jobTitle || "");
//       setEducationLevel(user.educationLevel || "");
//     }
//   }, [user]);

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Profile updated.");
//       setIsDialogOpen(false);
//       refetchUser();
//       refetchRecommended();
//       setProfilePhoto(null);
//     }
//     if (isError) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   }, [isSuccess, isError]);

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (profilePhoto) formData.append("profilePhoto", profilePhoto);
//     if (isStudent) {
//       skills.forEach((skill) => formData.append("skills[]", skill));
//       interests.forEach((interest) =>
//         formData.append("interests[]", interest)
//       );
//       preferredRoles.forEach((role) =>
//         formData.append("preferredRoles[]", role)
//       );
//       formData.append("experienceLevel", experienceLevel);
//       formData.append("educationLevel", educationLevel);
//     }
//     formData.append("jobTitle", jobTitle);

//     await updateUser(formData);
//   };

//   if (isLoading)
//     return (
//       <h1 className="text-center py-20 text-xl font-semibold text-gray-800 dark:text-white">
//         Loading profile...
//       </h1>
//     );

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-10 space-y-10 text-gray-800 dark:text-gray-200">
//       <h1 className="text-3xl font-bold text-center md:text-left">Profile</h1>

//       {/* Profile Header */}
//       <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
//         <Avatar className="h-32 w-32 md:h-40 md:w-40 shadow-lg">
//           <AvatarImage
//             src={user.photoUrl || "https://github.com/shadcn.png"}
//             alt={user.name || "User"}
//             className="object-cover"
//           />
//           <AvatarFallback className="text-3xl font-extrabold bg-gray-300 dark:bg-gray-700">
//             {user.name
//               ? user.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")
//                   .toUpperCase()
//               : "NA"}
//           </AvatarFallback>
//         </Avatar>
//         <div className="flex-1 space-y-3">
//           <h2 className="text-4xl font-bold">{user.name}</h2>
//           <p className="text-lg text-gray-700 dark:text-gray-300">{user.email}</p>
//           <p className="uppercase text-blue-600 font-semibold">{user.role}</p>
//           {jobTitle && (
//             <p>
//               <span className="font-semibold">Job Title:</span> {jobTitle}
//             </p>
//           )}
//           {isStudent && educationLevel && (
//             <p>
//               <span className="font-semibold">Education Level:</span>{" "}
//               {educationLevel}
//             </p>
//           )}
//           {isStudent && experienceLevel && (
//             <p>
//               <span className="font-semibold">Experience Level:</span>{" "}
//               {experienceLevel}
//             </p>
//           )}
//           <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
//             Edit Profile
//           </Button>
//         </div>
//       </div>

//       {/* Details Cards */}
//       {!isInstructor && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <section className="rounded-lg shadow p-5 bg-white dark:bg-gray-800">
//             <h3 className="font-semibold text-xl mb-3">Skills</h3>
//             {skills.length ? (
//               <ul className="list-disc list-inside space-y-1">
//                 {skills.map((skill) => (
//                   <li key={skill}>{skill}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400 italic">
//                 No skills added.
//               </p>
//             )}
//           </section>

//           <section className="rounded-lg shadow p-5 bg-white dark:bg-gray-800">
//             <h3 className="font-semibold text-xl mb-3">Interests</h3>
//             {interests.length ? (
//               <ul className="list-disc list-inside space-y-1">
//                 {interests.map((interest) => (
//                   <li key={interest}>{interest}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400 italic">
//                 No interests added.
//               </p>
//             )}
//           </section>

//           <section className="rounded-lg shadow p-5 bg-white dark:bg-gray-800">
//             <h3 className="font-semibold text-xl mb-3">Preferred Roles</h3>
//             {preferredRoles.length ? (
//               <ul className="list-disc list-inside space-y-1">
//                 {preferredRoles.map((role) => (
//                   <li key={role}>{role}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500 dark:text-gray-400 italic">
//                 No preferred roles selected.
//               </p>
//             )}
//           </section>
//         </div>
//       )}

//       {/* Enrolled Courses */}
//       {isStudent && (
//         <section>
//           <h2 className="font-semibold text-2xl mb-5">Enrolled Courses</h2>
//           {user.enrolledCourses?.length === 0 ? (
//             <p className="italic text-gray-600 dark:text-gray-400">
//               You haven't enrolled yet.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//               {user.enrolledCourses.map((course) => (
//                 <Course course={course} key={course._id} />
//               ))}
//             </div>
//           )}
//         </section>
//       )}

//       {/* Recommended Courses */}
//       {isStudent && (
//         <section>
//           <h2 className="font-semibold text-2xl mb-5">
//             What to learn next based on your skills and interests
//           </h2>
//           {recommendationLoading ? (
//             <p>Loading recommended courses...</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//               {recommendedCourses.length > 0 ? (
//                 recommendedCourses.map((course) => (
//                   <Course course={course} key={course._id} />
//                 ))
//               ) : (
//                 <p className="italic text-gray-600 dark:text-gray-400">
//                   No recommendations yet. Try adding skills & interests.
//                 </p>
//               )}
//             </div>
//           )}
//         </section>
//       )}

//       {/* Edit Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-w-3xl bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
//           <DialogHeader>
//             <DialogTitle>Edit Profile</DialogTitle>
//             <DialogDescription>Update your details below.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label>Name</Label>
//               <Input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Name"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label>Profile Photo</Label>
//               <Input
//                 onChange={(e) => setProfilePhoto(e.target.files?.[0] || "")}
//                 type="file"
//                 accept="image/*"
//                 className="col-span-3"
//               />
//             </div>

//             {!isInstructor && (
//               <>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Skills</Label>
//                   <Input
//                     value={skills.join(", ")}
//                     onChange={(e) =>
//                       setSkills(e.target.value.split(",").map((s) => s.trim()))
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Interests</Label>
//                   <Input
//                     value={interests.join(", ")}
//                     onChange={(e) =>
//                       setInterests(
//                         e.target.value.split(",").map((s) => s.trim())
//                       )
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Preferred Roles</Label>
//                   <select
//                     multiple
//                     className="border p-2 rounded col-span-3 bg-white dark:bg-gray-800 dark:text-white h-40"
//                     value={preferredRoles}
//                     onChange={(e) =>
//                       setPreferredRoles(
//                         Array.from(
//                           e.target.selectedOptions,
//                           (option) => option.value
//                         )
//                       )
//                     }
//                   >
//                     <option value="Frontend Developer">Frontend Developer</option>
//                     <option value="Backend Developer">Backend Developer</option>
//                     <option value="Fullstack Developer">Fullstack Developer</option>
//                     <option value="DevOps Engineer">DevOps Engineer</option>
//                     <option value="UI/UX Designer">UI/UX Designer</option>
//                     <option value="Cybersecurity Specialist">Cybersecurity Specialist</option>
//                     <option value="Machine Learning Engineer">Machine Learning Engineer</option>
//                     <option value="Data Scientist">Data Scientist</option>
//                   </select>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Education Level</Label>
//                   <select
//                     className="border p-2 rounded col-span-3 bg-white dark:bg-gray-800 dark:text-white"
//                     value={educationLevel}
//                     onChange={(e) => setEducationLevel(e.target.value)}
//                   >
//                     <option value="">Select Education Level</option>
//                     <option value="Less than high school diploma">Less than high school diploma</option>
//                     <option value="High school diploma">High school diploma</option>
//                     <option value="Some college">Some college</option>
//                     <option value="Associate Degree">Associate Degree</option>
//                     <option value="Bachelor's degree">Bachelor's degree</option>
//                     <option value="Master's degree">Master's degree</option>
//                     <option value="Professional school degree">Professional school degree</option>
//                     <option value="Doctorate degree">Doctorate degree</option>
//                   </select>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Experience Level</Label>
//                   <select
//                     className="border p-2 rounded col-span-3 bg-white dark:bg-gray-800 dark:text-white"
//                     value={experienceLevel}
//                     onChange={(e) => setExperienceLevel(e.target.value)}
//                   >
//                     <option value="beginner">Beginner</option>
//                     <option value="medium">Intermediate</option>
//                     <option value="advanced">Advanced</option>
//                   </select>
//                 </div>
//               </>
//             )}

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label>Job Title</Label>
//               <Input
//                 value={jobTitle}
//                 onChange={(e) => setJobTitle(e.target.value)}
//                 className="col-span-3"
//                 placeholder="Job title"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
//               {updateUserIsLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
//                 </>
//               ) : (
//                 "Save Changes"
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Profile;




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
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import Course from "./Course";

// const Profile = () => {
//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");
//   const [preferredRoles, setPreferredRoles] = useState([]);
//   const [jobTitle, setJobTitle] = useState("");
//   const [educationLevel, setEducationLevel] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const { data, isLoading, refetch: refetchUser } = useLoadUserQuery();
//   const {
//     data: recommendationData,
//     isLoading: recommendationLoading,
//     refetch: refetchRecommended,
//   } = useGetRecommendedCoursesQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });
//   const {
//     data: collaborativeData,
//     isLoading: collaborativeLoading,
//     isError: collaborativeError,
//     error: collaborativeErrorMsg,
//   } = useGetCollaborativeCoursesQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   const recommendedCourses = recommendationData?.recommendedCourses || [];
//   const collaborativeCourses = collaborativeData?.recommendedCourses || [];

//   const [
//     updateUser,
//     { isLoading: updateUserIsLoading, isError, error: updateError, isSuccess },
//   ] = useUpdateUserMutation();

//   const user = data?.user;
//   const isStudent = user?.role === "student";
//   const isInstructor = user?.role === "instructor";

//   useEffect(() => {
//     if (user) {
//       setName(user.name || "");
//       setSkills(user.skills || []);
//       setInterests(user.interests || []);
//       setExperienceLevel(user.experienceLevel || "beginner");
//       setPreferredRoles(user.preferredRoles || []);
//       setJobTitle(user.jobTitle || "");
//       setEducationLevel(user.educationLevel || "");
//     }
//   }, [user]);

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Profile updated successfully.");
//       setIsDialogOpen(false);
//       refetchUser();
//       refetchRecommended();
//       setProfilePhoto(null);
//     }
//     if (isError) {
//       toast.error(updateError?.data?.message || "Failed to update profile.");
//     }
//     if (collaborativeError) {
//       toast.error(
//         collaborativeErrorMsg?.data?.message ||
//           "Failed to load collaborative recommendations."
//       );
//     }
//   }, [
//     isSuccess,
//     isError,
//     updateError,
//     collaborativeError,
//     collaborativeErrorMsg,
//     refetchUser,
//     refetchRecommended,
//   ]);

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (profilePhoto) formData.append("profilePhoto", profilePhoto);
//     if (isStudent) {
//       skills.forEach((skill) => formData.append("skills[]", skill));
//       interests.forEach((interest) => formData.append("interests[]", interest));
//       preferredRoles.forEach((role) => formData.append("preferredRoles[]", role));
//       formData.append("experienceLevel", experienceLevel);
//       formData.append("educationLevel", educationLevel);
//     }
//     formData.append("jobTitle", jobTitle);

//     await updateUser(formData);
//   };

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
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
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

//         {/* Details Cards */}
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

//         {/* Enrolled Courses */}
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

//         {/* Content-Based Recommended Courses */}
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

//         {/* Collaborative Recommended Courses */}
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
//                       value={skills.join(", ")}
//                       onChange={(e) =>
//                         setSkills(
//                           e.target.value
//                             .split(",")
//                             .map((s) => s.trim())
//                             .filter((s) => s)
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
//                             .filter((s) => s)
//                         )
//                       }
//                       placeholder="e.g., Web Development, AI"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Preferred Roles</Label>
//                     <select
//                       multiple
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 p-2 rounded-md h-40"
//                       value={preferredRoles}
//                       onChange={(e) =>
//                         setPreferredRoles(
//                           Array.from(e.target.selectedOptions, (option) => option.value)
//                         )
//                       }
//                     >
//                       <option value="Frontend Developer">Frontend Developer</option>
//                       <option value="Backend Developer">Backend Developer</option>
//                       <option value="Fullstack Developer">Fullstack Developer</option>
//                       <option value="DevOps Engineer">DevOps Engineer</option>
//                       <option value="UI/UX Designer">UI/UX Designer</option>
//                       <option value="Cybersecurity Specialist">
//                         Cybersecurity Specialist
//                       </option>
//                       <option value="Machine Learning Engineer">
//                         Machine Learning Engineer
//                       </option>
//                       <option value="Data Scientist">Data Scientist</option>
//                       <option value="Mobile App Developer">Mobile App Developer</option>
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Education Level</Label>
//                     <select
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 p-2 rounded-md"
//                       value={educationLevel}
//                       onChange={(e) => setEducationLevel(e.target.value)}
//                     >
//                       <option value="">Select Education Level</option>
//                       <option value="Less than high school diploma">
//                         Less than high school diploma
//                       </option>
//                       <option value="High school diploma">High school diploma</option>
//                       <option value="Some college">Some college</option>
//                       <option value="Associate Degree">Associate Degree</option>
//                       <option value="Bachelor's degree">Bachelor's degree</option>
//                       <option value="Master's degree">Master's degree</option>
//                       <option value="Professional school degree">
//                         Professional school degree
//                       </option>
//                       <option value="Doctorate degree">Doctorate degree</option>
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Experience Level</Label>
//                     <select
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 p-2 rounded-md"
//                       value={experienceLevel}
//                       onChange={(e) => setExperienceLevel(e.target.value)}
//                     >
//                       <option value="beginner">Beginner</option>
//                       <option value="intermediate">Intermediate</option>
//                       <option value="advanced">Advanced</option>
//                     </select>
//                   </div>
//                 </>
//               )}
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label className="text-right">Job Title</Label>
//                 <Input
//                   value={jobTitle}
//                   onChange={(e) => setJobTitle(e.target.value)}
//                   placeholder="Your job title"
//                   className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 disabled={updateUserIsLoading}
//                 onClick={updateUserHandler}
//                 className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform transform hover:scale-105"
//               >
//                 {updateUserIsLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
//                   </>
//                 ) : (
//                   "Save Changes"
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

//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");
//   const [preferredRoles, setPreferredRoles] = useState([]);
//   const [jobTitle, setJobTitle] = useState("");
//   const [educationLevel, setEducationLevel] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   // Skip queries when not authenticated to avoid stale cached data
//   const { data, isLoading, refetch: refetchUser } = useLoadUserQuery(undefined, {
//     skip: !isAuthenticated,
//   });

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

//   const [
//     updateUser,
//     { isLoading: updateUserIsLoading, isError, error: updateError, isSuccess },
//   ] = useUpdateUserMutation();

//   const user = data?.user;
//   const isStudent = user?.role === "student";
//   const isInstructor = user?.role === "instructor";

//   // Clear or populate local state on auth change or user change
//   useEffect(() => {
//     if (!isAuthenticated) {
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
//       setSkills(user.skills || []);
//       setInterests(user.interests || []);
//       setExperienceLevel(user.experienceLevel || "beginner");
//       setPreferredRoles(user.preferredRoles || []);
//       setJobTitle(user.jobTitle || "");
//       setEducationLevel(user.educationLevel || "");
//     }
//   }, [user, isAuthenticated]);

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Profile updated successfully.");
//       setIsDialogOpen(false);
//       refetchUser();
//       refetchRecommended();
//       setProfilePhoto(null);
//     }
//     if (isError) {
//       toast.error(updateError?.data?.message || "Failed to update profile.");
//     }
//     if (collaborativeError) {
//       toast.error(
//         collaborativeErrorMsg?.data?.message ||
//           "Failed to load collaborative recommendations."
//       );
//     }
//   }, [
//     isSuccess,
//     isError,
//     updateError,
//     collaborativeError,
//     collaborativeErrorMsg,
//     refetchUser,
//     refetchRecommended,
//   ]);

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (profilePhoto) formData.append("profilePhoto", profilePhoto);
//     if (isStudent) {
//       skills.forEach((skill) => formData.append("skills[]", skill));
//       interests.forEach((interest) => formData.append("interests[]", interest));
//       preferredRoles.forEach((role) => formData.append("preferredRoles[]", role));
//       formData.append("experienceLevel", experienceLevel);
//       formData.append("educationLevel", educationLevel);
//     }
//     formData.append("jobTitle", jobTitle);

//     await updateUser(formData);
//   };

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
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
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

//         {/* Details Cards */}
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

//         {/* Enrolled Courses */}
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

//         {/* Content-Based Recommended Courses */}
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

//         {/* Collaborative Recommended Courses */}
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
//                       value={skills.join(", ")}
//                       onChange={(e) =>
//                         setSkills(
//                           e.target.value
//                             .split(",")
//                             .map((s) => s.trim())
//                             .filter((s) => s)
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
//                             .filter((s) => s)
//                         )
//                       }
//                       placeholder="e.g., Web Development, AI"
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Preferred Roles</Label>
//                     <select
//                       multiple
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 p-2 rounded-md h-40"
//                       value={preferredRoles}
//                       onChange={(e) =>
//                         setPreferredRoles(
//                           Array.from(e.target.selectedOptions, (option) => option.value)
//                         )
//                       }
//                     >
//                       <option value="Frontend Developer">Frontend Developer</option>
//                       <option value="Backend Developer">Backend Developer</option>
//                       <option value="Fullstack Developer">Fullstack Developer</option>
//                       <option value="Data Scientist">Data Scientist</option>
//                       <option value="DevOps Engineer">DevOps Engineer</option>
//                       {/* Add more roles as needed */}
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Experience Level</Label>
//                     <select
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 p-2 rounded-md"
//                       value={experienceLevel}
//                       onChange={(e) => setExperienceLevel(e.target.value)}
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
//                   type="text"
//                   value={jobTitle}
//                   onChange={(e) => setJobTitle(e.target.value)}
//                   placeholder="Your current job title"
//                   className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 onClick={() => setIsDialogOpen(false)}
//                 variant="outline"
//                 className="mr-2"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 disabled={updateUserIsLoading}
//                 onClick={updateUserHandler}
//               >
//                 {updateUserIsLoading ? "Saving..." : "Save"}
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

//         {/* Details Cards */}
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

//         {/* Enrolled Courses */}
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

//         {/* Content-Based Recommended Courses */}
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

//         {/* Collaborative Recommended Courses */}
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
//                       value={skills.join(", ")}
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
//                     <select
//                       multiple
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 p-2 rounded-md h-40"
//                       value={preferredRoles}
//                       onChange={(e) =>
//                         setPreferredRoles(
//                           Array.from(e.target.selectedOptions, (option) => option.value)
//                         )
//                       }
//                     >
//                       <option value="Frontend Developer">Frontend Developer</option>
//                       <option value="Backend Developer">Backend Developer</option>
//                       <option value="Fullstack Developer">Fullstack Developer</option>
//                       <option value="Data Scientist">Data Scientist</option>
//                       <option value="DevOps Engineer">DevOps Engineer</option>
//                       {/* Add more roles as needed */}
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Experience Level</Label>
//                     <select
//                       className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 p-2 rounded-md"
//                       value={experienceLevel}
//                       onChange={(e) => setExperienceLevel(e.target.value)}
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
//                   type="text"
//                   value={jobTitle}
//                   onChange={(e) => setJobTitle(e.target.value)}
//                   placeholder="Your current job title"
//                   className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 onClick={() => setIsDialogOpen(false)}
//                 variant="outline"
//                 className="mr-2"
//               >
//                 Cancel
//               </Button>
//               <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
//                 {updateUserIsLoading ? (
//                   <>
//                     <Loader2 className="inline h-4 w-4 animate-spin mr-2" />
//                     Saving...
//                   </>
//                 ) : (
//                   "Save"
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
                      value={skills.join(", ")}
                      onChange={(e) =>
                        setSkills(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                      placeholder="e.g., JavaScript, Python"
                      className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Interests</Label>
                    <Input
                      value={interests.join(", ")}
                      onChange={(e) =>
                        setInterests(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                      placeholder="e.g., Web Development, AI"
                      className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Preferred Roles</Label>
                    <Input
                      value={preferredRoles.join(", ")}
                      onChange={(e) =>
                        setPreferredRoles(
                          e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                      placeholder="e.g., Frontend Developer, Data Scientist"
                      className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Experience Level</Label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="col-span-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 rounded"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Education Level</Label>
                    <Input
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      placeholder="e.g., Bachelor's, Master's"
                      className="col-span-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
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
