"use client";

import { rupiah } from "@/utils/helper";
import { useEffect, useState } from "react";

const DetailComponent = ({ data }: { data: any }) => {
    const items = JSON.parse(data.detail);

    const [selectedItems, setSelectedItems] = useState<any[]>(items);

    const handleQuantityChange = (index: number, action: 'increment' | 'decrement') => {
        setSelectedItems((prevItems) => {
            const newItems = [...prevItems];
            const item = newItems[index];

            if (action === 'increment') {
                item.qty += 1;
            } else if (action === 'decrement' && item.qty > 1) {
                item.qty -= 1;
            }

            return newItems;
        });
    };

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;

        selectedItems.forEach((item) => {
            const productPrice = item.pricePerItem;
            const productJumlah = item.qty;

            total += productPrice * productJumlah;
        })
        
        setTotalPrice(total)
    }, [selectedItems]);

    return (
        <div className="p-3 border mt-5">
            <div className="form-control mb-4">
                <label>Nomor YM</label>
                <input
                    type="text"
                    name="code"
                    value={data.code}
                    readOnly
                    className="input input-bordered input-disabled"
                />
            </div>
            <div className="form-control mb-4">
                <label>Tanggal</label>
                <input
                    type="text"
                    value={data.createdAt.toLocaleString()}
                    readOnly
                    className="input input-bordered input-disabled"
                />
            </div>
            <button
                className="btn btn-outline btn-primary capitalize mb-4"
            // onClick={modalHandler}
            >
                Pilih produk
            </button>
            <table className="table bordered">
                <thead className="bg-[#4e73df] text-white">
                    <tr>
                        <th>Kode</th>
                        <th>Nama Produk</th>
                        <th>Satuan</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.length !== 0 ?
                        selectedItems.map((row, index) => (
                            <tr key={index}>
                                <td>{row.code ?? 'Kosong'}</td>
                                <td>{row.name}</td>
                                <td className="capitalize flex flex-row items-center">
                                    <button
                                        className="btn btn-warning btn-sm"
                                        disabled={row.qty === 1}
                                        onClick={() => handleQuantityChange(index, 'decrement')}
                                    >-
                                    </button>
                                    <p className="text-error font-bold mx-2">
                                        {row.qty}-{row.satuan}
                                    </p>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleQuantityChange(index, 'increment')}
                                    >+
                                    </button>
                                </td>
                                <td>{rupiah(row.pricePerItem * row.qty)}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-gray-500 text-center">
                                    Belum ada produk terpilih
                                </td>
                            </tr>
                        )}
                    <tr>
                        <td colSpan={3} className="font-bold text-right">Subtotal</td>
                        <td className="bg-[#4e73df] text-white">
                            {rupiah(totalPrice)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="font-bold text-right">Diskon</td>
                        <td className="bg-[#4e73df] text-white">0</td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="font-bold text-right">Total</td>
                        <td className="bg-[#4e73df] text-white">
                            {rupiah(totalPrice)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DetailComponent;