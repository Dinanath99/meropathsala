// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import Course from "./Course";
// import {
//   useLoadUserQuery,
//   useUpdateUserMutation,
// } from "@/features/api/authApi";
// import { toast } from "sonner";

// const Profile = () => {
//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState("");

//   const { data, isLoading, refetch } = useLoadUserQuery();
//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   console.log(data);

//   const onChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("profilePhoto", profilePhoto);
//     await updateUser(formData);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success(data.message || "Profile updated.");
//     }
//     if (isError) {
//       toast.error(error.message || "Failed to update profile");
//     }
//   }, [error, updateUserData, isSuccess, isError]);

//   if (isLoading) return <h1>Profile Loading...</h1>;

//   const user = data && data.user;

//   console.log(user);
  

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-10">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Name:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.name}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Email:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.email}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Role:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.role.toUpperCase()}
//               </span>
//             </h1>
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're
//                   done.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
//                       wait
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//       <div>
//         <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
//           {user.enrolledCourses.length === 0 ? (
//             <h1>You haven't enrolled yet</h1>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>
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
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import Course from "./Course";
// import {
//   useLoadUserQuery,
//   useUpdateUserMutation,
// } from "@/features/api/authApi";
// import { toast } from "sonner";

// const Profile = () => {
//   const [name, setName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");

//   const { data, isLoading, refetch } = useLoadUserQuery();
//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const onChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (profilePhoto) {
//       formData.append("profilePhoto", profilePhoto);
//     }

//     skills.forEach((skill) => formData.append("skills[]", skill));
//     interests.forEach((interest) => formData.append("interests[]", interest));
//     formData.append("experienceLevel", experienceLevel);

//     await updateUser(formData);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (data?.user) {
//       setName(data.user.name || "");
//       setSkills(data.user.skills || []);
//       setInterests(data.user.interests || []);
//       setExperienceLevel(data.user.experienceLevel || "beginner");
//     }
//   }, [data]);

//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success("Profile updated.");
//     }
//     if (isError) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   }, [error, updateUserData, isSuccess, isError]);

//   if (isLoading) return <h1>Profile Loading...</h1>;

//   const user = data && data.user;

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-10">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Name:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.name}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Email:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.email}
//               </span>
//             </h1>
//           </div>
//           <div className="mb-2">
//             <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
//               Role:
//               <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
//                 {user.role.toUpperCase()}
//               </span>
//             </h1>
//           </div>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-2">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Make changes to your profile here. Click save when you're
//                   done.
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Skills</Label>
//                   <Input
//                     type="text"
//                     placeholder="E.g., React, Node.js"
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
//                     type="text"
//                     placeholder="E.g., Web Dev, AI"
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
//                   <Label>Experience</Label>
//                   <select
//                     className="border p-2 rounded col-span-3"
//                     value={experienceLevel}
//                     onChange={(e) => setExperienceLevel(e.target.value)}
//                   >
//                     <option value="beginner">Beginner</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="advanced">Advanced</option>
//                   </select>
//                 </div>
//               </div>

//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Please wait
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div>
//         <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
//           {user.enrolledCourses.length === 0 ? (
//             <h1>You haven't enrolled yet</h1>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>
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
//   DialogTrigger,
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
//   const [profilePhoto, setProfilePhoto] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");

//   const { data, isLoading, refetch } = useLoadUserQuery();
//   const {  data:recommendedCourses } = useGetRecommendedCoursesQuery();

// console.log("recommendation course",recommendedCourses)
//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const onChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (profilePhoto) {
//       formData.append("profilePhoto", profilePhoto);
//     }
//     skills.forEach((skill) => formData.append("skills[]", skill));
//     interests.forEach((interest) => formData.append("interests[]", interest));
//     formData.append("experienceLevel", experienceLevel);
//     await updateUser(formData);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (data?.user) {
//       setName(data.user.name || "");
//       setSkills(data.user.skills || []);
//       setInterests(data.user.interests || []);
//       setExperienceLevel(data.user.experienceLevel || "beginner");
//     }
//   }, [data]);

//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success("Profile updated.");
//     }
//     if (isError) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   }, [error, updateUserData, isSuccess, isError]);

//   if (isLoading) return <h1>Loading profile...</h1>;

//   const user = data && data.user;

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-10">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt="@shadcn"
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2 font-semibold">
//             Name:
//             <span className="font-normal ml-2">{user.name}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Email:
//             <span className="font-normal ml-2">{user.email}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Role:
//             <span className="font-normal ml-2">{user.role.toUpperCase()}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Experience Level:
//             <span className="font-normal ml-2">{user.experienceLevel}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Skills:
//             <span className="font-normal ml-2">
//               {user.skills?.join(", ") || "None"}
//             </span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Interests:
//             <span className="font-normal ml-2">
//               {user.interests?.join(", ") || "None"}
//             </span>
//           </div>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-3">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Update your details below.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
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
//                   <Label>Experience</Label>
//                   <select
//                     className="border p-2 rounded col-span-3"
//                     value={experienceLevel}
//                     onChange={(e) => setExperienceLevel(e.target.value)}
//                   >
//                     <option value="beginner">Beginner</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="advanced">Advanced</option>
//                   </select>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
//                       Saving...
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div className="mt-10">
//         <h2 className="font-semibold text-xl mb-4">
//           Courses You're Enrolled In
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {user.enrolledCourses.length === 0 ? (
//             <h1>You haven't enrolled yet</h1>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>

//       <div className="mt-10">
//         <h2 className="font-semibold text-xl mb-4">Recommended Courses</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {recommendedCourses?.courses?.length > 0 ? (
//             recommendedCourses.courses.map((course) => (
//               <Course course={course} key={course._id} />
//             ))
//           ) : (
//             <p>No recommendations yet. Try adding skills & interests.</p>
//           )}
//         </div>
//       </div>
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
//   DialogTrigger,
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
//   const [profilePhoto, setProfilePhoto] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");

//   const { data, isLoading, refetch } = useLoadUserQuery();
//   const {
//     data: recommendationData,
//     isLoading: recommendationLoading,
//   } = useGetRecommendedCoursesQuery();

//   const recommendedCourses = recommendationData?.recommendedCourses || [];

//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const onChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (profilePhoto) {
//       formData.append("profilePhoto", profilePhoto);
//     }
//     skills.forEach((skill) => formData.append("skills[]", skill));
//     interests.forEach((interest) => formData.append("interests[]", interest));
//     formData.append("experienceLevel", experienceLevel);
//     await updateUser(formData);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (data?.user) {
//       setName(data.user.name || "");
//       setSkills(data.user.skills || []);
//       setInterests(data.user.interests || []);
//       setExperienceLevel(data.user.experienceLevel || "beginner");
//     }
//   }, [data]);

//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success("Profile updated.");
//     }
//     if (isError) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   }, [error, updateUserData, isSuccess, isError]);

//   if (isLoading) return <h1>Loading profile...</h1>;

//   const user = data && data.user;

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-10">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt={user?.name || "User"}
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2 font-semibold">
//             Name:
//             <span className="font-normal ml-2">{user.name}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Email:
//             <span className="font-normal ml-2">{user.email}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Role:
//             <span className="font-normal ml-2">{user.role.toUpperCase()}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Experience Level:
//             <span className="font-normal ml-2">{user.experienceLevel}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Skills:
//             <span className="font-normal ml-2">
//               {user.skills?.join(", ") || "None"}
//             </span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Interests:
//             <span className="font-normal ml-2">
//               {user.interests?.join(", ") || "None"}
//             </span>
//           </div>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-3">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Update your details below.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
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
//                   <Label>Experience</Label>
//                   <select
//                     className="border p-2 rounded col-span-3"
//                     value={experienceLevel}
//                     onChange={(e) => setExperienceLevel(e.target.value)}
//                   >
//                     <option value="beginner">Beginner</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="advanced">Advanced</option>
//                   </select>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* Enrolled Courses */}
//       <div className="mt-10">
//         <h2 className="font-semibold text-xl mb-4">
//           Courses You're Enrolled In
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {user.enrolledCourses?.length === 0 ? (
//             <p>You haven't enrolled yet</p>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>

//       {/* Recommended Courses */}
//       <div className="mt-10">
//         <h2 className="font-semibold text-xl mb-4">Recommended Courses</h2>
//         {recommendationLoading ? (
//           <p>Loading recommended courses...</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {recommendedCourses.length > 0 ? (
//               recommendedCourses.map((course) => (
//                 <Course course={course} key={course._id} />
//               ))
//             ) : (
//               <p>No recommendations yet. Try adding skills & interests.</p>
//             )}
//           </div>
//         )}
//       </div>
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
//   DialogTrigger,
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
//   const [profilePhoto, setProfilePhoto] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // dialog state

//   const { data, isLoading, refetch } = useLoadUserQuery();
//   const {
//     data: recommendationData,
//     isLoading: recommendationLoading,
//   } = useGetRecommendedCoursesQuery();

//   const recommendedCourses = recommendationData?.recommendedCourses || [];

//   const [
//     updateUser,
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const onChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (profilePhoto) {
//       formData.append("profilePhoto", profilePhoto);
//     }
//     skills.forEach((skill) => formData.append("skills[]", skill));
//     interests.forEach((interest) => formData.append("interests[]", interest));
//     formData.append("experienceLevel", experienceLevel);
//     await updateUser(formData);
//   };

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     if (data?.user) {
//       setName(data.user.name || "");
//       setSkills(data.user.skills || []);
//       setInterests(data.user.interests || []);
//       setExperienceLevel(data.user.experienceLevel || "beginner");
//     }
//   }, [data]);

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Profile updated.");
//       refetch(); // refresh data
//       setIsDialogOpen(false); // close the form
//     }
//     if (isError) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   }, [isSuccess, isError]);

//   if (isLoading) return <h1>Loading profile...</h1>;

//   const user = data && data.user;

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-10">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt={user?.name || "User"}
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2 font-semibold">
//             Name: <span className="font-normal ml-2">{user.name}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Email: <span className="font-normal ml-2">{user.email}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Role: <span className="font-normal ml-2">{user.role.toUpperCase()}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Experience Level:
//             <span className="font-normal ml-2">{user.experienceLevel}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Skills:
//             <span className="font-normal ml-2">
//               {user.skills?.join(", ") || "None"}
//             </span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Interests:
//             <span className="font-normal ml-2">
//               {user.interests?.join(", ") || "None"}
//             </span>
//           </div>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-3">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Update your details below.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
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
//                   <Label>Experience</Label>
//                   <select
//                     className="border p-2 rounded col-span-3"
//                     value={experienceLevel}
//                     onChange={(e) => setExperienceLevel(e.target.value)}
//                   >
//                     <option value="beginner">Beginner</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="advanced">Advanced</option>
//                   </select>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* Enrolled Courses */}
//       <div className="mt-10">
//         <h2 className="font-semibold text-xl mb-4">Courses You're Enrolled In</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {user.enrolledCourses?.length === 0 ? (
//             <p>You haven't enrolled yet</p>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>

//       {/* Recommended Courses */}
//       <div className="mt-10">
//         <h2 className="font-semibold text-xl mb-4">Recommended Courses</h2>
//         {recommendationLoading ? (
//           <p>Loading recommended courses...</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {recommendedCourses.length > 0 ? (
//               recommendedCourses.map((course) => (
//                 <Course course={course} key={course._id} />
//               ))
//             ) : (
//               <p>No recommendations yet. Try adding skills & interests.</p>
//             )}
//           </div>
//         )}
//       </div>
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
//   DialogTrigger,
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
//   const [profilePhoto, setProfilePhoto] = useState("");
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // control dialog

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
//     {
//       data: updateUserData,
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const onChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProfilePhoto(file);
//   };

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (profilePhoto) {
//       formData.append("profilePhoto", profilePhoto);
//     }
//     skills.forEach((skill) => formData.append("skills[]", skill));
//     interests.forEach((interest) => formData.append("interests[]", interest));
//     formData.append("experienceLevel", experienceLevel);
//     await updateUser(formData);
//   };

//   useEffect(() => {
//     refetchUser();
//   }, []);

//   useEffect(() => {
//     if (data?.user) {
//       setName(data.user.name || "");
//       setSkills(data.user.skills || []);
//       setInterests(data.user.interests || []);
//       setExperienceLevel(data.user.experienceLevel || "beginner");
//     }
//   }, [data]);

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Profile updated.");
//       setIsDialogOpen(false); // close modal
//       refetchUser(); // refresh user data
//       refetchRecommended(); // refresh recommended courses
//     }
//     if (isError) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   }, [isSuccess, isError]);

//   if (isLoading) return <h1>Loading profile...</h1>;

//   const user = data?.user;

//   return (
//     <div className="max-w-4xl mx-auto px-4 my-10">
//       <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
//         <div className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
//             <AvatarImage
//               src={user?.photoUrl || "https://github.com/shadcn.png"}
//               alt={user?.name || "User"}
//             />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//         </div>
//         <div>
//           <div className="mb-2 font-semibold">
//             Name: <span className="font-normal ml-2">{user.name}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Email: <span className="font-normal ml-2">{user.email}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Role: <span className="font-normal ml-2">{user.role.toUpperCase()}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Experience Level:
//             <span className="font-normal ml-2">{user.experienceLevel}</span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Skills:
//             <span className="font-normal ml-2">
//               {user.skills?.join(", ") || "None"}
//             </span>
//           </div>
//           <div className="mb-2 font-semibold">
//             Interests:
//             <span className="font-normal ml-2">
//               {user.interests?.join(", ") || "None"}
//             </span>
//           </div>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button size="sm" className="mt-3">
//                 Edit Profile
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>
//                   Update your details below.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label>Profile Photo</Label>
//                   <Input
//                     onChange={onChangeHandler}
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>
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
//                   <Label>Experience</Label>
//                   <select
//                     className="border p-2 rounded col-span-3"
//                     value={experienceLevel}
//                     onChange={(e) => setExperienceLevel(e.target.value)}
//                   >
//                     <option value="beginner">Beginner</option>
//                     <option value="intermediate">Intermediate</option>
//                     <option value="advanced">Advanced</option>
//                   </select>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button
//                   disabled={updateUserIsLoading}
//                   onClick={updateUserHandler}
//                 >
//                   {updateUserIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* Enrolled Courses */}
//       <div className="mt-10">
//         <h2 className="font-semibold text-xl mb-4">Courses You're Enrolled In</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {user.enrolledCourses?.length === 0 ? (
//             <p>You haven't enrolled yet</p>
//           ) : (
//             user.enrolledCourses.map((course) => (
//               <Course course={course} key={course._id} />
//             ))
//           )}
//         </div>
//       </div>

//       {/* Recommended Courses */}
//       <div className="mt-10"> <h2 className="font-semibold text-5xl mb-4">What to learn next</h2>
//         <h2 className="font-semibold text-xl mb-4">Recommended for you</h2>
//         {recommendationLoading ? (
//           <p>Loading recommended courses...</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {recommendedCourses.length > 0 ? (
//               recommendedCourses.map((course) => (
//                 <Course course={course} key={course._id} />
//               ))
//             ) : (
//               <p>No recommendations yet. Try adding skills & interests.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { useGetRecommendedCoursesQuery } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Course from "./Course";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, refetch: refetchUser } = useLoadUserQuery();

  const {
    data: recommendationData,
    isLoading: recommendationLoading,
    refetch: refetchRecommended,
  } = useGetRecommendedCoursesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const recommendedCourses = recommendationData?.recommendedCourses || [];

  const [
    updateUser,
    {
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    skills.forEach((skill) => formData.append("skills[]", skill));
    interests.forEach((interest) => formData.append("interests[]", interest));
    formData.append("experienceLevel", experienceLevel);
    await updateUser(formData);
  };

  useEffect(() => {
    refetchUser();
  }, []);

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name || "");
      setSkills(data.user.skills || []);
      setInterests(data.user.interests || []);
      setExperienceLevel(data.user.experienceLevel || "beginner");
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated.");
      setIsDialogOpen(false);
      refetchUser();
      refetchRecommended();
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [isSuccess, isError]);

  if (isLoading) return <h1>Loading profile...</h1>;

  const user = data?.user;
  const isStudent = user?.role === "student";

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt={user?.name || "User"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2 font-semibold">
            Name: <span className="font-normal ml-2">{user.name}</span>
          </div>
          <div className="mb-2 font-semibold">
            Email: <span className="font-normal ml-2">{user.email}</span>
          </div>
          <div className="mb-2 font-semibold">
            Role:{" "}
            <span className="font-normal ml-2">{user.role.toUpperCase()}</span>
          </div>

          {isStudent && (
            <>
              <div className="mb-2 font-semibold">
                Experience Level:{" "}
                <span className="font-normal ml-2">{user.experienceLevel}</span>
              </div>
              <div className="mb-2 font-semibold">
                Skills:{" "}
                <span className="font-normal ml-2">
                  {user.skills?.join(", ") || "None"}
                </span>
              </div>
              <div className="mb-2 font-semibold">
                Interests:{" "}
                <span className="font-normal ml-2">
                  {user.interests?.join(", ") || "None"}
                </span>
              </div>
            </>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-3">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={(e) =>
                      setProfilePhoto(e.target.files?.[0] || "")
                    }
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>

                {isStudent && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Skills</Label>
                      <Input
                        value={skills.join(", ")}
                        onChange={(e) =>
                          setSkills(
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Interests</Label>
                      <Input
                        value={interests.join(", ")}
                        onChange={(e) =>
                          setInterests(
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Experience</Label>
                      <select
                        className="border p-2 rounded col-span-3"
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enrolled Courses */}
      {isStudent && (
        <div className="mt-10">
          <h2 className="font-semibold text-xl mb-4">
            Courses You're Enrolled In
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.enrolledCourses?.length === 0 ? (
              <p>You haven't enrolled yet</p>
            ) : (
              user.enrolledCourses.map((course) => (
                <Course course={course} key={course._id} />
              ))
            )}
          </div>
        </div>
      )}

      {/* Recommended Courses */}
      {isStudent && (
        <div className="mt-10">
          <h2 className="font-semibold text-xl mb-4">What to learn next based on your skills</h2>
          {recommendationLoading ? (
            <p>Loading recommended courses...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendedCourses.length > 0 ? (
                recommendedCourses.map((course) => (
                  <Course course={course} key={course._id} />
                ))
              ) : (
                <p>No recommendations yet. Try adding skills & interests.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
