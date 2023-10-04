"use client"

import { ModalState } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { FaEdit } from "react-icons/fa"

const CustomModal = ({
    title, editId, table, state: initialState, inputList
}: {
    title: string;
    table: string;
    editId?: number;
    inputList: (keyof ModalState)[];
    state: ModalState;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(initialState);

    const router = useRouter();

    const modalHandler = () => setIsModalOpen(!isModalOpen);

    const inputChangeHandler = (property: keyof ModalState, value: string) => {
        setState({ ...state, [property]: value });
    }

    const addSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        setIsLoading(true);

        await axios.post(`/api/${table}`, state)

        setState(initialState);
        setIsLoading(false);
        router.refresh();
        setIsModalOpen(false);
    }

    const editSubmitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        setIsLoading(true);

        await axios.patch(`/api/${table}/${editId}`, state)

        setIsLoading(false);
        router.refresh();
        setIsModalOpen(false);
    }

    return (
        <div>
            <button
                onClick={modalHandler}
                className={editId ? 'text-[#4e73df]' : 'btn bg-[#4e73df] text-white hover:text-[#4e73df] hover:border-[#4e73df] border hover:bg-white hover:border capitalize'}
            >
                {editId ? <FaEdit /> : 'Tambah Data'}
            </button>

            <div className={isModalOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">{title} {editId}</h3>
                    <form onSubmit={editId ? editSubmitHandler : addSubmitHandler}>
                        {inputList?.map((input, index) => (
                            <div key={index} className="form-control w-full mb-4">
                                <label className="capitalize">{input}</label>
                                <input
                                    type="text"
                                    placeholder={`Ketik ${input} disini . . .`}
                                    required
                                    name={input}
                                    autoComplete="off"
                                    value={state[input]}
                                    onChange={(e) => inputChangeHandler(input, e.target.value)}
                                    className="input input-bordered my-1"
                                />
                            </div>
                        ))}
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={modalHandler}>Tutup</button>
                            <button
                                type="submit"
                                className="btn btn-primary capitalize"
                                disabled={isLoading ? true : false}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner text-white"></span>
                                ) : title}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomModal;