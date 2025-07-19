

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
// import { useNavigate } from "react-router-dom";

// const InterestModal = ({ user }) => {
//   const navigate = useNavigate();
//   const [skills, setSkills] = useState([]);
//   const [interests, setInterests] = useState([]);
//   const [experienceLevel, setExperienceLevel] = useState("beginner");
//   const [updateUser, { isLoading }] = useUpdateUserMutation();

//   useEffect(() => {
//     if (user) {
//       setSkills(user.skills || []);
//       setInterests(user.interests || []);
//       setExperienceLevel(user.experienceLevel || "beginner");
//     }
//   }, [user]);

//   const handleSubmit = async () => {
//     if (!skills.length || !interests.length || !experienceLevel) {
//       toast.error("Please complete all fields");
//       return;
//     }

//     const formData = new FormData();
//     skills.forEach((s) => formData.append("skills[]", s));
//     interests.forEach((i) => formData.append("interests[]", i));
//     formData.append("experienceLevel", experienceLevel);

//     try {
//       await updateUser(formData).unwrap();
//       toast.success("Profile updated successfully!");
//       navigate("/dashboard"); // ✅ Redirect after update
//     } catch {
//       toast.error("Failed to update profile");
//     }
//   };

//   return (
//     <Dialog open={true}>
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

const rolesList = [
  "Data Scientist",
  "IT Project Manager",
  "Technology Consultant",
  "Machine Learning Engineer",
  "Business Intelligence Analyst",
  "Product Manager",
  "Business / Management Analyst",
  "Data Analyst",
  "Data Warehouse Developer",
  "Cyber Security Engineer",
  "Statistician",
  "Video Game Developer",
  "Data Architect",
  "Mainframe Developer",
  "Marketing Analytics Specialist",
  "Logistics / Supply Chain Analyst",
  "Project Manager",
  "Business Analyst (General)",
];

const educationLevels = [
  "Less than high school diploma (or equivalent)",
  "High school diploma (or equivalent)",
  "Some college, but no degree",
  "Associate Degree (e.g., AA, AS)",
  "Bachelor's degree (e.g., BA, AB, BS)",
  "Master's degree (e.g., MA, MS, MEng, MEd, MSW, MBA)",
  "Professional school degree (e.g., MD, DDS, DVM, LLB, JD)",
  "Doctorate degree (e.g., PhD, EdD)",
];

const InterestModal = ({ user, onClose }) => {
  const [step, setStep] = useState(1);

  // Step 1: Name
  const [name, setName] = useState("");

  // Step 2: Roles interested
  const [selectedRoles, setSelectedRoles] = useState([]);

  // Step 3: Skills (array)
  const [skills, setSkills] = useState([]);

  // Step 4: Job Title (string)
  const [jobTitle, setJobTitle] = useState("");

  // Step 5: Education level (string)
  const [educationLevel, setEducationLevel] = useState("");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // On mount or user change, populate form fields
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setSelectedRoles(user.roles || []);
      setSkills(user.skills || []);
      setJobTitle(user.jobTitle || "");
      setEducationLevel(user.educationLevel || "");
    }
  }, [user]);

  // Toggle role selection for step 2
  const toggleRole = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  // Validation to allow next step or save
  const canProceed = () => {
    switch (step) {
      case 1:
        return name.trim() !== "";
      case 2:
        return selectedRoles.length > 0;
      case 3:
        return skills.length > 0 && skills.every((s) => s.trim() !== "");
      case 4:
        return jobTitle.trim() !== "";
      case 5:
        return educationLevel.trim() !== "";
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error("Please complete the required fields to proceed.");
      return;
    }
    if (step < 5) setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  // Save all data on final step
  const handleSave = async () => {
    if (!canProceed()) {
      toast.error("Please complete the required fields to save.");
      return;
    }
    try {
      // Convert skills to array of trimmed strings if user typed a string by mistake
      const cleanedSkills =
        typeof skills === "string"
          ? skills.split(",").map((s) => s.trim())
          : skills.map((s) => s.trim());

      await updateUser({
        name,
        roles: selectedRoles,
        skills: cleanedSkills,
        jobTitle,
        educationLevel,
      }).unwrap();

      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? `Welcome, ${name || "Student"}!` : `Step ${step} of 5`}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div>
            <p>Let's start by confirming your full name:</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <p>Select the role(s) you are interested in:</p>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-auto">
              {rolesList.map((role) => (
                <button
                  key={role}
                  onClick={() => toggleRole(role)}
                  className={`border rounded px-3 py-2 text-left ${
                    selectedRoles.includes(role)
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p>Enter the skills you'd like to develop (comma separated):</p>
            <Input
              placeholder="e.g. JavaScript, React, Node.js"
              value={skills.join(", ")}
              onChange={(e) =>
                setSkills(e.target.value.split(",").map((s) => s.trim()))
              }
            />
          </div>
        )}

        {step === 4 && (
          <div>
            <p>What is your current job title?</p>
            <Input
              placeholder="Type your job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
        )}

        {step === 5 && (
          <div>
            <p>What's your highest level of education?</p>
            <select
              className="w-full border rounded p-2"
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
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <Button disabled={step === 1} onClick={handlePrev}>
            Prev
          </Button>

          {step < 5 ? (
            <Button disabled={!canProceed()} onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button disabled={isLoading || !canProceed()} onClick={handleSave}>
              {isLoading ? "Saving..." : "Save & Continue"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterestModal;
