"use client";

import moment from "moment";
import QRCode from "react-qr-code";
import 'moment/locale/id';
import { useEffect, useState } from "react";
import { rupiah } from "@/utils/helper";

const PrintTools = ({ data }: { data: any }) => {
    const detail = JSON.parse(data.detail);

    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => setSelectedItems(detail), [data]);

    const total = selectedItems.reduce((prev, curr) => prev += curr.subtotal, 0);

    return (
        <>
            <p className="font-bold mb-5 text-xl">CV. YOSO MEKATAMA</p>
            <div className="grid grid-cols-2 mb-5 gap-3">
                <div>
                    <p>
                        Ruko Villa Mutiara Cikarang Blok R2 N. 16 & 17 Ciantara Cikarang Selatan - Bekasi,
                        Cikarang Utara, Bekasi
                    </p>
                    <p className="text-xs">Telp : 02189901168</p>
                    <p className="text-xs">Fax : 02189901498</p>
                </div>
                <div>
                    <p className="font-bold">PURCHASE TOOLS</p>
                    <p className="mt-auto">Tanggal : {moment().locale('id').format('LL')}</p>
                    <p>Nomor : <span className="font-bold">{data.code}</span></p>

                </div>
                <div className="mt-5">
                    <p className="text-sm">User By :</p>
                    <p className="font-bold">{data.user.name}</p>
                </div>
                <div className="mt-5">
                    <p className="text-sm">Suplier :</p>
                    <p className="font-bold">{data.supplier}</p>
                </div>
                <div className="mt-5">
                    <p>Metode Pembayaran : <span className="font-bold">{
                        data.paymentMethod === 1 ? 'Cash' : data.paymentMethod === 2 ? 'Dp' : 'Piutang'
                    }</span></p>
                    <p>Status Pembayaran : <span className="font-bold">{
                        data.paymentStatus === 1 ? 'Lunas' : 'Belum Lunas'
                    }</span></p>
                </div>
            </div>
            <table className="table bordered mb-5">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th>No</th>
                        <th>Nama Produk</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Subtotal Item</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.length !== 0 ?
                        selectedItems.map((row, index) => (
                            <tr key={index} className="hover">
                                <td>{index + 1}</td>
                                <td>{row.toolsName}</td>
                                <td>{row.qty}</td>
                                <td>{rupiah(row.pricePerItem)}</td>
                                <td>{rupiah(row.subtotal)}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-gray-500 text-center">
                                    Belum ada produk terpilih
                                </td>
                            </tr>
                        )}
                    <tr>
                        <td className="text-right" colSpan={4}>Subtotal</td>
                        <td>{rupiah(total)}</td>
                    </tr>
                    <tr>
                        <td className="text-right" colSpan={4}>Pajak Pertambahan Nilai (PPN) 11%</td>
                        <td>{rupiah(data.ppn)}</td>
                    </tr>
                    <tr>
                        <td className="text-right" colSpan={4}>Total</td>
                        <td className="bg-gray-700 text-white">{rupiah(data.total)}</td>
                    </tr>
                </tbody>
            </table>
            <div className="grid grid-cols-4 gap-3">
                <QRCode value="yusron" size={150} />
                <div className="flex flex-col items-center">
                    <p className="font-bold">Dibuat Oleh,</p>
                    <p className="mt-10">{data.user.name}</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold">Pimpinan,</p>
                    <p className="mt-10">. . . . . . . . .</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold">Diterima Oleh,</p>
                    <p className="mt-10">. . . . . . . . .</p>
                </div>
            </div>
        </>
    );
};

export default PrintTools;