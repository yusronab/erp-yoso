"use client";

import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import moment from "moment";
import { useEffect, useState } from "react";
import 'moment/locale/id';
import { table } from "@/utils/table";
import ModalUpdate from "./modal";
import { rupiah } from "@/utils/helper";

const Table = ({
    data, styleStatus
}: {
    data: any[]; styleStatus: any[];
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
            item.supplier?.toLowerCase().includes(keyword.toLowerCase())
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
                        <th>Metode</th>
                        <th>Status Pembayaran</th>
                        <th>Nomor</th>
                        <th>Nama Pemasok</th>
                        <th>Sisa Pembayaran</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(startIndex, endIndex).map((row, index) => {
                        const methodStyle = table.getStyle('jenis_pembayaran', row.paymentMethod, styleStatus);
                        const statusStyle = table.getStyle('status_pembayaran', row.paymentStatus, styleStatus);
                        const purchase = table.getStyle('purchase', row.isStatus, styleStatus);

                        return (
                            <tr className="hover" key={index}>
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
                                <td>{row.code}</td>
                                <td>{row.supplier}</td>
                                <td>{rupiah(row.total - row.tenor)}</td>
                                <td>{moment(row.createdAt).locale('id').format('DD MMM YYYY')}</td>
                                <td>
                                    {row.paymentMethod !== 1 && row.paymentStatus === 2 && <ModalUpdate
                                        data={row}
                                        showData={{
                                            code: 'Nomor PT',
                                            createdAt: 'Tanggal',
                                            supplier: 'Suplier',
                                            paymentMethod: 'Metode Bayar',
                                            total: 'Total pembayaran',
                                        }}
                                        table="purchase-tools"
                                    />}
                                </td>
                                <td>
                                    <p
                                        className="text-xs rounded-md inline-block m-auto p-2"
                                        style={purchase.style}
                                    >
                                        {purchase.name}
                                    </p>
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