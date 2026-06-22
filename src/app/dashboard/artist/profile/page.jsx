'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from "@heroui/react"; 
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; 
import { updateArtistProfile } from '@/lib/actions/artworks'; 
import { useSession } from '@/lib/auth-client'; 

export default function ArtistProfilePage() {
 
  const { data: session, isPending } = useSession(); 
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  
  useEffect(() => {

    if (!isPending && session?.user?.email) {
      const fetchCurrentProfile = async () => {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          const res = await fetch(`${baseUrl}/api/users/${session.user.email}`);
          const userData = await res.json();

          if (userData && !userData.error) {
            setName(userData.name || session.user.name || "");
            setEmail(userData.email || session.user.email || "");
          }
        } catch (error) {
          console.error("Failed to load active profile:", error);
         
          setName(session.user.name || "");
          setEmail(session.user.email || "");
        } finally {
          setPageLoading(false);
        }
      };

      fetchCurrentProfile();
    } else if (!isPending && !session) {

      setPageLoading(false);
    }
  }, [session, isPending]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const currentEmail = session?.user?.email;
    if (!currentEmail) {
      alert("You must be logged in to update your profile.");
      setLoading(false);
      return;
    }

    try {
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.newEmail = email;
      if (password) updateData.password = password;

      if (Object.keys(updateData).length === 0) {
        alert("Please change at least one field to update!");
        setLoading(false);
        return;
      }

      const response = await updateArtistProfile(currentEmail, updateData);
      
      if (response.success) {
        alert("Profile updated successfully!");
        setPassword("");
      } else {
        alert(response.error || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  
  if (isPending || pageLoading) {
    return <div className="text-white text-center p-10">Loading profile data...</div>;
  }

  
  if (!session) {
    return <div className="text-red-500 text-center p-10">Access Denied. Please log in first.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Artist Profile Settings</h1>
      
      <Card className="bg-[#18181b] border border-neutral-800 text-white shadow-xl">
        <div className="p-6">
          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* Name Input */}
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="bordered"
              labelPlacement="outside"
              startContent={<FiUser className="text-neutral-400" />}
              className="max-w-full text-white"
            />

            {/* Email Input */}
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="bordered"
              labelPlacement="outside"
              startContent={<FiMail className="text-neutral-400" />}
              className="max-w-full text-white"
            />

            {/* Password Input */}
            <Input
              label="Change Password"
              placeholder="Enter new password (leave blank to keep current)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="bordered"
              labelPlacement="outside"
              startContent={<FiLock className="text-neutral-400" />}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? <FiEyeOff className="text-neutral-400" /> : <FiEye className="text-neutral-400" />}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-full text-white"
            />

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                isLoading={loading}
                className="px-8 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-xl"
              >
                Save Changes
              </Button>
            </div>

          </form>
        </div>
      </Card>
    </div>
  );
}