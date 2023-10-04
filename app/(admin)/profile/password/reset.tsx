"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useFormState } from "./context";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

const ResetPage = () => {
    const { onHandleBack, onHandleNext, formData } = useFormState();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMatch, setIsMatch] = useState(true);
    const [password, setPassword] = useState({
        current: "",
        confirm: "",
    });

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);

        axios.patch('/api/users/reset-password', { ...formData, newPassword: password.confirm })
            .then(res => {
                console.log('response', res.data);
                onHandleNext();
            })
            .catch(error => console.log(error.response.data.message ?? "Error saat proses berlangsung"))
            .finally(() => setIsLoading(false))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    }

    useEffect(() => { setIsMatch(password.current === password.confirm) }, [password])

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control my-5">
                <label>Password baru</label>
                <div className="relative mt-1 w-fit">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="current"
                        value={password.current}
                        onChange={handleChange}
                        placeholder="Ketik disini . . ."
                        className="input input-bordered"
                        required
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute mr-3 right-0
                    top-1/2 transform -translate-y-1/2 cursor-pointer">
                        {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                    </div>
                </div>
            </div>
            <div className="form-control my-5">
                <label>Konfirmasi password baru</label>
                <div className="relative mt-1 w-fit">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirm"
                        value={password.confirm}
                        onChange={handleChange}
                        placeholder="Ketik ulang password baru . . ."
                        className="input input-bordered"
                        required
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute mr-3 right-0
                    top-1/2 transform -translate-y-1/2 cursor-pointer">
                        {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                    </div>
                </div>
                <span className="text-red-600 text-sm">{!isMatch && 'Password tidak sama'}</span>
            </div>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onHandleBack}
                    className="btn btn-outline btn-primary"
                >
                    Kembali
                </button>
                <button
                    type="submit"
                    className="btn btn-primary text-white"
                    disabled={isLoading ? true : !isMatch ? true : false}
                >
                    {isLoading ? (
                        <span className="loading loading-spinner text-white"></span>
                    ) : 'Ubah Password'}
                </button>
            </div>
        </form>
    )
}

export default ResetPage;