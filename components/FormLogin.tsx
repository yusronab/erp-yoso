"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Toast from "./Toast";

const FormLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const [resMessage, setResMessage] = useState({
        error: false,
        message: ""
    });

    const handleChange = (e: any) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const searchParams = useSearchParams();
    
    useEffect(()=> {

        const paramError = searchParams.get('error') ?? "";

        if (paramError) {
            setResMessage({
                ...resMessage,
                error: true,
                message: `Error: ${paramError}`
            });
        }
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        signIn("credentials", {
            ...state,
            callbackUrl: '/',
        }).catch(error => {
            console.log('info-error', error)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div>
            {resMessage.message && <Toast response={resMessage} />}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block">Contoh: example@gmail.com</label>
                    <input
                        type="text"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="input input-primary w-full mt-1"
                        required
                    />
                </div>
                <label htmlFor="password" className="block mt-4">*password minimal 8 karakter</label>
                <div className="relative mt-1">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="input w-full input-primary"
                        required
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute mr-3 right-0
                    top-1/2 transform -translate-y-1/2 cursor-pointer">
                        {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full text-white my-4"
                    disabled={isLoading ? true : false}
                >
                    {isLoading ? (
                        <span className="loading loading-spinner text-white"></span>
                    ) : 'Login'}
                </button>
                <Link href="/register"
                    className="hover:border-b-2 hover:border-black">
                    Buat akun baru
                </Link>
            </form>
        </div>
    )
}

export default FormLogin