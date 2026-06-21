

import React from 'react';
import { Input, Button } from '@heroui/react';
import { 
  SiInstagram, 
  SiX, 
  SiYoutube, 
  SiGithub 
} from 'react-icons/si';
import { IoColorPaletteSharp } from 'react-icons/io5';
import Link from "next/link";

export default function Footer() {
  const exploreLinks = [
    { label: 'Browse Artworks', href: '#' },
    { label: 'Featured Artists', href: '#' },
    { label: 'New Arrivals', href: '#' },
    { label: 'Paintings', href: '#' },
    { label: 'Digital Art', href: '#' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ];

  const socialLinks = [
    { Icon: SiInstagram, href: '#', label: 'Instagram' },
    { Icon: SiX, href: '#', label: 'Twitter' },
    { Icon: SiYoutube, href: '#', label: 'Youtube' },
    { Icon: SiGithub, href: '#', label: 'Github' },
  ];

  return (
    <footer className="w-full bg-[#0C0C14] text-[#A0A0AA] pt-16 pb-8 px-6 md:px-12 lg:px-24 border-t border-[#1F1F2E]/40 font-sans selection:bg-[#B342F2]/30">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-12 pb-16">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          {/* Fixed & Perfected Brand Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7928CA] to-[#B342F2] flex items-center justify-center shadow-lg shadow-[#7928CA]/20 shrink-0">
              <IoColorPaletteSharp className="text-white text-xl" />
            </div>
            <span className="text-2xl font-serif font-bold text-white tracking-wide">
              Art<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B342F2] to-[#F242C2]">Hub</span>
            </span>
          </div>
          
          <p className="text-sm leading-relaxed max-w-[260px] text-[#8E8E9F]">
            A platform where visionary artists connect with collectors who value originality. Every piece tells a story.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-2">
            {socialLinks.map(({ Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-[#161622] hover:bg-[#1E1E30] border border-[#27273A] flex items-center justify-center text-[#8E8E9F] hover:text-white transition-all duration-200"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        {/* Explore Links */}
        <div className="flex flex-col gap-4 sm:pl-4 lg:pl-0">
          <h4 className="text-white font-serif font-semibold text-lg tracking-wide">Explore</h4>
          <ul className="flex flex-col gap-3">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-[#8E8E9F] hover:text-white transition-colors duration-200 block w-fit"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-serif font-semibold text-lg tracking-wide">Company</h4>
          <ul className="flex flex-col gap-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-[#8E8E9F] hover:text-white transition-colors duration-200 block w-fit"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-serif font-semibold text-lg tracking-wide">Stay in the Loop</h4>
          <p className="text-sm leading-relaxed text-[#8E8E9F]">
            New artworks, featured artists, and collector insights — delivered weekly.
          </p>
          <div className="flex flex-col gap-3 mt-1 max-w-sm">
            <Input
              type="email"
              placeholder="your@email.com"
              variant="bordered"
              radius="lg"
              classNames={{
                inputWrapper: [
                  "bg-[#161622]",
                  "border-[#27273A]",
                  "hover:border-[#3A3A54]",
                  "focus-within:!border-[#B342F2]",
                  "h-12",
                  "transition-all"
                ],
                input: "text-white placeholder:text-[#52526B] text-sm",
              }}
            />
            <Button
              type="submit"
              radius="lg"
              className="h-12 font-medium text-white shadow-lg bg-gradient-to-r from-[#8E32D9] via-[#B342F2] to-[#E032C4] hover:opacity-95 transition-opacity"
            >
              Subscribe
            </Button>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#1F1F2E]/60 max-w-7xl mx-auto" />

      {/* Bottom Sub-footer Section */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#52526B]">
        <p> &copy; {new Date().getFullYear()} ArtHub. All rights reserved.</p>
        <p className="tracking-wide">Supporting artists worldwide since 2023</p>
      </div>
    </footer>
  );
}