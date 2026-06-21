"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiGrid, FiUser, FiLogOut } from "react-icons/fi";
import { IoColorPaletteSharp } from "react-icons/io5";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Artworks", href: "/artworks" },
];

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");

    try {
      await authClient.signOut();

      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Logout failed:", error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#27273A]/60 bg-[#0C0C14]/90 backdrop-blur-xl py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7928CA] to-[#B342F2] flex items-center justify-center shadow-md shadow-[#7928CA]/20">
            <IoColorPaletteSharp className="text-white text-xl" />
          </div>
          <span className="text-2xl font-serif font-bold text-white tracking-wide">
            Art<span className="text-[#B342F2]">Hub</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden lg:flex items-center gap-2 bg-[#0C0C14] p-1 rounded-xl">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition duration-200 ${
                  active
                    ? "text-white bg-[#201633] border border-[#432371]/60"
                    : "text-[#8E8E9F] hover:text-white border border-transparent"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          {/* Dashboard only when logged in */}
          {user && (
            <Link
              href= {`/dashboard/${session?.user?.role}`}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition duration-200 ${
                pathname.startsWith("/dashboard")
                  ? "text-white bg-[#201633] border border-[#432371]/60"
                  : "text-[#8E8E9F] hover:text-white border border-transparent"
              }`}
            >
              <span className="relative z-10">Dashboard</span>
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-5">
          {!user ? (
            <>
              <Link href="/auth/login">
                <button className="text-sm font-medium text-[#8E8E9F] hover:text-white transition cursor-pointer">
                  Login
                </button>
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white text-sm font-semibold shadow-lg shadow-[#B342F2]/10 hover:shadow-[#B342F2]/20 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center focus:outline-none transition transform hover:scale-105 active:scale-95"
              >
                <div className="relative w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-[#7928CA] to-[#B342F2]">
                  <Image
                    src={
                      session?.user?.image ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                    }
                    alt="avatar"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover rounded-full bg-[#12121C]"
                  />
                </div>
              </button>

              {/* DROPDOWN */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-[#12121C] border border-[#27273A] rounded-xl shadow-2xl p-1.5 text-sm z-50 text-slate-200">
                  <div className="px-3 py-2.5 border-b border-[#27273A]/60 mb-1">
                    <p className="text-[10px] font-bold text-[#B342F2] uppercase tracking-wider">
                      {session?.user?.role || "User"}
                    </p>
                    <p className="text-white font-bold truncate mt-0.5">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-[#8E8E9F] truncate">
                      {session?.user?.email}
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/${session?.user?.role}`}
                    className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#161622] text-[#8E8E9F] hover:text-white rounded-lg transition"
                  >
                    <FiGrid className="text-sm" /> Dashboard
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#161622] text-[#8E8E9F] hover:text-white rounded-lg transition"
                  >
                    <FiUser className="text-sm" /> Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[#F242C2] hover:bg-[#F242C2]/10 rounded-lg transition text-left font-medium mt-1 border-t border-[#27273A]/30"
                  >
                    <FiLogOut className="text-sm" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden w-10 h-10 rounded-xl bg-[#12121C] border border-[#27273A]/60 flex items-center justify-center text-white text-xl transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden px-2 pt-3 pb-4 flex flex-col gap-1.5 border-t border-[#27273A]/60 bg-[#0C0C14] overflow-hidden">
          {/* USER INFO */}
          {user && (
            <div className="flex items-start gap-3 px-4 py-3 mb-2 bg-[#12121C] border border-[#27273A]/50 rounded-xl">
              <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#7928CA] to-[#B342F2] flex-shrink-0 mt-0.5">
                <Image
                  src={
                    session?.user?.image ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                  }
                  alt="avatar"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover rounded-full bg-[#12121C]"
                />
              </div>
              <div className="truncate flex-1">
                <p className="text-[9px] font-bold text-[#B342F2] uppercase tracking-wider leading-none">
                  {session?.user?.role || "User"}
                </p>
                <p className="text-sm font-bold text-white truncate mt-1">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-[#8E8E9F] truncate mt-0.5">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          )}

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-[#201633] text-white border border-[#432371]/60"
                  : "text-[#8E8E9F] hover:text-white hover:bg-[#12121C]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/*  Dashboard only when logged in */}
          {user && (
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                pathname.startsWith("/dashboard")
                  ? "bg-[#201633] text-white border border-[#432371]/60"
                  : "text-[#8E8E9F] hover:text-white hover:bg-[#12121C]"
              }`}
            >
              Dashboard
            </Link>
          )}

          <div className="mt-1 pt-3 border-t border-[#27273A]/60 flex flex-col gap-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-3 rounded-xl text-sm font-medium text-[#F242C2] hover:bg-[#F242C2]/10 transition text-left flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-2">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-[#12121C] border border-[#27273A]/60 hover:bg-[#161622] transition">
                    Login
                  </button>
                </Link>

                <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#7928CA] to-[#B342F2] shadow-md">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}