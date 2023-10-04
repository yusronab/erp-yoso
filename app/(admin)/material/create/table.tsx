"use client";

import { InputDataMaterial } from "@/types";
import { getDataAsArray } from "@/utils/helper";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectInput from "./select";

type DataProps = {
    id: number;
    name: string;
}

const TableCreate = ({
    ukuran, suplier
}: {
    ukuran: DataProps[], suplier: DataProps[]
}) => {
    const [rowCounter, setRowCounter] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [inputData, setInputData] = useState<InputDataMaterial>({
        name: Array(rowCounter).fill(""),
        size: Array(rowCounter).fill(""),
        ukuran: Array(rowCounter).fill(""),
        totalStock: Array(rowCounter).fill(""),
        price: Array(rowCounter).fill(""),
        minPurchase: Array(rowCounter).fill(""),
        suplier: Array(rowCounter).fill(""),
    });

    const router = useRouter();

    const rowControl = (op: string, rowIndex?: number) => {
        let row = rowCounter;

        if (op === "plus") {
            row = rowCounter + 1

            setInputData(prevData => ({
                name: [...prevData.name, ""],
                size: [...prevData.size, ""],
                ukuran: [...prevData.ukuran, ""],
                totalStock: [...prevData.totalStock, ""],
                price: [...prevData.price, ""],
                minPurchase: [...prevData.minPurchase, ""],
                suplier: [...prevData.suplier, ""],
            }));
        }

        if (op === "minus" && rowIndex !== undefined && rowIndex >= 0 && rowIndex < rowCounter) {
            setInputData(prevData => ({
                name: prevData.name.filter((_, index) => index !== rowIndex),
                size: prevData.size.filter((_, index) => index !== rowIndex),
                ukuran: prevData.ukuran.filter((_, index) => index !== rowIndex),
                totalStock: prevData.totalStock.filter((_, index) => index !== rowIndex),
                price: prevData.price.filter((_, index) => index !== rowIndex),
                minPurchase: prevData.minPurchase.filter((_, index) => index !== rowIndex),
                suplier: prevData.suplier.filter((_, index) => index !== rowIndex)
            }));

            row = row - 1;
        }

        setRowCounter(row);
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, columnName: keyof InputDataMaterial
    ) => {
        const { value, name } = e.target;
        setInputData(prevData => ({
            ...prevData,
            [name]: prevData[columnName].map((val, index) => (index === rowIndex ? value : val))
        }));
    };

    const handleSubmit = () => {
        const data = getDataAsArray(rowCounter, inputData);

        setIsLoading(true);

        axios.post('/api/material', data)
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response.data.message ?? "Error saat proses berlangsung"))
            .finally(() => {
                setIsLoading(false)
                router.push('/material');
            });
    }

    return (
        <div>
            <button
                onClick={() => rowControl("plus")}
                className="btn bg-[#4e73df] text-white hover:bg-[#3b57ab]"
            >
                Tambah baris
            </button>

            <table className="table bordered my-10 table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th>Nama Material</th>
                        <th>Ukuran</th>
                        <th>Satuan</th>
                        <th>Jumlah Stock</th>
                        <th>Harga Beli</th>
                        <th>Minimal Beli</th>
                        <th>Suplier</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rowCounter }, (_, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="input input-bordered"
                                    value={inputData.name[index]}
                                    onChange={(e) => handleInputChange(e, index, "name")}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="size"
                                    required
                                    className="input input-bordered"
                                    value={inputData.size[index]}
                                    onChange={(e) => handleInputChange(e, index, "size")}
                                />
                            </td>
                            <td>
                                <SelectInput
                                    listData={ukuran}
                                    placeholder="Pilih ukuran . . ."
                                    onChange={(e) => {
                                        setInputData({
                                            ...inputData,
                                            ukuran: inputData.ukuran.map((val, idx) => (
                                                idx === index ? (e?.value.toString() || "") : val
                                            ))
                                        })
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="totalStock"
                                    required
                                    className="input input-bordered"
                                    value={inputData.totalStock[index]}
                                    onChange={(e) => handleInputChange(e, index, "totalStock")}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="price"
                                    required
                                    className="input input-bordered"
                                    value={inputData.price[index]}
                                    onChange={(e) => handleInputChange(e, index, "price")}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="minPurchase"
                                    required
                                    className="input input-bordered"
                                    value={inputData.minPurchase[index]}
                                    onChange={(e) => handleInputChange(e, index, "minPurchase")}
                                />
                            </td>
                            <td>
                                <SelectInput
                                    listData={suplier}
                                    placeholder="Pilih suplier . . ."
                                    onChange={(e) => {
                                        setInputData({
                                            ...inputData,
                                            suplier: inputData.suplier.map((val, idx) => (
                                                idx === index ? (e?.value.toString() || "") : val
                                            ))
                                        })
                                    }}
                                />
                            </td>
                            <td
                                className="text-error cursor-pointer"
                                onClick={() => rowControl("minus", index)}
                            >
                                Hapus
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={handleSubmit}
                className="btn btn-outline btn-success"
                disabled={isLoading ? true : false}
            >
                {isLoading ? (
                    <span className="loading loading-spinner text-success"></span>
                ) : 'Buat data'}
            </button>
        </div>
    )
}

export default TableCreate;