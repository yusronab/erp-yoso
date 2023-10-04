"use client";

import { Role } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";

const UpdateModal = ({
    data: initialState, listRole
}: {
    data: any, listRole?: Role[]
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialState);

    const router = useRouter();

    const modalHandler = () => setIsModalOpen(!isModalOpen);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        await axios.patch(`/api/users/${data.id}`, {
            name: data.name,
            bod: new Date(data.bod),
            roleId: Number(data.roleId),
            statusId: Number(data.statusId)
        })

        setLoading(false);
        setIsModalOpen(false);
        router.refresh();
    }

    return (
        <div>
            <button
                onClick={modalHandler}
                className="text-[#4e73df]"
            >
                <FaEdit />
            </button>

            <div className={isModalOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Update data</h3>
                    <form
                        onSubmit={onSubmitHandler}
                        className="form-control py-2 gap-5"
                    >
                        <div className="form-control">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Ketik nama disini . . ."
                                required
                                name="name"
                                autoComplete="off"
                                value={data.name}
                                onChange={onChangeHandler}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                required
                                name="bod"
                                value={data.bod ?? new Date()}
                                onChange={onChangeHandler}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label>Role</label>
                            <select
                                name="roleId"
                                value={data.roleId}
                                onChange={onSelectHandler}
                                className="input input-bordered"
                            >
                                <option value="" disabled>Pilih role</option>
                                {listRole?.map((role, index) => (
                                    <option value={role.id} key={index}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label>Status</label>
                            <select
                                name="statusId"
                                value={data.statusId}
                                onChange={onSelectHandler}
                                className="input input-bordered"
                            >
                                <option value="" disabled>Pilih status</option>
                                <option value={1}>Aktif</option>
                                <option value={2}>Nonaktif</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={modalHandler}>Tutup</button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading ? true : false}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner text-white"></span>
                                ) : 'Update data'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateModal;