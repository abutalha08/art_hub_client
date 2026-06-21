'use client';
import React from 'react';
import { useSession } from "@/lib/auth-client";
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { FiImage, FiEye, FiDollarSign, FiHeart } from 'react-icons/fi';

const ArtistDashboardHomePage = () => {
    const { data: session, isPending } = useSession();

    // Loading State
    if (isPending) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#0A0A0F]">
                <div className="w-8 h-8 border-4 border-[#D946EF] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const user = session?.user;

    // একজন আর্টিস্টের ড্যাশবোর্ডের জন্য রিয়েল স্ট্যাটাস ডাটা স্ট্রাকচার
    const artistStats = [
        { title: "Total Artworks", value: "24", icon: FiImage },
        { title: "Total Artwork Views", value: "3,412", icon: FiEye },
        { title: "Total Sales", value: "$1,250", icon: FiDollarSign },
        { title: "Total Favorites", value: "482", icon: FiHeart },
    ];

    return (
        <div className="space-y-8 p-4 sm:p-6 lg:p-10 text-white min-h-screen bg-[#0A0A0F]">
            
            {/* Welcome Header Section */}
            <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide leading-tight">
                    Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] font-sans font-bold">{user?.name || "Creative Artist"}</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                    Manage your premium digital art studio, analyze showcase metrics, and track your global masterpieces.
                </p>
            </div>

            {/* Stats Cards Section */}
            <div className="pt-2">
                <DashboardStats statsData={artistStats} />
            </div>

            {/* এখানে পরবর্তীতে আপনি চাইলে Recent Uploads বা Sales Graph অ্যাড করতে পারেন */}
        </div>
    );
};

export default ArtistDashboardHomePage;