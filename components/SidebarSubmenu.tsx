"use client";

import { SidebarItemProps } from "@/types"
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

interface SubMenuProps extends SidebarItemProps {
  menuOpen: boolean
}

const SidebarSubmenu = ({ icon, name, path, submenu, menuOpen }: SubMenuProps) => {
  const location = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <div className={`flex items-center hover:text-white cursor-pointer text-slate-300
        justify-between`}
          onClick={() => setSubMenuOpen(!subMenuOpen)}>
          <div className="flex gap-3 items-center">
            <span className="py-1">{icon}</span>
            <span className={`${!menuOpen && 'hidden'}`}>{name}</span>
          </div>
          <IoIosArrowDown
            className={`${subMenuOpen && "rotate-180"} duration-200`}
          />
        </div>
        <motion.ul
          animate={
            subMenuOpen
              ? {
                height: "fit-content",
                marginTop: menuOpen ? "8px" : ''
              }
              : {
                height: 0,
              }
          }
          className={`flex h-0 flex-col px-3 overflow-hidden rounded-lg z-10 bg-white
          ${!menuOpen && 'absolute top-0 shadow-md left-10'}`}
        >
          {submenu?.map((sub, index) => (
            <Link 
            key={index}
            href={sub.path}
            className={`flex items-center gap-3 py-1 px-2 hover:bg-slate-200 rounded-md my-2
            ${location === sub.path ? 'text-[#4e73df] font-semibold' : 'text-black'}`}>
              <span>{sub.icon}</span>
              <span>{sub.name}</span>
            </Link>
          ))}
        </motion.ul>
      </div>
    </>
  );
};

export default SidebarSubmenu