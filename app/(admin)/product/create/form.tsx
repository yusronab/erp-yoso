"use client";

import FormInput from "@/components/FormInput";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const Form = ({ satuanUkuran }: { satuanUkuran: any[] }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        price: '',
        productType: '',
        satuanId: '',
        isDiscount: false,
        discountName: '',
        minOrder: '',
        value: '',
        typeValue: '',
        desc: '',
        startDate: '',
        endDate: '',
    });

    const router = useRouter();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'isDiscount') setData({ ...data, [e.target.name]: e.target.checked });
        else setData({ ...data, [e.target.name]: e.target.value });
    };

    const selectHanlder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const numberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') })
    };

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        axios.post('/api/product', data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message ?? 'Error post: ' + data))
            .finally(() => {
                setIsLoading(false);
                router.push('/product');
            });
    };

    return (
        <form onSubmit={submitHandler}>
            <FormInput
                label="Nama produk"
                name="name"
                placeholder="Ketik disini . . ."
                value={data.name}
                onChange={changeHandler}
            />
            <div className="form-control mb-4">
                <label>Satuan ukuran</label>
                <select
                    name="satuanId"
                    value={data.satuanId}
                    onChange={selectHanlder}
                    className="select select-bordered"
                >
                    <option value="" disabled>Pilih satuan</option>
                    {satuanUkuran.map((satuan, index) => (
                        <option key={index} value={satuan.id}>{satuan.name}</option>
                    ))}
                </select>
            </div>
            <FormInput
                label="Harga"
                name="price"
                placeholder="Ketik disini . . ."
                value={data.price}
                onChange={numberHandler}
            />
            <div className="form-control mb-4">
                <label>Jenis produk</label>
                <select
                    name="productType"
                    value={data.productType}
                    onChange={selectHanlder}
                    className="select select-bordered"
                >
                    <option value="" disabled>Pilih jenis produk</option>
                    <option value="1">Item</option>
                    <option value="2">Utama</option>
                </select>
            </div>
            <div className="mb-4">
                <label>Diskon</label>
                <input
                    type="checkbox"
                    name="isDiscount"
                    className="checkbox"
                    checked={data.isDiscount}
                    onChange={changeHandler}
                />
            </div>
            <motion.div
                animate={{
                    height: data.isDiscount ? 'fit-content' : 0,
                    display: data.isDiscount ? 'block' : 'hidden',
                    visibility: data.isDiscount ? 'visible': 'hidden',
                }}
            >
                <FormInput
                    label="Nama diskon"
                    name="discountName"
                    required={false}
                    placeholder="Ketik disini . . ."
                    value={data.discountName}
                    onChange={changeHandler}
                />
                <FormInput
                    label="Minimal order"
                    name="minOrder"
                    required={false}
                    placeholder="Ketik disini . . ."
                    value={data.minOrder}
                    onChange={numberHandler}
                />
                <div className="form-control mb-4">
                    <label>Tipe diskon</label>
                    <select
                        name="typeValue"
                        value={data.typeValue}
                        onChange={selectHanlder}
                        className="select select-bordered"
                    >
                        <option value="" disabled>Pilih tipe</option>
                        <option value="1">Percent</option>
                        <option value="2">Amount</option>
                    </select>
                </div>
                <FormInput
                    label="Nilai"
                    name="value"
                    required={false}
                    placeholder="Ketik disini . . ."
                    value={data.value}
                    onChange={numberHandler}
                />
                <FormInput
                    label="Deskripsi"
                    name="desc"
                    required={false}
                    placeholder="Ketik disini . . ."
                    value={data.desc}
                    onChange={changeHandler}
                />
                <div className="form-control mb-4">
                    <label>Tanggal mulai</label>
                    <input
                        type="date"
                        name="startDate"
                        className="input input-bordered"
                        value={data.startDate}
                        onChange={changeHandler}
                    />
                </div>
                <div className="form-control mb-4">
                    <label>Tanggal selesai</label>
                    <input
                        type="date"
                        name="endDate"
                        className="input input-bordered"
                        value={data.endDate}
                        onChange={changeHandler}
                    />
                </div>
            </motion.div>
            <div className="card-actions">
                <Link href="/product" type="button" className="btn capitalize">kembali</Link>
                <button
                    type="submit"
                    className="btn btn-success capitalize"
                    disabled={isLoading}
                >
                    {isLoading ? <span className="loading loading-spinner text-white"></span>
                        : 'tambahkan data'}
                </button>
            </div>
        </form>
    );
};

export default Form;