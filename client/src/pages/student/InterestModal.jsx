
// // InterestModal.jsx
// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useUpdateUserMutation } from "@/features/api/authApi";

// const InterestModal = ({ user, refetch }) => {
//   // No internal open state; parent controls rendering

//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");
//   const [updateUser, { isLoading }] = useUpdateUserMutation();

//   useEffect(() => {
//     // Prefill from user if available
//     if (user) {
//       if (user.skills) setSkills(user.skills);
//       if (user.interests) setInterests(user.interests);
//       if (user.experienceLevel) setExperienceLevel(user.experienceLevel);
//     }
//   }, [user]);

//   const handleSubmit = async () => {
//     if (skills.length === 0) {
//       toast.error("Please enter at least one skill.");
//       return;
//     }
//     if (interests.length === 0) {
//       toast.error("Please enter at least one interest.");
//       return;
//     }
//     if (!experienceLevel) {
//       toast.error("Please select experience level.");
//       return;
//     }

//     const payload = {
//       skills,
//       interests,
//       experienceLevel,
//     };

//     const formData = new FormData();
//     Object.entries(payload).forEach(([key, value]) => {
//       if (Array.isArray(value)) {
//         value.forEach((v) => formData.append(`${key}[]`, v));
//       } else {
//         formData.append(key, value);
//       }
//     });

//     try {
//       await updateUser(formData).unwrap();
//       toast.success("Profile updated successfully!");
//       refetch(); // Notify parent to close modal and navigate
//     } catch (err) {
//       toast.error("Failed to update profile");
//     }
//   };

//   return (
//     <Dialog open={true} onOpenChange={() => {}}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Tell us about yourself</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-3">
//           <Input
//             placeholder="Skills (comma separated)"
//             value={skills.join(", ")}
//             onChange={(e) =>
//               setSkills(e.target.value.split(",").map((s) => s.trim()))
//             }
//           />
//           <Input
//             placeholder="Interests (comma separated)"
//             value={interests.join(", ")}
//             onChange={(e) =>
//               setInterests(e.target.value.split(",").map((s) => s.trim()))
//             }
//           />
//           <select
//             className="w-full border rounded p-2"
//             value={experienceLevel}
//             onChange={(e) => setExperienceLevel(e.target.value)}
//           >
//             <option value="beginner">Beginner</option>
//             <option value="intermediate">Intermediate</option>
//             <option value="advanced">Advanced</option>
//           </select>
//         </div>
//         <div className="pt-4">
//           <Button disabled={isLoading} onClick={handleSubmit}>
//             {isLoading ? "Saving..." : "Save and Continue"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default InterestModal;



// InterestModal.jsx
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/features/api/authApi";
import { useNavigate } from "react-router-dom";

const InterestModal = ({ user }) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setSkills(user.skills || []);
      setInterests(user.interests || []);
      setExperienceLevel(user.experienceLevel || "beginner");
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!skills.length || !interests.length || !experienceLevel) {
      toast.error("Please complete all fields");
      return;
    }

    const formData = new FormData();
    skills.forEach((s) => formData.append("skills[]", s));
    interests.forEach((i) => formData.append("interests[]", i));
    formData.append("experienceLevel", experienceLevel);

    try {
      await updateUser(formData).unwrap();
      toast.success("Profile updated successfully!");
      navigate("/dashboard"); // ✅ Redirect after update
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tell us about yourself</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Skills (comma separated)"
            value={skills.join(", ")}
            onChange={(e) =>
              setSkills(e.target.value.split(",").map((s) => s.trim()))
            }
          />
          <Input
            placeholder="Interests (comma separated)"
            value={interests.join(", ")}
            onChange={(e) =>
              setInterests(e.target.value.split(",").map((s) => s.trim()))
            }
          />
          <select
            className="w-full border rounded p-2"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="pt-4">
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? "Saving..." : "Save and Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterestModal;
