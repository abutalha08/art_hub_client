

import { IoColorPaletteSharp } from "react-icons/io5";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7928CA] via-[#B342F2] to-[#F242C2] flex items-center justify-center shadow-lg shadow-[#7928CA]/20 group-hover:scale-105 transition-transform duration-300">
        <IoColorPaletteSharp className="text-white text-xl" />
      </div>

      {/* Text */}
      <div className="leading-tight">
        <h1 className="text-xl font-bold text-white tracking-wide">
          Art<span className="text-[#B342F2]">Hub</span>
        </h1>
        <p className="text-[10px] text-[#8E8E9F] uppercase tracking-widest">
          Digital Art Marketplace
        </p>
      </div>

    </Link>
  );
}