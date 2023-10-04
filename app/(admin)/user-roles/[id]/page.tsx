"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";

const UpdatePage = ({ params }: { params: { id: string } }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        code: '',
        name: '',
        description: '',
        moduleAccess: '',
    });

    const router = useRouter();

    useEffect(() => {
        axios.get(`/api/user-roles/${params.id}`)
            .then((res) => setData(res.data))
            .catch(error => console.log('e:', error.message))
    }, [])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        await axios.patch(`/api/user-roles/${params.id}`, data)

        setLoading(false);
        router.replace('/user-roles');
    }

    return (
        <div className="p-5">
            <p className="mb-5">Update Data</p>
            {data.code ? (
                <form
                    onSubmit={onSubmitHandler}
                    className="w-full flex flex-col justify-center items-center py-5 gap-5"
                >
                    <div className="flex flex-col gap-2">
                        <label>Code</label>
                        <input
                            type="text"
                            placeholder="Ketik kode role disini . . ."
                            required
                            name="code"
                            autoComplete="off"
                            value={data.code}
                            onChange={onChangeHandler}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Ketik nama role disini . . ."
                            required
                            name="name"
                            autoComplete="off"
                            value={data.name}
                            onChange={onChangeHandler}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder="Ketik deskripsi disini . . ."
                            required
                            name="description"
                            autoComplete="off"
                            value={data.description}
                            onChange={onChangeHandler}
                            className="input input-bordered"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading ? true : false}
                        className="btn bg-[#4e73df] text-white hover:bg-[#3b57ab]"
                    >
                        {loading ? (
                            <span className="loading loading-spinner text-white"></span>
                        ) : (
                            'Update Data'
                        )}
                    </button>
                </form>
            ) : (
                <div className="flex justify-center items-center py-5">
                    <span className="loading loading-spinner loading-lg text-[#3b57ab]"></span>
                </div >
            )}
        </div >
    )
};

export default UpdatePage;