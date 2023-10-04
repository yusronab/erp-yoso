"use client";

import DeleteModal from "@/components/DeleteModal";
import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import UpdateModal from "./modal";

const Table = ({ data }: { data: any[] }) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filtering, setFiltering] = useState(false);

    const [roles, setRoles] = useState([]);

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
        axios.get('/api/user-roles')
            .then(res => setRoles(res.data))
            .catch(error => console.log('e:', error.message))
    }, [])

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
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Modified</th>
                        <th className="flex gap-3 justify-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(startIndex, endIndex).map((row, index) => (
                        <tr key={index} className="hover">
                            <td>{row.email}</td>
                            <td>{row.name}</td>
                            <td>{row.role.name}</td>
                            <td>{row.status.name}</td>
                            <td>{row.updatedAt.toLocaleString()}</td>
                            <td className="flex gap-3 justify-center items-center">
                                <UpdateModal
                                    data={row}
                                    listRole={roles}
                                />
                                <DeleteModal
                                    id={row.id}
                                    table="users"
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