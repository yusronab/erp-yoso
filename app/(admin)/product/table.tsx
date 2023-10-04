"use client";

import DeleteModal from "@/components/DeleteModal";
import ExportToExcel from "@/components/ExcelExport";
import FilterSelect from "@/components/FilterBar";
import ModalExcel from "@/components/ModalExcel";
import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import { rupiah } from "@/utils/helper";
import { useEffect, useState } from "react";
import UpdateModal from "./modal";

const Table = ({ data }: { data: any[] }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filtering, setFiltering] = useState(false);
  const [excelData, setExcelData] = useState<any[]>([]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleFilter = (selected: { id: number; name: string } | null) => {
    const filtered = data.filter(item =>
      item.productType === selected?.id
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

  const startEntry = startIndex + 1;
  const endEntry = Math.min(endIndex, filteredData.length);
  const totalData = filtering ? data.length : filteredData.length;
  const showingText = filtering
    ? `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} 
        data (difilter berdasarkan ${data.length} total data)`
    : `Menampilkan ${startEntry} sampai ${endEntry} dari ${totalData} data`;

  useEffect(() => {
    setFilteredData(data);
    
    const customDataExcel = data.filter(item => item.deletedAt === null).map(item => ({
      "Id Produk": item.code,
      "Nama Produk": item.name,
      "Satuan": item.satuan.name,
      "Harga": rupiah(item.price),
      "Jenis Produk": item.productType === 1 ? 'Produk item' : 'Produk utama',
    }));

    setExcelData(customDataExcel);

  }, [data]);

  const productType = [
    {
      id: 1,
      name: 'Produk Item',
    },
    {
      id: 2,
      name: 'Produk Utama',
    },
  ]

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
          <ExportToExcel fileName="product-export" apiData={excelData} />
        </div>
      </div>
      <div className="flex gap-3 items-center justify-between my-5">
        <FilterSelect
          options={productType}
          onSelectFilter={handleFilter}
          table="jenis produk"
        />
        <SearchBar onSearch={handleSearch} />
      </div>

      <table className="table bordered">
        <thead className="bg-[#4e73df] text-white">
          <tr>
            <th>Nomor</th>
            <th>Kode</th>
            <th>Nama Produk</th>
            <th>Satuan</th>
            <th>Harga</th>
            <th>Jenis Produk</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(startIndex, endIndex).map((row, index) => (
            <tr key={index} className="hover">
              <td>{index + 1}</td>
              <td>{row.code}</td>
              <td>{row.name}</td>
              <td>{row.satuan.name}</td>
              <td>{rupiah(row.price)}</td>
              <td className={row.productType === 1 ? 'text-secondary' : 'text-success'}>
                {row.productType === 1 ? 'Produk item' : 'Produk utama'}
              </td>
              <td className="flex gap-3 justify-center items-center">
                <UpdateModal
                  data={row}
                />
                <DeleteModal
                  id={row.id}
                  table="product"
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