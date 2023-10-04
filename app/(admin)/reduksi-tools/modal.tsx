"use client";

import FormInput from "@/components/FormInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";

const ModalCreate = ({ tools }: { tools: any[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        stock: '',
        amount: '',
        desc: '',
        toolsId: '',
    });

    const router = useRouter();

    const modalHandler = () => setIsModalOpen(!isModalOpen);

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);

        axios.post('/api/tools-reduction', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message ?? 'Post error: ' + data))
            .finally(() => {
                setIsLoading(false);
                setIsModalOpen(false);
                router.refresh();
            })
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };

    const onNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') })
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedToolId = e.target.value;
        const selectedTool = tools.find((tool) => tool.id === Number(selectedToolId));
        
        if (selectedTool) {
            setData({
                ...data,
                name: selectedTool.name,
                stock: selectedTool.amount,
                toolsId: selectedTool.id,
            });
        }
    };
    
    return (
        <div>
            <button
                onClick={modalHandler}
                className="btn bg-[#4e73df] text-white hover:text-[#4e73df] hover:border-[#4e73df]
                border hover:bg-white hover:border capitalize"
            >
                <FaPlus className="mr-2" />Pengurangan Baru
            </button>

            <div className={isModalOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">Data Pengurangan Peralatan</h3>
                    <form onSubmit={submitHandler}>
                        <div className="form-control mb-4">
                            <label>Nama peralatan</label>
                        <select
                            name="name"
                            onChange={handleSelectChange}
                            value={data.name}
                            className="select select-bordered"
                        >
                            <option value="" disabled>Pilih peralatan</option>
                            {tools.map((tool, index) => (
                                <option key={index} value={tool.id}>
                                    {tool.name}
                                </option>
                            ))}
                        </select>
                        </div>
                        <div className="form-control mb-4">
                            <label>Stok saat ini</label>
                            <input
                                type="text"
                                placeholder="Ketik jumlah disini . . ."
                                name="stock"
                                value={data.stock}
                                disabled
                                className="input input-bordered"
                            />
                        </div>
                        <FormInput
                            label="Jumlah pengurangan"
                            placeholder="Ketik jumlah disini . . ."
                            name="amount"
                            value={data.amount}
                            onChange={onNumberHandler}
                        />
                        <FormInput
                            label="Keterangan"
                            placeholder="Ketik disini . . ."
                            name="desc"
                            value={data.desc}
                            onChange={onChangeHandler}
                        />
                        <div className="modal-action">
                            <button type="button" className="btn capitalize" onClick={modalHandler}>
                                Tutup
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner text-white"></span>
                                ) : 'Tambah data'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalCreate