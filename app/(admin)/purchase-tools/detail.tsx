"use client";

import FormInputReadonly from "@/components/FormInputReadonly";
import moment from "moment";
import { useEffect, useState } from "react";
import 'moment/locale/id';
import { rupiah } from "@/utils/helper";

const DetailComponent = ({ data }: { data: any }) => {
    const detail = JSON.parse(data.detail);

    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    useEffect(() => setSelectedItems(detail), [data]);

    const total = selectedItems.reduce((prev, curr) => prev += curr.subtotal, 0)

    return (
        <div className="p-3 border mt-5">
            <div className="flex flex-col sm:flex-row gap-7">
                <div className="flex-1">
                    <FormInputReadonly
                        label="pemasok"
                        value={data.supplier ?? '-'}
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="telepon"
                        value={moment(data.createdAt).locale('id').format('LLLL') ?? '-'}
                        readonly={true}
                    />
                </div>
                <div className="flex-1">
                    <FormInputReadonly
                        label="Nomor SO"
                        value={data.code}
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
                            data.paymentMethod === 1 ? 'Cash' : data.paymentMethod === 2 ? 'Dp' : 'Piutang'
                        }
                        readonly={true}
                    />
                    <FormInputReadonly
                        label="status pembayaran"
                        value={data.paymentStatus === 1 ? 'Lunas' : 'Belum Lunas'}
                        readonly={true}
                    />
                </div>
            </div>

            <table className="table bordered">
                <thead className="bg-gray-700 text-white">
                    <tr>
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
                            <td className="text-right" colSpan={3}>Subtotal</td>
                            <td>{rupiah(total)}</td>
                        </tr>
                        <tr>
                            <td className="text-right" colSpan={3}>Pajak Pertambahan Nilai (PPN) 11%</td>
                            <td>{rupiah(data.ppn)}</td>
                        </tr>
                        <tr>
                            <td className="text-right" colSpan={3}>Total</td>
                            <td>{rupiah(data.total)}</td>
                        </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DetailComponent;