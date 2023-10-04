"use client"

import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import ModalInventory from "./ModalInventory";
import PaginationBar from "./PaginationBar";
import PerPageSelect from "./PerPageSelect";
import SearchBar from "./SearchBar";

const TableInventory = ({
    data,
    heading,
    table,
    inputList,
}: {
    data: any[],
    heading: any[],
    table: string,
    inputList: any[],
}) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filtering, setFiltering] = useState(false);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

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

    const totalPages = Math.ceil(data.length / itemsPerPage);

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
        <div>
            <div className="flex justify-between my-5">
                <PerPageSelect
                    options={[10, 20, 30, 40]}
                    defaultValue={itemsPerPage}
                    onChange={handleItemPerPageChange}
                />
                <SearchBar onSearch={handleSearch} />
            </div>
            <table className="table w-full border mb-5">
                <thead>
                    <tr className="bg-[#4e73df] text-white rounded-lg">
                        <th>Nomor</th>
                        {heading.map((item, index) => (
                            <th key={index} className="capitalize">{item.tag}</th>
                        ))}
                        <th className="flex justify-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(startIndex, endIndex).map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            {heading.map((head, idx) => (
                                <td key={idx}>
                                    {head.id === 'updatedAt' ? 
                                    item[head.id]?.toLocaleString() : item[head.id]?.toString()}
                                </td>
                            ))}
                            <td className="flex gap-3 justify-center">
                                <ModalInventory
                                    title="Update Data"
                                    editId={item.id}
                                    table={table}
                                    inputList={inputList}
                                    modalState={item}
                                />
                                <DeleteModal
                                    id={item.id}
                                    table={table}
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

export default TableInventory;