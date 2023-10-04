"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";

const ProfilePage = () => {
    const { data: session, status, update } = useSession();

    const [user, setUser] = useState(session?.user.name);

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        update({ name: user });
    }

    return (
        <div className="p-5">
            {status === 'loading' ? (
                <span className="loading loading-spinner text-[#4e73df]"></span>
            ) : (
                <div className="card card-compact shadow-xl">
                    <div className="card-body">
                        <div className="card-title bg-slate-100 p-2 rounded-lg">
                            {session?.user.name} | {session?.user.role}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex flex-col gap-3 flex-grow">
                                <p>Latest update:</p>
                                <p>Registration date:</p>
                                <p>Ip address: </p>
                            </div>
                            <form onSubmit={onSubmitHandler} className="flex-grow">
                                <p>
                                    Status
                                    <span className="ml-3 badge badge-success">{session?.user.status}</span>
                                </p>
                                <div className="form-control my-3">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Ketik nama disini . . ."
                                        value={user || ""}
                                        onChange={(e) => setUser(e.target.value)}
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control mb-5">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        disabled
                                        placeholder="Ketik email disini . . ."
                                        value={session?.user.email || ""}
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="flex gap-3 w-full">
                                    <button type="submit" className="btn btn-success">Simpan</button>
                                    <Link
                                        href="/profile/password"
                                        className="btn btn-info btn-outline"
                                    >
                                        Ubah Password
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage;