"use client";

import Link from "next/link";
import axios from "axios";
import type { Role } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Toast from "./Toast";

const FormRegister = ({ roles }: { roles: Role[] }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isMatch, setIsMatch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [resMessage, setResMessage] = useState({
        error: false,
        message: ""
    });
    const [password, setPassword] = useState({
        current: "",
        confirm: "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/api/register', {
                name: username,
                roleId: Number(role),
                statusId: 1,
                email,
                password: password.confirm,
            })

            setResMessage({
                ...resMessage, 
                error: false, 
                message: `Registrasi berhasil, silahkan login dengan ${response.data.email}`
            });

        } catch (error: any) {
            setResMessage({...resMessage, error: true, message: error.response.data});
        }

        setRole("");
        setEmail("");
        setUsername("");
        setPassword({ ...password, confirm: "", current: "" })

        setIsLoading(false);
        setInterval(() => setResMessage({...resMessage, error: false, message: ""}), 5000)
    }

    const handlePasswordChange = (key: string, value: string) => {
        setPassword(prevPassword => ({
            ...prevPassword,
            [key]: value
        }));
    };

    useEffect(() => { setIsMatch(password.current === password.confirm) }, [password])

    return (
        <div>
            {resMessage.message && <Toast response={resMessage} />}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        autoComplete="off"
                        required
                        className="input input-primary w-full mt-1"
                    />
                </div>
                <div className="my-4">
                    <select
                        className="select select-primary w-full"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="" disabled>Pilih Role</option>
                        {roles.map((role, index) => (
                            <option key={index} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block">Contoh: example@gmail.com</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input input-primary w-full mt-1"
                        autoComplete="off"
                        required
                    />
                </div>
                <label className="block mt-4">*password minimal 8 karakter</label>
                <div className="relative mt-1">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password.current}
                        onChange={(e) => handlePasswordChange('current', e.target.value)}
                        placeholder="Password"
                        required
                        className={`input w-full input-primary`}
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute mr-3 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                    </div>
                </div>
                <div className="relative mt-4">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password.confirm}
                        onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                        placeholder="Ketik ulang password"
                        required
                        className={`input w-full ${isMatch ? 'input-primary' : 'input-error'}`}
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute mr-3 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                    </div>
                </div>
                <span className="text-red-600 text-sm">{!isMatch && 'Password tidak sama'}</span>
                <button
                    type="submit"
                    className="btn btn-primary w-full text-white my-4"
                    disabled={isLoading ? true : false}
                >
                    {isLoading ? (
                        <span className="loading loading-spinner text-white"></span>
                    ) : 'Register'}
                </button>
                <Link
                    href="/login"
                    className="hover:border-b-2 hover:border-black">
                    Sudah punya akun? Login disini
                </Link>
            </form>
        </div>
    )
}

export default FormRegister;