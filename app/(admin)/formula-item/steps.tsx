"use client";

import PaginationBar from "@/components/PaginationBar";
import PerPageSelect from "@/components/PerPageSelect";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiOrganizationChart } from "react-icons/ri";

interface FormulaProduksiItem {
    formulaItemId: number;
}

const ModalSteps = ({ data, formulaId }: { data: any[], formulaId: number }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filtering, setFiltering] = useState(false);

    const router = useRouter();

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
        ? `${startEntry} sampai ${endEntry} dari ${totalData} 
        data (difilter berdasarkan ${data.length} total data)`
        : `${startEntry} sampai ${endEntry} dari ${totalData} data`;

    useEffect(() => {
        setFilteredData(data);
    }, [data])

    const handleModal = () => setShowModal(!showModal);

    const handleClickFormula = (divisiId: number) => {
        setLoading(true);

        axios.post('/api/formula-produksi', {
            formulaItemId: Number(formulaId),
            divisiId: Number(divisiId)
        })
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response.data.message ?? "Error saat proses berlangsung"))
            .finally(() => {
                setLoading(false);
                setShowModal(false);
                router.refresh();
            })
    };

    return (
        <div>
            <div className="tooltip" data-tip="Tahapan produksi">
                <button onClick={handleModal} className="text-primary">
                    <RiOrganizationChart />
                </button>

                <div className={showModal ? 'modal modal-open' : 'modal'}>
                    <div className="modal-box w-5/6 max-w-5xl">
                        <p className="font-bold mb-3">Tahapan Produksi</p>
                        <hr />
                        <div className="flex justify-between my-5">
                            <PerPageSelect
                                options={[10, 20, 30, 40]}
                                defaultValue={itemsPerPage}
                                onChange={handleItemPerPageChange}
                            />
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        <table className="table bordered">
                            <thead className="text-[#4e73df]">
                                <tr>
                                    <th>Nomor</th>
                                    <th>Nama Divisi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.slice(startIndex, endIndex).map((row, index) => {
                                    const checkData = row.formulaProduksi.some(
                                        (subItem: FormulaProduksiItem) => subItem.formulaItemId === formulaId
                                    );
                                    return (
                                        <tr key={index} className="hover">
                                            <td>{index}</td>
                                            <td>{row.name}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleClickFormula(row.id)}
                                                    className="btn btn-primary capitalize"
                                                    disabled={loading || checkData}
                                                >
                                                    {checkData ? 'dipilih' : 'pilih'}
                                                </button>
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

                        <div className="modal-action">
                            <div onClick={handleModal} className="btn capitalize">tutup</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ModalSteps;