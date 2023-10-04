import { rupiah } from "@/utils/helper";
import moment from "moment";
import { Fragment } from "react";

const Print = ({
    data, selected, selectedValue
}: {
    data: any[], selected: number; selectedValue: string
}) => {
    return (
        <>
            <p className="text-lg">PT. YOSO MEKATAMA</p>
            <p>
                Ruko Villa Mutiara Cikarang Blok R2 N. 16 & 17 Ciantara Cikarang Selatan - Bekasi,
                Cikarang Utara, Bekasi
            </p>
            <p className="text-bold mt-5">Daftar Pembelian Alat</p>
            <p className="text-bold mb-5">
                {selected === 1 && 'Tanggal ' + selectedValue}
                {selected === 2 && 'Bulan ' + selectedValue}
                {selected === 3 && 'Tahun ' + selectedValue}
            </p>

            <table className="table bordered">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Nomor</th>
                        <th>Suplier</th>
                        <th>Status Pembayaran</th>
                        <th>Jumlah Pembayaran</th>
                        <th>Sisa Pembayaran</th>
                        <th>Total Pembelian</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length !== 0 ? data.map((row, i) => (
                        <Fragment key={i}>
                            <tr>
                                <td>{i + 1}</td>
                                <td>{moment(row.createdAt).locale('id').format('ll')}</td>
                                <td>{row.code}</td>
                                <td>{row.supplier}</td>
                                <td>
                                    {row.paymentMethod === 1 ? 'Cash'
                                        : row.paymentMethod === 2 ? 'Dp ' : 'Piutang '}
                                    /
                                    {row.paymentStatus === 1 ? ' Lunas' : ' Belum Lunas'}
                                </td>
                                <td>{rupiah(row.tenor)}</td>
                                <td>{rupiah(row.total - row.tenor)}</td>
                                <td>{rupiah(row.total)}</td>
                            </tr>
                        </Fragment>
                    )) : (
                        <tr>
                            <td colSpan={8} className="text-center text-gray-500">Kosong ?</td>
                        </tr>
                    )}
                    <tr className="bg-gray-200">
                        <td colSpan={5} className="text-end font-bold">Total</td>
                        <td>{data.reduce((acc, item) => acc += item.tenor, 0)}</td>
                        <td>{data.reduce((acc, item) => acc += (item.total - item.tenor), 0)}</td>
                        <td>{data.reduce((acc, item) => acc += item.total, 0)}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Print;