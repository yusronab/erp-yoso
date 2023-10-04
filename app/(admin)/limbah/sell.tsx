"use client";

import FormInput from "@/components/FormInput";
import { SyntheticEvent, useState } from "react"

const ModalSell = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        amount: '',
        price: '',
        desc: '',
    });

    const modalHandler = () => setIsModalOpen(!isModalOpen);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const numberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') })
    }

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
    }

    return (
        <div>
            <button
                onClick={modalHandler}
                className="btn btn-info capitalize"
            >jual limbah
            </button>

            <div className={isModalOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Masukan jumlah yang akan dijual</h3>
                    <form onSubmit={submitHandler}>
                        <FormInput
                            label="Limbah yang dijual"
                            placeholder="Ketik disini . . ."
                            name="amount"
                            value={data.amount}
                            onChange={numberHandler}
                        />
                        <FormInput
                            label="Harga jual"
                            placeholder="Ketik disini . . ."
                            name="price"
                            value={data.price}
                            onChange={numberHandler}
                        />
                        <FormInput
                            label="Keterangan"
                            placeholder="Ketik disini . . ."
                            name="desc"
                            value={data.desc}
                            onChange={changeHandler}
                        />
                        <div className="modal-action">
                            <button type="button" className="btn capitalize" onClick={modalHandler}>
                                batal
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary capitalize"
                                disabled={isLoading ? true : false}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner text-white"></span>
                                ) : 'jual'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalSell