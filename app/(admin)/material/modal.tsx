"use client";

import FormInput from "@/components/FormInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";

const UpdateModal = ({
    data: initialState
}: {
    data: any
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialState);

    const router = useRouter();

    const modalHandler = () => setIsModalOpen(!isModalOpen);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onChangeNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') })
    }

    const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        axios.patch(`/api/material/${data.id}`, {
            name: data.name,
            price: Number(data.price),
            isStatus: Number(data.isStatus)
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
                        <FormInput
                            label="Name"
                            placeholder="Ketik nama disini . . ."
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                        />
                        <FormInput
                            label="Harga Beli"
                            placeholder="Ketik harga disini . . ."
                            name="price"
                            value={data.price}
                            onChange={onChangeNumberHandler}
                        />
                        <div className="form-control">
                            <label>Status</label>
                            <select
                                name="isStatus"
                                value={data.isStatus}
                                onChange={onSelectHandler}
                                className="select input-bordered"
                            >
                                <option value="" disabled>Pilih status</option>
                                <option value={1}>Tersedia</option>
                                <option value={0}>Tidak Tersedia</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn capitalize" onClick={modalHandler}>
                                Tutup
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary capitalize"
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