"use client";

import DeleteModal from "@/components/DeleteModal";
import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import Modal from "./modal";

const Table = ({ data }: { data: any[] }) => {
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
                        <th>Name</th>
                        <th>Module</th>
                        <th>Background</th>
                        <th>Font Color</th>
                        <th className="flex gap-3 justify-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(startIndex, endIndex).map((row, index) => (
                        <tr key={index} className="hover">
                            <td>{row.name}</td>
                            <td>{row.module}</td>
                            <td>
                                <span
                                    className="w-4 h-4 border inline-block mr-2"
                                    style={{ backgroundColor: row.bgColor }}
                                ></span>
                                <span>{row.bgColor}</span>
                            </td>
                            <td>
                                <span
                                    className="w-4 h-4 border inline-block mr-2"
                                    style={{ backgroundColor: row.fontColor }}
                                ></span>
                                <span>{row.fontColor}</span>
                            </td>
                            <td className="flex gap-3 justify-center items-center">
                                <Modal data={row} />
                                <DeleteModal
                                    id={row.id}
                                    table="status"
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
    )
}

export default Table;