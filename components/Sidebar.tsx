"use client";

import sidebar from "@/utils/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SidebarSubmenu from "./SidebarSubmenu"
import { HiChevronLeft } from "react-icons/hi2";
import { useState } from "react";
import { motion } from "framer-motion";

const Sidebar = ({ isMobileSidebarOpen }: { isMobileSidebarOpen: boolean }) => {
    const location = usePathname();

    const [menuOpen, setMenuOpen] = useState(true);

    return (
        <motion.aside
            initial={{ width: 0 }}
            animate={{
                width: isMobileSidebarOpen ? '300px' : menuOpen ? '350px' : '50px',
            }}
            className={`bg-[#4e73df] pb-10`}
        >
            <div className="flex relative items-center h-16">
                <Link href="/dashboard" className={`text-white font-bold tracking-[2px] text-lg px-5
                w-full ${!menuOpen && 'hidden'}`}
                >
                    Yoso Mekatama
                </Link>
                <HiChevronLeft
                    color="white"
                    size={26}
                    strokeWidth={1.1}
                    cursor="pointer"
                    className={`${!menuOpen && 'rotate-180'} absolute right-0 top-1/2 -translate-y-1/2 
                    duration-200 border-white rounded-full border-2`}
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </div>
            {sidebar.map((item, index) => (
                <>
                    <div key={index} className="py-3 px-5">
                        {item.submenu ? (
                            <SidebarSubmenu
                                name={item.name}
                                icon={item.icon}
                                path={item.path}
                                submenu={item.submenu}
                                menuOpen={menuOpen}
                            />
                        ) : (
                            <Link href={item.path} className={`flex items-center gap-4 hover:text-white
                        ${location === item.path ? 'text-white font-semibold' : 'text-slate-300'}`}>
                                <span className="py-1">{item.icon}</span>
                                <span className={`${!menuOpen && 'hidden'}`}>{item.name}</span>
                            </Link>
                        )}
                    </div>
                    {index === 0 || index === 7 || index === 11 ? (
                        <hr className="my-2 h-px border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                    ) : ('')}
                </>
            ))}
        </motion.aside >
    );
};

export default Sidebar;