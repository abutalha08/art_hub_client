"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaUserCircle,
  FaPalette,
  FaHeart,
  FaShoppingCart,
  FaPlus,
  FaImage,
  FaUsers,
  FaUserShield,
  FaSignOutAlt,
  FaHome,
  FaBars,
} from "react-icons/fa";
import { Button, Drawer } from "@heroui/react";

import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import Logo from "../Logo";

const MENU_BY_ROLE = {
  user: [
    { key: "overview", label: "Overview", icon: FaUserCircle, href: "/dashboard/overview" },
    { key: "Purchase History", label: "Purchase History", icon: FaHeart, href: "/dashboard/purchase-history" },
    { key: "Bought Artworks", label: "Bought Artworks", icon: FaShoppingCart, href: "/dashboard/bought-artworks" },
    { key: "Profile Management", label: "Profile Management", icon: FaShoppingCart, href: "/dashboard/profile-management" },
  ],
  artist: [
    { key: "overview", label: "Overview", icon: FaPalette, href: "/dashboard/artist" },
    { key: "add-artworks", label: "Add Artwork", icon: FaPlus, href: "/dashboard/artist/add-artworks" },
    { key: "manage-artworks", label: "Manage Artworks", icon: FaImage, href: "/dashboard/artist/manage-artworks" },
    { key: "sales", label: "Sales History", icon: FaShoppingCart, href: "/dashboard/artist/sales" },
  ],
  admin: [
    { key: "users", label: "Manage Users", icon: FaUsers, href: "/dashboard/users" },
    { key: "artworks", label: "Approve Artworks", icon: FaImage, href: "/dashboard/artworks" },
    { key: "reports", label: "Reports & Analytics", icon: FaUserShield, href: "/dashboard/reports" },
  ],
};

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const pathname = usePathname();

  const menuItems = MENU_BY_ROLE[role] || MENU_BY_ROLE.user;

  const getPath = (key) => {
    if (role === "admin") return `/dashboard/admin/${key}`;
    if (key === "overview") return `/dashboard/${role}`;
    return `/dashboard/${role}/${key}`;
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#0B0B12] via-[#0C0C14] to-[#0A0A10] text-white">
      {/* LOGO AREA */}
      <div className="px-6 py-6 border-b border-[#27273A]/40 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
      </div>

      {/* PROFILE */}
      <div className="px-6 py-5 border-b border-[#27273A]/40 flex items-center gap-3 sm:gap-4">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#B342F2]/60 shadow-md shadow-[#B342F2]/20">
          <Image
            width={44}
            height={44}
            src={
              session?.user?.image ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            }
            alt="user"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col space-y-1 leading-tight">
          <p className="text-white text-sm font-bold tracking-wide">
            {session?.user?.name}
          </p>

          <p className="text-xs text-[#8E8E9F] uppercase tracking-widest">
            {role || "User"}
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-grow px-3 py-4 space-y-1">
        <p className="text-[10px] text-[#6B6B80] uppercase tracking-[3px] px-3 mb-3">
          Dashboard
        </p>

        {menuItems.map(({ key, label, icon: Icon, href }) => {
          const target = getPath(key);
          const active = pathname === target;

          return (
            <Link
              key={key}
              href={href}
              className={`group flex items-center gap-3 px-3 py-3 sm:py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-[#7928CA]/20 via-[#B342F2]/10 to-[#F242C2]/10 border border-[#B342F2]/30 text-white shadow-lg shadow-[#B342F2]/10"
                  : "text-[#8E8E9F] hover:text-white hover:bg-[#161622]/60"
              }`}
            >
              <span
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition ${
                  active
                    ? "bg-gradient-to-tr from-[#7928CA] to-[#B342F2] text-white shadow-md"
                    : "bg-[#12121C] text-[#8E8E9F] group-hover:text-white"
                }`}
              >
                <Icon size={16} />
              </span>

              <span className="tracking-wide">{label}</span>

              {active && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[#F242C2] shadow-md shadow-[#F242C2]/40" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM */}
      <div className="px-3 py-4 border-t border-[#27273A]/40 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm text-[#8E8E9F] hover:text-white hover:bg-[#161622]/60 transition"
        >
          <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#12121C]">
            <FaHome size={13} />
          </span>
          Back to ArtHub
        </Link>

        <button className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm text-[#F242C2] hover:bg-[#F242C2]/10 transition w-full text-left">
          <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#12121C]">
            <FaSignOutAlt size={13} />
          </span>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP */}
      <aside className="hidden md:block w-64 lg:w-72 xl:w-80 h-screen lg:sticky top-0 border-r border-[#27273A]/40 bg-[#0C0C14]">
        <SidebarContent />
      </aside>

      {/* MOBILE + TABLET HEADER */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#27273A]/40 bg-[#0C0C14]">
        <Logo />

        <Drawer>
          <Button className="bg-[#12121C] text-white border border-[#27273A]/40">
            <FaBars />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content className="w-64 bg-[#0C0C14] border-r border-[#27273A]/40">
              <SidebarContent />
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
