"use client";

import FormInputReadonly from "@/components/FormInputReadonly";
import moment from "moment";
import { useEffect, useState } from "react";

const DetailComponent = ({ data }: { data: any }) => {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => setSelectedItems(data.detail), [data]);

    return (
        <div className="p-3 border mt-5">
            <div className="flex flex-col sm:flex-row gap-7">
                <div className="flex-1">
                    <FormInputReadonly
                        label="pemasok"
                        value={data.subcont.name ?? '-'}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="telepon"
                        value={data.subcont.phone ?? '-'}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="fax"
                        value={data.subcont.fax ?? '-'}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="alamat"
                        value={data.subcont.address ?? '-'}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="kota"
                        value={data.subcont.city ?? '-'}
                        readonly={true}
                    />
                </div>
                <div className="flex-1">
                    <FormInputReadonly
                        label="Nomor BSTJ"
                        value={data.code}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="tanggal"
                        value={moment(data.createdAt).locale('id').format('LLLL')}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="mata uang"
                        value="(IDR) Rupiah"
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="jenis pembayaran"
                        value={
                            data.paymentMethod === '1' ? 'Cash' : data.paymentMethod === '2' ? 'Dp' : 'Piutang'
                        }
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="status pembayaran"
                        value={data.paymentStatus ?? 'Lunas'}
                        readonly={true}
                    />
                </div>
            </div>

            <table className="table bordered">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th>Kode</th>
                        <th>Nama Produk</th>
                        <th>Total</th>
                        <th>Satuan</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.length !== 0 ?
                        selectedItems.map((row, index) => (
                            <tr key={index} className="hover">
                                <td>{row.code ?? 'Kosong'}</td>
                                <td>{row.productName}</td>
                                <td>{row.qty}</td>
                                <td className="capitalize">{row.satuan}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-gray-500 text-center">
                                    Belum ada produk terpilih
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default DetailComponent;