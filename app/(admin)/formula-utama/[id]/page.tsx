"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IFormula {
    name: string;
    formulaProduksi: { name: string }[];
}

const DetailPage = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState<IFormula>({
        name: '',
        formulaProduksi: [],
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        axios.get(`/api/formula-utama/${params.id}`)
            .then(res => setData(res.data))
            .catch(error => console.log(error.response.data.message ?? "Error saat proses berlangsung"))
            .finally(() => setIsLoading(false));
    }, [])

    return (
        <div className="p-5">
            <div className="p-3 rounded-md bg-slate-100 border mb-5 flex justify-between items-center">
                <div className="flex flex-col">
                    <p>Data Formula Utama</p>
                    {data.name && <h3 className="badge badge-primary">{data.name}</h3>}
                </div>
                <Link href="/formula-utama" className="btn btn-success capitalize">kembali</Link>
            </div>
            <table className="table bordered">
                <thead className="text-[#4e73df]">
                    <tr>
                        <th>Langkah</th>
                        <th>Tahap Produksi</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td><span className="loading loading-spinner text-primary"></span></td>
                        </tr>
                    ) : data.formulaProduksi.length ? data.formulaProduksi.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                        </tr>
                    )) : (
                        <tr >
                            <td className="text-gray-500 text-center" colSpan={2}>Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default DetailPage;