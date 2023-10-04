"use client";

import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import { rupiah } from "@/utils/helper";
import { table } from "@/utils/table";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { MdInsertDriveFile } from "react-icons/md";
import ModalError from "./modalError";

const Table = ({
    data, onRowClick, style
}: {
    data: any[], onRowClick: (row: any) => void, style: any[]
}) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filtering, setFiltering] = useState(false);
    const [isOpenRow, setIsOpenRow] = useState(false);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageIndex: number) => setCurrentPage(pageIndex);

    const handleSearch = (keyword: string) => {
        const filtered = data.filter(item =>
            item.name?.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredData(filtered);

        if (!keyword) setFiltering(false);
        if (keyword) setFiltering(true);
    };

    const handleItemPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setCurrentPage(0);
    };

    const showingText = table.generateShowingText(
        startIndex + 1,
        Math.min(endIndex, filteredData.length),
        filtering ? data.length : filteredData.length,
        filtering,
        data.length
    );

    useEffect(() => setFilteredData(data), [data]);

    return (
        <div className="py-5">
            <div className="flex justify-between my-5">
                <PerPageSelect
                    options={[10, 20, 30, 40]}
                    defaultValue={itemsPerPage}
                    onChange={handleItemPerPageChange}
                />
                <SearchBar onSearch={handleSearch} />
            </div>
            <table className="table border">
                <thead className="bg-[#4e73df] text-white">
                    <tr>
                        <th>Status</th>
                        <th>Nomor</th>
                        <th>PO Customer</th>
                        <th>Nama Pelanggan</th>
                        <th>Nama Sales</th>
                        <th>Jumlah Total</th>
                        <th>Metode</th>
                        <th>Status Bayar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(startIndex, endIndex).map((row, index) => {
                        const methodStyle = table.getStyle('jenis_pembayaran', row.paymentMethod, style);
                        const statusStyle = table.getStyle('status_pembayaran', row.paymentStatus, style);

                        return (
                            <Fragment key={index}>
                                <tr className="hover">
                                    <td
                                        onClick={() => setIsOpenRow(!isOpenRow)}
                                        className="cursor-pointer text-center capitalize"
                                    >
                                        {isOpenRow ? <FaMinusCircle className="text-[#4e73df] mx-auto" />
                                            : <FaPlusCircle className="text-[#4e73df] mx-auto" />}

                                        {row.isStatus === 1 ? 'meminta' : row.isStatus === 2 ? 'pending'
                                            : 'dibatalkan'}
                                    </td>
                                    <td>{row.code}</td>
                                    <td>{row.poc ?? ''}</td>
                                    <td>{row.customer ? row.customer.name : ''}</td>
                                    <td>{row.user.name}</td>
                                    <td>{rupiah(row.total)}</td>
                                    <td>
                                        <span
                                            className="text-xs rounded-md inline-block my-auto mr-2 p-2"
                                            style={methodStyle.style}
                                        >
                                            {methodStyle.name}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className="text-xs rounded-md inline-block m-auto p-2"
                                            style={statusStyle.style}
                                        >
                                            {statusStyle.name}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isOpenRow ? 'fit-content' : 0,
                                                margin: isOpenRow ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden"
                                        >
                                            <p>Tanggal</p>
                                        </motion.div>
                                    </td>
                                    <td colSpan={7} className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isOpenRow ? 'fit-content' : 0,
                                                margin: isOpenRow ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden"
                                        >
                                            <p>{row.updatedAt.toLocaleString()}</p>
                                        </motion.div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isOpenRow ? 'fit-content' : 0,
                                                margin: isOpenRow ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden"
                                        >
                                            <p>Aksi</p>
                                        </motion.div>
                                    </td>
                                    <td colSpan={7} className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isOpenRow ? 'fit-content' : 0,
                                                margin: isOpenRow ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden gap-3"
                                        >
                                            <button
                                                className="tooltip btn btn-outline btn-primary btn-sm capitalize
                                            font-light text-sm"
                                                data-tip="lihat detail"
                                                onClick={() => onRowClick(row)}
                                            >
                                                <MdInsertDriveFile />
                                            </button>
                                            <ModalError
                                                id={row.id}
                                                table="order-status"
                                                title="batalkan transaksi"
                                                tooltip="batalkan order"
                                                message={`Apakah kamu yakin membatalkan order dengan id-
                                                ${row.code}`}
                                            />
                                            <ModalError
                                                id={row.id}
                                                table="order"
                                                title="hapus transaksi"
                                                message={`Apakah kamu yakin menghapus data dengan id-
                                                ${row.code}`}
                                            />
                                        </motion.div>
                                    </td>
                                </tr>
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>

            <div className="flex justify-between my-5">
                <p className="my-5">{showingText}</p>
                <PaginationBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Table;