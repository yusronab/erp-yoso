"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { MdPerson, MdExitToApp } from "react-icons/md";

const Heading = () => {
    const { data, status } = useSession();

    return (
        <header className="bg-[#4e73df] flex justify-end">
            <details className="dropdown dropdown-end">
                <summary className="btn my-3 btn-ghost after:bg-white text-white relative
                hover:bg-transparent flex-col text-xs items-start rounded-none after:w-[2px] 
                after:absolute after:left-0 after:h-full ">
                    {status === 'loading' ? (
                        <span className="loading loading-spinner text-white"></span>
                    ) : (
                        <>
                            <span>{data?.user?.name}</span>
                            <span>{data?.user?.email?.toLocaleLowerCase()}</span>
                        </>
                    )}
                </summary>
                <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <Link href="/profile"><MdPerson /> Profile</Link>
                    </li>
                    <li>
                        <a onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>
                            <MdExitToApp />
                            Logout
                        </a>
                    </li>
                </ul>
            </details>
        </header>
    );
};

export default Heading;