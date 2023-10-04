"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const DeleteModal = ({
    id, table,
}: {
    id: number, table: string,
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
            <button className="text-error" onClick={modalHandler}>
                <FaTrash />
            </button>

            <div className={isModalOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Hapus Data</h3>
                    <p>Apakah kamu yakin untuk menghapus data {id}?</p>
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

export default DeleteModal;