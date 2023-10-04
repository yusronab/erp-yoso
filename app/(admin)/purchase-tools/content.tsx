"use client";

import PrintBarangSubcont from "@/components/PrintBarangSubcont";
import PrintTools from "@/components/PrintTools";
import PrintView from "@/components/PrintView";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import DetailComponent from "./detail";
import Table from "./table";

const Content = ({ data, styleStatus }: { data: any[]; styleStatus: any[] }) => {
    const [pageDetail, setPageDetail] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<any>({});
    const [dataTable, setDataTable] = useState<any[]>([]);

    useEffect(() => setDataTable(data), [data]);

    const toPageDetail = () => setPageDetail(!pageDetail);

    const handleRowClick = (rowData: any) => {
        setPageDetail(true);
        setSelectedRowData(rowData);
    };

    return (
        <>
            <div className="flex justify-between items-center bg-gray-100 rounded-md p-3">
                <h3 className="font-bold capitalize">tabel purchase tools</h3>
                {pageDetail ? (
                    <div>
                        <button className="btn capitalize mr-3" onClick={toPageDetail}>
                            kembali
                        </button>
                        <PrintView
                            buttonText="cetak"
                            docTitle="print-purchase-tools"
                            contentComponent={<PrintTools data={selectedRowData} />}
                        />
                    </div>
                ) : (
                    <div className="flex flex-row gap-5 items-center">
                        <Link
                            href="/produksi-subcont/create"
                            className="btn btn-success capitalize"
                        >
                            <FaPlus className="mr-2" />tambah data
                        </Link>
                    </div>
                )}
            </div>

            {pageDetail ? <DetailComponent data={selectedRowData} />
                : <Table data={dataTable} styleStatus={styleStatus} onRowClick={handleRowClick} />}
        </>
    );
};

export default Content;