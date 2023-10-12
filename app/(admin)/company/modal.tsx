"use client";

import { useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div>
            <button
                className="hidden absolute top-0 right-0 p-2 translate-x-1/2 
                -translate-y-1/2 bg-[#4e73df] text-white rounded-full group-hover:block
                opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleShowModal}
            >
                <BiSolidEdit size={16} />
            </button>

            <div className={isModalOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <p>Modal test</p>
                    <div className="modal-action">
                        <button className="btn capitalize" onClick={handleShowModal}>tutup</button>
                        <button className="btn btn-primary capitalize">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;