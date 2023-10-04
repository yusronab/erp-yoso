"use client"

import CustomModal from "@/components/CustomModal"
import { ModalState } from "@/types"
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import PaginationBar from "./PaginationBar";
import PerPageSelect from "./PerPageSelect";
import SearchBar from "./SearchBar";

const CustomTable = ({
    data,
    heading,
    table,
    inputList,
}: {
    data: any[],
    heading: string[],
    table: string,
    inputList: (keyof ModalState)[],
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
                        <th>Number</th>
                        {heading.map(item => (
                            <th key={item} className="capitalize">{item}</th>
                        ))}
                        <th className="flex justify-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(startIndex, endIndex).map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            {heading.map((column, columnIndex) => (
                                <td key={columnIndex}>{item[column]?.toString()}</td>
                            ))}
                            <td className="flex gap-3 justify-center">
                                <CustomModal
                                    title="Update Data"
                                    editId={item.id}
                                    table={table}
                                    inputList={inputList}
                                    state={item}
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

export default CustomTable;