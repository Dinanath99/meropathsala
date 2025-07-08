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


import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const MainLayout = () => {
  const auth = useSelector((state) => state.auth || {}); // ✅ Prevent destructure crash
  const { user, isAuthenticated } = auth;

  const [openModal, setOpenModal] = useState(false);
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // ✅ Show modal only when authenticated and skills or interests are missing
  useEffect(() => {
    if (
      isAuthenticated &&
      user &&
      (!user.skills ||
        user.skills.length === 0 ||
        !user.interests ||
        user.interests.length === 0)
    ) {
      setOpenModal(true);
    }
  }, [user, isAuthenticated]);

  const handleSubmit = async () => {
    if (!skills.trim() || !interests.trim()) {
      toast.error("Please enter both skills and interests");
      return;
    }

    const formData = new FormData();
    formData.append("skills", skills);
    formData.append("interests", interests);

    try {
      const response = await updateUser(formData).unwrap();
      toast.success(response.message || "Preferences updated");
      setOpenModal(false);
      window.location.reload(); // Optional: force reload to update state
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update preferences");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 mt-16">
        <Outlet />
      </div>
      <Footer />

      {/* 🎯 Skills & Interests Modal */}
      <Dialog open={openModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tell us about your interests</DialogTitle>
            <DialogDescription>
              Please add your top skills and interests to get better course
              recommendations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label>Skills (comma separated)</Label>
              <Input
                placeholder="e.g. JavaScript, React, Node.js"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <Label>Interests (comma separated)</Label>
              <Input
                placeholder="e.g. Web Development, Backend, UI/UX"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainLayout;
