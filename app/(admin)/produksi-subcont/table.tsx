"use client";

import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import 'moment/locale/id';
import { table } from "@/utils/table";
import ModalError from "../order/modalError";

const Table = ({
    data, styleStatus, onRowClick,
}: {
    data: any[]; styleStatus: any[]; onRowClick: (row: any) => void;
}) => {
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
            item.subcont.name?.toLowerCase().includes(keyword.toLowerCase())
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
                        <th>Kontraktor</th>
                        <th>User</th>
                        <th>Metode</th>
                        <th>Status Pembayaran</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(startIndex, endIndex).map((row, index) => {
                        const methodStyle = table.getStyle('jenis_pembayaran', row.paymentMethod, styleStatus);
                        const statusStyle = table.getStyle('status_pembayaran', row.paymentStatus, styleStatus);

                        return (
                            <tr className="hover" key={index}>
                                <td className="cursor-pointer text-center capitalize">
                                    {row.isStatus === 1 ? 'terima balik' : row.isStatus === 2 ? 'pending'
                                        : 'dibatalkan'}
                                </td>
                                <td>{row.code}</td>
                                <td>{row.subcont.name}</td>
                                <td>{row.user.name}</td>
                                <td>
                                    <p
                                        className="text-xs rounded-md inline-block m-auto p-2"
                                        style={methodStyle.style}
                                    >
                                        {methodStyle.name}
                                    </p>
                                </td>
                                <td>
                                    <p
                                        className="text-xs rounded-md inline-block m-auto p-2"
                                        style={statusStyle.style}
                                    >
                                        {statusStyle.name}
                                    </p>
                                </td>
                                <td>{moment(row.createdAt).locale('id').format('DD MMM YY, hh:mm a')}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            className="tooltip btn btn-outline btn-primary btn-sm capitalize
                                            font-light text-sm"
                                            data-tip="lihat detail"
                                            onClick={() => onRowClick(row)}
                                        >
                                            <MdInsertDriveFile />
                                        </button>
                                        {row.isStatus === 1 && <ModalError
                                            id={row.id}
                                            table="produksi-subcont"
                                            title="batalkan pembelian"
                                            tooltip="batalkan pembelian"
                                            message={`Apakah kamu yakin membatalkan order dengan id ${row.code}`}
                                        />}
                                    </div>
                                </td>
                            </tr>
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