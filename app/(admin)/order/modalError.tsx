"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { MdBlock } from "react-icons/md";

const ModalError = ({
    id, table, title, message, tooltip
}: {
    id: number, table: string, title: string, message: string, tooltip?: string
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const modalHandler = () => setIsModalOpen(!isModalOpen);

    const deleteHandler = async () => {
        setIsLoading(true);

        await axios.delete(`/api/${table}/${id}`)
            .then(res => console.log(res))
            .catch(error => console.log(error))

        setIsLoading(false);
        router.refresh();
        setIsModalOpen(false);
    }

    return (
        <div>
            <button
                className="btn btn-outline btn-error tooltip btn-sm capitalize font-light text-sm"
                onClick={modalHandler}
                data-tip={tooltip}
            >
                {title.includes('hapus') ? <MdBlock /> : <BsTrash3 />}
            </button>

            <div className={isModalOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5 capitalize">{title}</h3>
                    <p>{message}</p>
                    <div className="modal-action">
                        <button onClick={modalHandler} className="btn btn-primary">Tutup</button>
                        <button
                            onClick={deleteHandler}
                            className="btn"
                            disabled={isLoading ? true : false}
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner text-white"></span>
                            ) : 'Yakin'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalError;