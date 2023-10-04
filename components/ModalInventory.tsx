"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { FaEdit } from "react-icons/fa"
import FormInput from "./FormInput";

const ModalInventory = ({
    title, editId, table, inputList, modalState: initialState
}: {
    title: string;
    table: string;
    editId?: number;
    inputList: any[];
    modalState: any;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState<any>(initialState);

    const router = useRouter();

    const modalHandler = () => setIsModalOpen(!isModalOpen);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onChangeNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') })
    }

    const addSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();

        setIsLoading(true);

        const body: any = {};

        inputList.forEach(input => {
            const { id, type } = input;
            const value = state[id];

            if (type === 'number') {
                body[id] = Number(value);
            } else {
                body[id] = value;
            }
        });

        axios.post(`/api/${table}`, body)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message ?? 'POST error' + body))
            .finally(() => {
                setIsLoading(false);
                setState(initialState);
                router.refresh();
                setIsModalOpen(false);
            })
    }

    const editSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();

        setIsLoading(true);

        const body: any = {};

        inputList.forEach(input => {
            const { id, type } = input;
            const value = state[id];

            if (type === 'number') {
                body[id] = Number(value);
            } else {
                body[id] = value;
            }
        });

        axios.patch(`/api/${table}/${editId}`, body)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message ?? 'PATCH error:' + body))
            .finally(() => {
                setIsLoading(false);
                router.refresh();
                setIsModalOpen(false);
            })
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
                            <FormInput
                                key={index}
                                label={input.label}
                                name={input.id}
                                placeholder={`Ketik ${input.label} disini . . .`}
                                value={state[input.id]}
                                onChange={input.type === 'text' ? onChangeHandler : onChangeNumberHandler}
                            />
                        ))}
                        <div className="modal-action">
                            <button type="button" className="btn capitalize" onClick={modalHandler}>Tutup</button>
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

export default ModalInventory;