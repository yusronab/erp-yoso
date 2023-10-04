"use client";

import moment from "moment";
import QRCode from "react-qr-code";
import 'moment/locale/id';
import { useEffect, useState } from "react";

const PrintBarangSubcont = ({ data }: { data: any }) => {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => setSelectedItems(data.detail), [data]);

    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-bold text-xl">SURAT JALAN SUBCONT</h1>
                <h1 className="font-bold">Tanggal: {moment().locale('id').format('ll')}</h1>
            </div>
            <hr color="black" className="my-3" />
            <div className="flex gap-10">
                <div className="flex-1">
                    <p className="font-bold">CV. YOSO MEKATAMA</p>
                    <p>
                        Ruko Villa Mutiara Cikarang Blok R2 N. 16 & 17 Ciantara Cikarang Selatan - Bekasi,
                        Cikarang Utara, Bekasi
                    </p>
                    <p className="text-xs">Telp : 02189901168</p>
                    <p className="text-xs">Fax : 02189901498</p>
                </div>
                <div className="flex-1">
                    <p className="text-xs">Yth:</p>
                    <p className="font-bold">{data.subcont.name}</p>
                    <p>{data.subcont.address}, {data.subcont.city}</p>
                    <p className="text-xs">Telp : {data.subcont.phone ?? '-'}</p>
                </div>
                <div className="flex-1">
                    <QRCode value="yusron" size={150} />
                </div>
            </div>
            <hr color="black" className="my-3" />
            <p>Nomor surat jalan : {data.code}</p>
            <hr color="black" className="my-3" />
            <p>Kami Kirim barang - barang tersebut dibawah ini dengan kendaraan :</p>

            <table className="table border my-6">
                <thead className="bg-[#4e73df] text-white">
                    <tr>
                        <th>No</th>
                        <th>Nama Barang</th>
                        <th>Jumlah</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.length !== 0 ? selectedItems.map((item, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.qty}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={3} className="text-gray-700">Belum ada data</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={2} className="text-right">Jumlah total</td>
                        <td>
                            {selectedItems.reduce((total, curr) => total + curr.qty, 0)}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="grid grid-cols-3 gap-5">
                <div>
                    <p className="capitalize">dibuat oleh</p>
                    <div className="mt-10 flex justify-between">
                        <span>{'('}</span>
                        <span>{')'}</span>
                    </div>
                </div>
                <div>
                    <p className="capitalize">dikirim oleh</p>
                    <div className="mt-10 flex justify-between">
                        <span>{'('}</span>
                        <span>{')'}</span>
                    </div>
                </div>
                <div>
                    <p className="capitalize">diterima oleh</p>
                    <div className="mt-10 flex justify-between">
                        <span>{'('}</span>
                        <span>{')'}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintBarangSubcont;