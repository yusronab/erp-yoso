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

    const onSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        const body = {
            name: data.name,
            price: Number(data.price),
            productType: Number(data.productType),
            formulaId: Number(data.formulaId),
        };

        axios.patch(`/api/product/${data.id}`, body)
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response.data.message ?? "Error saat proses berlangsung"))
            .finally(() => {
                setLoading(false);
                setIsModalOpen(false);
                router.refresh();
            });
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
                        <div className="form-control mb-4">
                            <label>Jenis produk</label>
                            <select
                                name="productType"
                                value={data.productType}
                                onChange={onSelectHandler}
                                className="select select-bordered"
                            >
                                <option value="" disabled>Pilih jenis produk</option>
                                <option value="1">Item</option>
                                <option value="2">Utama</option>
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