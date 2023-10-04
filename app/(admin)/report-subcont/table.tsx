"use client";

import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import { rupiah } from "@/utils/helper";
import { table } from "@/utils/table";
import { motion } from "framer-motion";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import 'moment/locale/id';

const Table = ({ data, style }: { data: any[]; style: any[] }) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filtering, setFiltering] = useState(false);

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

    const [openRowStates, setOpenRowStates] = useState<{ [key: number]: boolean }>({});

    const toggleRow = (index: number) => {
        setOpenRowStates((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

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
                        <th>#</th>
                        <th>Status</th>
                        <th>Tanggal</th>
                        <th>Nomor</th>
                        <th>Nama Suplier</th>
                        <th>Nama User</th>
                        <th>Jumlah Item</th>
                        <th>Pembayaran</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length !== 0 ? filteredData.slice(startIndex, endIndex).map((row, index) => {
                        const methodStyle = table.getStyle('jenis_pembayaran', row.paymentMethod, style);
                        const statusStyle = table.getStyle('status_pembayaran', row.paymentStatus, style);
                        const purchase = table.getStyle('purchase', row.isStatus, style);

                        const isRowOpen = openRowStates[index];

                        return (
                            <Fragment key={index}>
                                <tr className="bg-gray-100">
                                    <td
                                        onClick={() => toggleRow(index)}
                                        className="cursor-pointer text-center capitalize"
                                    >
                                        {isRowOpen ? <FaMinusCircle className="text-[#4e73df] mx-auto" />
                                            : <FaPlusCircle className="text-[#4e73df] mx-auto" />}

                                    </td>
                                    <td>
                                        <p
                                            className="text-xs rounded-md inline-block m-auto p-2"
                                            style={purchase.style}
                                        >
                                            {purchase.name}
                                        </p>
                                    </td>
                                    <td>{moment(row.createdAt).locale('id').format('DD MMM YYYY')}</td>
                                    <td>{row.code}</td>
                                    <td>{row.supplier ?? ''}</td>
                                    <td>{row.user.name}</td>
                                    <td>{JSON.parse(row.detail).length}</td>
                                    <td>
                                        <span
                                            className="text-xs rounded-md inline-block my-auto mr-2 p-2"
                                            style={methodStyle.style}
                                        >
                                            {methodStyle.name}
                                        </span>
                                        <span
                                            className="text-xs rounded-md inline-block m-auto p-2"
                                            style={statusStyle.style}
                                        >
                                            {statusStyle.name}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isRowOpen ? 'fit-content' : 0,
                                                margin: isRowOpen ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden"
                                        >
                                            <p>Jumlah Pembayaran</p>
                                        </motion.div>
                                    </td>
                                    <td colSpan={5} className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isRowOpen ? 'fit-content' : 0,
                                                margin: isRowOpen ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden"
                                        >
                                            <p>: {rupiah(row.tenor)}</p>
                                        </motion.div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isRowOpen ? 'fit-content' : 0,
                                                margin: isRowOpen ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden"
                                        >
                                            <p>Sisa Pembayaran</p>
                                        </motion.div>
                                    </td>
                                    <td colSpan={5} className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isRowOpen ? 'fit-content' : 0,
                                                margin: isRowOpen ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden"
                                        >
                                            <p>: {rupiah(row.total - row.tenor)}</p>
                                        </motion.div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isRowOpen ? 'fit-content' : 0,
                                                margin: isRowOpen ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden"
                                        >
                                            <p>Total Pembelian</p>
                                        </motion.div>
                                    </td>
                                    <td colSpan={5} className="p-0">
                                        <motion.div
                                            animate={{
                                                height: isRowOpen ? 'fit-content' : 0,
                                                margin: isRowOpen ? 12 : 0,
                                            }}
                                            className="flex overflow-hidden justify-between"
                                        >
                                            <p>: {rupiah(row.total)}</p>
                                            <p className="badge badge-success">Include PPN 11%</p>
                                        </motion.div>
                                    </td>
                                </tr>
                            </Fragment>
                        );
                    }) : (
                        <tr>
                            <td colSpan={8} className="text-center text-gray-500">
                                Belum ada data
                            </td>
                        </tr>
                    )}
                    <tr className="bg-gray-100">
                        <td colSpan={5} className="text-end font-bold">Total</td>
                        <td>
                            <p className="text-xs mb-3">Jumlah pembayaran</p>
                            <p>{rupiah(data.reduce((acc, item) => acc += item.tenor, 0))}</p>
                        </td>
                        <td className="bg-yellow-200">
                            <p className="text-xs mb-3">Sisa pembayaran</p>
                            <p>{rupiah(data.reduce((acc, item) => acc += (item.total - item.tenor), 0))}</p>
                        </td>
                        <td className="bg-green-200">
                            <p className="text-xs mb-3">Total pembelian</p>
                            <p>{rupiah(data.reduce((acc, item) => acc += item.total, 0))}</p>
                        </td>
                    </tr>
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