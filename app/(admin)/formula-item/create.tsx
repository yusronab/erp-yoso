"use client";

import { SyntheticEvent, useState } from "react";
import FormInput from "@/components/FormInput";
import axios from "axios";
import { useRouter } from "next/navigation";

const ModalCreate = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ name: '', price: '' });

    const router = useRouter();

    const handleModal = () => setShowModal(!showModal);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onChangeNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') })
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        axios.post('/api/formula-item', {
            name: data.name,
            price: Number(data.price),
        })
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response.data.message ?? "Error saat proses berlangsung"))
            .finally(() => {
                setLoading(false);
                setShowModal(false);
                router.refresh();
            });
    }

    return (
        <div>
            <button className="btn btn-primary capitalize" onClick={handleModal}>
                tambah data
            </button>

            <div className={showModal ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5 capitalize">tambah formulir item</h3>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="Nama formulir item"
                            placeholder="Ketik disini . . ."
                            name="name"
                            value={data.name}
                            onChange={onChangeHandler}
                        />
                        <FormInput
                            label="Harga"
                            placeholder="Ketik disini . . ."
                            name="price"
                            value={data.price}
                            onChange={onChangeNumberHandler}
                        />
                        <div className="modal-action">
                            <button className="btn capitalize" onClick={handleModal}>Tutup</button>
                            <button
                                type="submit"
                                className="btn btn-success capitalize"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner text-white"></span>
                                ) : 'tambahkan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalCreate