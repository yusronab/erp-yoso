"use client";

import DeleteModal from "@/components/DeleteModal";
import FilterSelect from "@/components/FilterBar";
import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import UpdateModal from "./modal";
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import ModalQrcode from "@/components/ModalQrcode";
import ModalExcel from "@/components/ModalExcel";
import { rupiah } from "@/utils/helper";

const Table = ({
    data, suplier, ukuran
}: {
    data: any[],
    suplier: any[],
    ukuran: any[],
}) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filtering, setFiltering] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };

    const handleFilter = (selected: { id: number; name: string } | null, table: string) => {
        const filtered = data.filter(item =>
            item[table].id === selected?.id
        );
        setFilteredData(filtered);

        if (!selected) setFiltering(false);
        if (selected) setFiltering(true);
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

    const handleCheckboxChange = (selectedRow: any) => {
        if (selectedItems.includes(selectedRow)) {
            setSelectedItems(selectedItems.filter((row) => row !== selectedRow));
        } else {
            setSelectedItems([...selectedItems, selectedRow]);
        }
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
    }, [data]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.setFont('arial', 'bold')
        doc.text('PT. YOSO MEKATAMA', 15, 20)

        doc.setFontSize(10);
        doc.setFont('arial', 'normal')
        doc.text('Jl. Villa Mutiara Cikarang R02, No.17, Ciantra', 15, 25)

        doc.setFontSize(10);
        doc.text('South Cikarang, Bekasi Regency, West Java 17530', 15, 30)

        const bodyTable = selectedItems.map((item, index) => (
            [index + 1, item.code ?? item.id, item.name, item.suplier.name, item.size,
            `${item.totalStock} pcs`, `Rp${item.price}`]
        ))

        autoTable(doc, {
            head: [['No', 'Kode', 'Nama Material', 'Suplier', 'Ukuran', 'Stok', 'Harga Beli']],
            body: bodyTable,
            margin: { top: 35 },
            theme: "grid"
        })

        doc.save('Data-Material.pdf')
    }

    return (
        <div className="py-5">
            <div className="flex justify-between items-center">
                <PerPageSelect
                    options={[10, 20, 30, 40]}
                    defaultValue={itemsPerPage}
                    onChange={handleItemPerPageChange}
                />
                <div className="flex flex-row gap-3">
                    <ModalExcel />
                    <button className="btn btn-secondary capitalize" onClick={downloadPDF}>to PDF</button>
                    <ModalQrcode listItem={selectedItems} />
                </div>
            </div>
            <div className="flex gap-3 items-center my-5">
                <FilterSelect
                    options={suplier}
                    onSelectFilter={handleFilter}
                    table="suplier"
                />
                <FilterSelect
                    options={ukuran}
                    onSelectFilter={handleFilter}
                    table="ukuran"
                />
                <SearchBar onSearch={handleSearch} />
            </div>
            <table className="table border">
                <thead className="bg-[#4e73df] text-white">
                    <tr>
                        <th>Pilih</th>
                        <th>Kode</th>
                        <th>Nama Material</th>
                        <th>Suplier</th>
                        <th>Harga Beli</th>
                        <th>Ukuran</th>
                        <th>Jumlah Minimun</th>
                        <th>Jumlah Keseluruhan</th>
                        <th>Status</th>
                        <th className="flex gap-3 justify-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.slice(startIndex, endIndex).map((row, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={selectedItems.includes(row)}
                                    onChange={() => handleCheckboxChange(row)}
                                />
                            </td>
                            <td>{row.code ?? 'Kosong'}</td>
                            <td>{row.name}</td>
                            <td className="capitalize">{row.suplier.name}</td>
                            <td>{rupiah(row.price)}</td>
                            <td>{row.size} {row.ukuran.name}</td>
                            <td>{row.minPurchase}</td>
                            <td>{row.totalStock}</td>
                            <td className={row.isStatus ? 'text-success' : 'text-error'}>
                                {row.isStatus ? 'Tersedia' : 'Tidak tersedia'}
                            </td>
                            <td className="flex gap-3 justify-center items-center">
                                <UpdateModal
                                    data={row}
                                />
                                <DeleteModal
                                    id={row.id}
                                    table="material"
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

export default Table