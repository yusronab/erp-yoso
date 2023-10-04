"use client";

import { SyntheticEvent, useState } from "react";
import { useFormState } from "./context";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSession } from "next-auth/react";
import axios from "axios";

const CheckPage = () => {
  const { data: session, status } = useSession();
  const { onHandleNext, setFormData } = useFormState();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (status !== 'loading') {
      setIsLoading(true);

      const data = {
        ...session?.user,
        password: password,
      }

      await axios.post('/api/users', data)
        .then(res => {
          setFormData(res.data)
          onHandleNext()
        })
        .catch(error => console.log(error.response.data.message ?? "Error saat proses berlangsung"))
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control my-5">
        <label>Password lama</label>
        <div className="relative mt-1 w-fit">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      <button
        type="submit"
        className="btn btn-primary text-white my-4"
        disabled={isLoading ? true : false}
      >
        {isLoading ? (
          <span className="loading loading-spinner text-white"></span>
        ) : 'Check'}
      </button>
    </form>
  )
}

export default CheckPage;