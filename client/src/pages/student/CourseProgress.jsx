// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import {
//   useCompleteCourseMutation,
//   useGetCourseProgressQuery,
//   useInCompleteCourseMutation,
//   useUpdateLectureProgressMutation,
// } from "@/features/api/courseProgressApi";
// import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";

// const CourseProgress = () => {
//   const params = useParams();
//   const courseId = params.courseId;
//   const { data, isLoading, isError, refetch } =
//     useGetCourseProgressQuery(courseId);

//   const [updateLectureProgress] = useUpdateLectureProgressMutation();
//   const [
//     completeCourse,
//     { data: markCompleteData, isSuccess: completedSuccess },
//   ] = useCompleteCourseMutation();
//   const [
//     inCompleteCourse,
//     { data: markInCompleteData, isSuccess: inCompletedSuccess },
//   ] = useInCompleteCourseMutation();

//   useEffect(() => {
//     console.log(markCompleteData);

//     if (completedSuccess) {
//       refetch();
//       toast.success(markCompleteData.message);
//     }
//     if (inCompletedSuccess) {
//       refetch();
//       toast.success(markInCompleteData.message);
//     }
//   }, [completedSuccess, inCompletedSuccess]);

//   const [currentLecture, setCurrentLecture] = useState(null);

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Failed to load course details</p>;

//   console.log(data);

//   const { courseDetails, progress, completed } = data.data;
//   const { courseTitle } = courseDetails;

//   // initialze the first lecture is not exist
//   const initialLecture =
//     currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

//   const isLectureCompleted = (lectureId) => {
//     return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
//   };

//   const handleLectureProgress = async (lectureId) => {
//     await updateLectureProgress({ courseId, lectureId });
//     refetch();
//   };
//   // Handle select a specific lecture to watch
//   const handleSelectLecture = (lecture) => {
//     setCurrentLecture(lecture);
//     handleLectureProgress(lecture._id);
//   };

//   const handleCompleteCourse = async () => {
//     await completeCourse(courseId);
//   };
//   const handleInCompleteCourse = async () => {
//     await inCompleteCourse(courseId);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       {/* Display course name  */}
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">{courseTitle}</h1>
//         <Button
//           onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
//           variant={completed ? "outline" : "default"}
//         >
//           {completed ? (
//             <div className="flex items-center">
//               <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
//             </div>
//           ) : (
//             "Mark as completed"
//           )}
//         </Button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Video section  */}
//         <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
//           <div>
//             <video
//               src={currentLecture?.videoUrl || initialLecture.videoUrl}
//               controls
//               className="w-full h-auto md:rounded-lg"
//               onPlay={() =>
//                 handleLectureProgress(currentLecture?._id || initialLecture._id)
//               }
//             />
//           </div>
//           {/* Display current watching lecture title */}
//           <div className="mt-2 ">
//             <h3 className="font-medium text-lg">
//               {`Lecture ${
//                 courseDetails.lectures.findIndex(
//                   (lec) =>
//                     lec._id === (currentLecture?._id || initialLecture._id)
//                 ) + 1
//               } : ${
//                 currentLecture?.lectureTitle || initialLecture.lectureTitle
//               }`}
//             </h3>
//           </div>
//         </div>
//         {/* Lecture Sidebar  */}
//         <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
//           <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
//           <div className="flex-1 overflow-y-auto">
//             {courseDetails?.lectures.map((lecture) => (
//               <Card
//                 key={lecture._id}
//                 className={`mb-3 hover:cursor-pointer transition transform ${
//                   lecture._id === currentLecture?._id
//                     ? "bg-gray-200 dark:dark:bg-gray-800"
//                     : ""
//                 } `}
//                 onClick={() => handleSelectLecture(lecture)}
//               >
//                 <CardContent className="flex items-center justify-between p-4">
//                   <div className="flex items-center">
//                     {isLectureCompleted(lecture._id) ? (
//                       <CheckCircle2 size={24} className="text-green-500 mr-2" />
//                     ) : (
//                       <CirclePlay size={24} className="text-gray-500 mr-2" />
//                     )}
//                     <div>
//                       <CardTitle className="text-lg font-medium">
//                         {lecture.lectureTitle}
//                       </CardTitle>
//                     </div>
//                   </div>
//                   {isLectureCompleted(lecture._id) && (
//                     <Badge
//                       variant={"outline"}
//                       className="bg-green-200 text-green-600"
//                     >
//                       Completed
//                     </Badge>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseProgress;

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import {
//   useCompleteCourseMutation,
//   useGetCourseProgressQuery,
//   useInCompleteCourseMutation,
//   useUpdateLectureProgressMutation,
// } from "@/features/api/courseProgressApi";
// import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";

// const CourseProgress = () => {
//   const { courseId } = useParams();

//   const { data, isLoading, isError, refetch } =
//     useGetCourseProgressQuery(courseId);

//   const [updateLectureProgress] = useUpdateLectureProgressMutation();
//   const [
//     completeCourse,
//     { data: markCompleteData, isSuccess: completedSuccess },
//   ] = useCompleteCourseMutation();
//   const [
//     inCompleteCourse,
//     { data: markInCompleteData, isSuccess: inCompletedSuccess },
//   ] = useInCompleteCourseMutation();

//   const [currentLecture, setCurrentLecture] = useState(null);

//   useEffect(() => {
//     if (completedSuccess) {
//       refetch();
//       toast.success(markCompleteData?.message);
//     }
//     if (inCompletedSuccess) {
//       refetch();
//       toast.success(markInCompleteData?.message);
//     }
//   }, [completedSuccess, inCompletedSuccess]);

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Failed to load course details</p>;

//   const { courseDetails, progress, completed } = data.data;

//   const initialLecture =
//     currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

//   // ✔ Check if lecture completed
//   const isLectureCompleted = (lectureId) => {
//     return progress.some((p) => p.lectureId === lectureId && p.viewed);
//   };

//   // ✔ Mark lecture as viewed
//   const handleLectureProgress = async (lectureId) => {
//     await updateLectureProgress({ courseId, lectureId });
//     refetch();
//   };

//   // ✔ Select a lecture
//   const handleSelectLecture = (lecture) => {
//     setCurrentLecture(lecture);
//     handleLectureProgress(lecture._id);
//   };

//   // ✔ Mark course completed or incomplete
//   const handleCompleteCourse = async () => {
//     await completeCourse(courseId);
//   };
//   const handleInCompleteCourse = async () => {
//     await inCompleteCourse(courseId);
//   };

//   // -------------- CALCULATE PROGRESS --------------
//   const totalLectures = courseDetails.lectures.length;
//   const completedLectures = progress.filter((p) => p.viewed).length;
//   const coursePercent = Math.round((completedLectures / totalLectures) * 100);

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       {/* ---------- HEADER ---------- */}
//       <div className="flex justify-between mb-4">
//         <div>
//           <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>

//           {/* 👉 Progress Bar */}
//           <div className="mt-2 w-full">
//             <p className="font-medium text-sm mb-1">
//               Progress: {completedLectures}/{totalLectures} lectures (
//               {coursePercent}%)
//             </p>

//             <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//               <div
//                 className="h-3 bg-green-500 rounded-full transition-all"
//                 style={{ width: `${coursePercent}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         <Button
//           onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
//           variant={completed ? "outline" : "default"}
//         >
//           {completed ? (
//             <div className="flex items-center">
//               <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
//             </div>
//           ) : (
//             "Mark as completed"
//           )}
//         </Button>
//       </div>

//       {/* ---------- MAIN CONTENT ---------- */}
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* ---------- VIDEO SECTION ---------- */}
//         <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
//           <video
//             src={currentLecture?.videoUrl || initialLecture.videoUrl}
//             controls
//             className="w-full h-auto md:rounded-lg"
//             onPlay={() =>
//               handleLectureProgress(currentLecture?._id || initialLecture._id)
//             }
//           />

//           {/* Lecture Title */}
//           <div className="mt-2">
//             <h3 className="font-medium text-lg">
//               {`Lecture ${
//                 courseDetails.lectures.findIndex(
//                   (lec) =>
//                     lec._id === (currentLecture?._id || initialLecture._id)
//                 ) + 1
//               }: ${
//                 currentLecture?.lectureTitle || initialLecture.lectureTitle
//               }`}
//             </h3>
//           </div>
//         </div>

//         {/* ---------- LECTURE SIDEBAR ---------- */}
//         <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
//           <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>

//           <div className="flex-1 overflow-y-auto">
//             {courseDetails.lectures.map((lecture) => (
//               <Card
//                 key={lecture._id}
//                 className={`mb-3 cursor-pointer transition ${
//                   lecture._id === currentLecture?._id
//                     ? "bg-gray-200 dark:bg-gray-800"
//                     : ""
//                 }`}
//                 onClick={() => handleSelectLecture(lecture)}
//               >
//                 <CardContent className="flex items-center justify-between p-4">
//                   <div className="flex items-center">
//                     {isLectureCompleted(lecture._id) ? (
//                       <CheckCircle2 size={24} className="text-green-500 mr-2" />
//                     ) : (
//                       <CirclePlay size={24} className="text-gray-500 mr-2" />
//                     )}
//                     <CardTitle className="text-lg font-medium">
//                       {lecture.lectureTitle}
//                     </CardTitle>
//                   </div>

//                   {isLectureCompleted(lecture._id) && (
//                     <Badge
//                       variant="outline"
//                       className="bg-green-200 text-green-600"
//                     >
//                       Completed
//                     </Badge>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseProgress;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();

  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  // 🔄 Refresh on course complete
  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData?.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData?.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  // 👉 Check if a lecture is completed
  const isLectureCompleted = (lectureId) => {
    return progress.some((p) => p.lectureId === lectureId && p.viewed);
  };

  // 👉 Manually mark lecture as completed
  const handleMarkLectureComplete = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
    toast.success("Lecture marked as completed!");
  };

  // 👉 Selecting a lecture DOES NOT update progress now
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  };

  // 👉 Mark course completed
  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  // ------ CALCULATE PROGRESS -------
  const totalLectures = courseDetails.lectures.length;
  const completedLectures = progress.filter((p) => p.viewed).length;
  const coursePercent = Math.round((completedLectures / totalLectures) * 100);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>

          {/* Progress Bar */}
          <div className="mt-2 w-full">
            <p className="font-medium text-sm mb-1">
              Progress: {completedLectures}/{totalLectures} lectures (
              {coursePercent}%)
            </p>

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-green-500 rounded-full transition-all"
                style={{ width: `${coursePercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Mark course completed - disabled until all lectures completed */}
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          disabled={!completed && completedLectures !== totalLectures}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
            </div>
          ) : (
            "Mark Course as Completed"
          )}
        </Button>
      </div>

      {/* 👉 Mark All Lectures Completed */}
      <div className="mb-5">
        <Button
          variant="secondary"
          onClick={async () => {
            for (const lecture of courseDetails.lectures) {
              if (!isLectureCompleted(lecture._id)) {
                await updateLectureProgress({
                  courseId,
                  lectureId: lecture._id,
                });
              }
            }
            refetch();
            toast.success("All lectures marked as completed!");
          }}
        >
          Mark All Lectures Completed
        </Button>
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* ---------- VIDEO SECTION ---------- */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <video
            src={currentLecture?.videoUrl || initialLecture.videoUrl}
            controls
            className="w-full h-auto md:rounded-lg"
          />

          {/* Lecture Title */}
          <div className="mt-2 flex justify-between items-center">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              }: ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>

            {/* Manual complete lecture button */}
            <Button
              onClick={() =>
                handleMarkLectureComplete(
                  currentLecture?._id || initialLecture._id
                )
              }
              disabled={isLectureCompleted(
                currentLecture?._id || initialLecture._id
              )}
            >
              {isLectureCompleted(currentLecture?._id || initialLecture._id) ? (
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" /> Completed
                </span>
              ) : (
                "Mark Lecture Completed"
              )}
            </Button>
          </div>
        </div>

        {/* ---------- LECTURE SIDEBAR ---------- */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>

          <div className="flex-1 overflow-y-auto">
            {courseDetails.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 cursor-pointer transition ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:bg-gray-800"
                    : ""
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}

                    <CardTitle className="text-lg font-medium">
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>

                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
