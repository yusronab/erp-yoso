"use client";

import DeleteModal from "@/components/DeleteModal";
import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import { rupiah } from "@/utils/helper";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalSteps from "./steps";

const Table = ({ data, divisi }: { data: any[], divisi: any[] }) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filtering, setFiltering] = useState(false);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };

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

    const startEntry = startIndex + 1;
    const endEntry = Math.min(endIndex, filteredData.length);
    const totalData = filtering ? data.length : filteredData.length;
    const showingText = filtering
        ? `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} 
        data (difilter berdasarkan ${data.length} total data)`
        : `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} data`;

    useEffect(() => {
        setFilteredData(data);
    }, [data])

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
                        <th>Nomor</th>
                        <th>Nama Formula Item</th>
                        <th>Harga per Item</th>
                        <th className="flex gap-3 justify-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(startIndex, endIndex).map((row, index) => (
                        <tr key={index} className="hover">
                            <td>{index + 1}</td>
                            <td><Link href={`/formula-item/${row.id}`}>{row.name}</Link></td>
                            <td>{rupiah(row.price)}</td>
                            <td className="flex gap-3 justify-center items-center">
                                <ModalSteps data={divisi} formulaId={row.id} />
                                <DeleteModal
                                    id={row.id}
                                    table="formula-item"
                                />
                            </td>
                        </tr>
                    ))}
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