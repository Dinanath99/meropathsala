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
//     {
//       isLoading: updateUserIsLoading,
//       isError,
//       error,
//       isSuccess,
//     },
//   ] = useUpdateUserMutation();

//   const updateUserHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     if (profilePhoto) formData.append("profilePhoto", profilePhoto);
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
//       setIsDialogOpen(false);
//       refetchUser();
//       refetchRecommended();
//     }
//     if (isError) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   }, [isSuccess, isError]);

//   if (isLoading) return <h1>Loading profile...</h1>;

//   const user = data?.user;
//   const isStudent = user?.role === "student";

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
//             Role:{" "}
//             <span className="font-normal ml-2">{user.role.toUpperCase()}</span>
//           </div>

//           {isStudent && (
//             <>
//               <div className="mb-2 font-semibold">
//                 Experience Level:{" "}
//                 <span className="font-normal ml-2">{user.experienceLevel}</span>
//               </div>
//               <div className="mb-2 font-semibold">
//                 Skills:{" "}
//                 <span className="font-normal ml-2">
//                   {user.skills?.join(", ") || "None"}
//                 </span>
//               </div>
//               <div className="mb-2 font-semibold">
//                 Interests:{" "}
//                 <span className="font-normal ml-2">
//                   {user.interests?.join(", ") || "None"}
//                 </span>
//               </div>
//             </>
//           )}

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
//                     onChange={(e) =>
//                       setProfilePhoto(e.target.files?.[0] || "")
//                     }
//                     type="file"
//                     accept="image/*"
//                     className="col-span-3"
//                   />
//                 </div>

//                 {isStudent && (
//                   <>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label>Skills</Label>
//                       <Input
//                         value={skills.join(", ")}
//                         onChange={(e) =>
//                           setSkills(
//                             e.target.value.split(",").map((s) => s.trim())
//                           )
//                         }
//                         className="col-span-3"
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label>Interests</Label>
//                       <Input
//                         value={interests.join(", ")}
//                         onChange={(e) =>
//                           setInterests(
//                             e.target.value.split(",").map((s) => s.trim())
//                           )
//                         }
//                         className="col-span-3"
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label>Experience</Label>
//                       <select
//                         className="border p-2 rounded col-span-3 bg-slate-600"
//                         value={experienceLevel}
//                         onChange={(e) => setExperienceLevel(e.target.value)}
//                       >
//                         <option value="beginner">Beginner</option>
//                         <option value="intermediate">Intermediate</option>
//                         <option value="advanced">Advanced</option>
//                       </select>
//                     </div>
//                   </>
//                 )}
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
//       {isStudent && (
//         <div className="mt-10">
//           <h2 className="font-semibold text-xl mb-4">
//             Courses You're Enrolled In
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {user.enrolledCourses?.length === 0 ? (
//               <p>You haven't enrolled yet</p>
//             ) : (
//               user.enrolledCourses.map((course) => (
//                 <Course course={course} key={course._id} />
//               ))
//             )}
//           </div>
//         </div>
//       )}

//       {/* Recommended Courses */}
//       {isStudent && (
//         <div className="mt-10">
//           <h2 className="font-semibold text-xl mb-4">What to learn next based on your skills and Interest</h2>
//           {recommendationLoading ? (
//             <p>Loading recommended courses...</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {recommendedCourses.length > 0 ? (
//                 recommendedCourses.map((course) => (
//                   <Course course={course} key={course._id} />
//                 ))
//               ) : (
//                 <p>No recommendations yet. Try adding skills & interests.</p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
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
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [preferredRoles, setPreferredRoles] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
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
    { isLoading: updateUserIsLoading, isError, error, isSuccess },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name || "");
      setSkills(data.user.skills || []);
      setInterests(data.user.interests || []);
      setExperienceLevel(data.user.experienceLevel || "beginner");
      setPreferredRoles(data.user.preferredRoles || []);
      setJobTitle(data.user.jobTitle || "");
      setEducationLevel(data.user.educationLevel || "");
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated.");
      setIsDialogOpen(false);
      refetchUser();
      refetchRecommended();
      setProfilePhoto(null);
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [isSuccess, isError, error, refetchUser, refetchRecommended]);

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    skills.forEach((skill) => formData.append("skills[]", skill));
    interests.forEach((interest) => formData.append("interests[]", interest));
    formData.append("experienceLevel", experienceLevel);
    preferredRoles.forEach((role) => formData.append("preferredRoles[]", role));
    formData.append("jobTitle", jobTitle);
    formData.append("educationLevel", educationLevel);

    await updateUser(formData);
  };

  if (isLoading)
    return (
      <h1 className="text-center py-20 text-xl font-semibold">
        Loading profile...
      </h1>
    );

  const user = data?.user;
  const isStudent = user?.role === "student";

  return (
    <div className="max-w-4xl mx-auto px-4 my-10 space-y-10">
      <h1 className="text-3xl font-bold text-center md:text-left">Profile</h1>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-6  rounded-lg shadow-md">
        <Avatar className="h-32 w-32 md:h-40 md:w-40 shadow-lg">
          <AvatarImage
            src={user.photoUrl || "https://github.com/shadcn.png"}
            alt={user.name || "User"}
            className="object-cover"
          />
          <AvatarFallback className="text-3xl font-extrabold">
            {user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "NA"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <h2 className="text-4xl font-bold">{user.name}</h2>
          <p className="text-lg text-gray-700">{user.email}</p>
          <p className="uppercase text-blue-600 font-semibold">{user.role}</p>
          {jobTitle && (
            <p>
              <span className="font-semibold">Job Title:</span> {jobTitle}
            </p>
          )}
          {educationLevel && (
            <p>
              <span className="font-semibold">Education Level:</span>{" "}
              {educationLevel}
            </p>
          )}
          {experienceLevel && (
            <p>
              <span className="font-semibold">Experience Level:</span>{" "}
              {experienceLevel}
            </p>
          )}
          <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Skills */}
        <section className="rounded-lg shadow p-5 text-white">
          <h3 className="font-semibold text-xl mb-3">Skills</h3>
          {skills.length ? (
            <ul className="list-disc list-inside text-white space-y-1">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No skills added.</p>
          )}
        </section>

        {/* Interests */}
        <section className="rounded-lg shadow p-5">
          <h3 className="font-semibold text-xl mb-3">Interests</h3>
          {interests.length ? (
            <ul className="list-disc list-inside text-white space-y-1">
              {interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No interests added.</p>
          )}
        </section>

        {/* Preferred Roles */}
        <section className="rounded-lg shadow p-5">
          <h3 className="font-semibold text-xl mb-3">Preferred Roles</h3>
          {preferredRoles.length ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {preferredRoles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No preferred roles selected.</p>
          )}
        </section>
      </div>

      {/* Enrolled Courses */}
      {isStudent && (
        <section>
          <h2 className="font-semibold text-2xl mb-5">Enrolled Courses</h2>
          {user.enrolledCourses?.length === 0 ? (
            <p className="italic text-gray-600">You haven't enrolled yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {user.enrolledCourses.map((course) => (
                <Course course={course} key={course._id} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Recommended Courses */}
      {isStudent && (
        <section>
          <h2 className="font-semibold text-2xl mb-5">
            What to learn next based on your skills and interests
          </h2>
          {recommendationLoading ? (
            <p>Loading recommended courses...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {recommendedCourses.length > 0 ? (
                recommendedCourses.map((course) => (
                  <Course course={course} key={course._id} />
                ))
              ) : (
                <p className="italic text-gray-600">
                  No recommendations yet. Try adding skills & interests.
                </p>
              )}
            </div>
          )}
        </section>
      )}

      {/* Edit Profile Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your details below.</DialogDescription>
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
                onChange={(e) => setProfilePhoto(e.target.files?.[0] || "")}
                type="file"
                accept="image/*"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Skills</Label>
              <Input
                value={skills.join(", ")}
                onChange={(e) =>
                  setSkills(e.target.value.split(",").map((s) => s.trim()))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Interests</Label>
              <Input
                value={interests.join(", ")}
                onChange={(e) =>
                  setInterests(e.target.value.split(",").map((s) => s.trim()))
                }
                className="col-span-3"
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label>Preferred Roles</Label>
              <Input
                value={preferredRoles.join(", ")}
                onChange={(e) =>
                  setPreferredRoles(e.target.value.split(",").map((s) => s.trim()))
                }
                className="col-span-3"
                placeholder="Comma separated roles"
              />
            </div> */}

            {/* Preffered Roles */}

            {/* Preferred Roles */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Preferred Roles</Label>
              <select
                multiple
                className="border p-2 rounded col-span-3 bg-slate-600 text-white"
                value={preferredRoles}
                onChange={(e) =>
                  setPreferredRoles(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Fullstack Developer">Fullstack Developer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Cybersecurity Specialist">
                  Cybersecurity Specialist
                </option>
                <option value="Machine Learning Engineer">
                  Machine Learning Engineer
                </option>
                <option value="Data Scientist">Data Scientist</option>
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Job Title</Label>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="col-span-3"
                placeholder="Job title"
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label>Education Level</Label>
              <Input
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="col-span-3"
                placeholder="Education level"
              />
            </div> */}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Education Level</Label>
              <select
                className="border p-2 rounded col-span-3 bg-slate-600 text-white"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value="">Select Education Level</option>
                <option value="Less than high school diploma">
                  Less than high school diploma
                </option>
                <option value="High school diploma">High school diploma</option>
                <option value="Some college">Some college</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's degree">Bachelor's degree</option>
                <option value="Master's degree">Master's degree</option>
                <option value="Professional school degree">
                  Professional school degree
                </option>
                <option value="Doctorate degree">Doctorate degree</option>
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Experience Level</Label>
              <select
                className="border p-2 rounded col-span-3 bg-slate-600"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
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
  );
};

export default Profile;
