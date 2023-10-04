"use client";

import ExportToExcel from "@/components/ExcelExport";
import { rupiah } from "@/utils/helper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import DetailComponent from "./detail";
import Table from "./table";

const Content = ({ data, style }: { data: any[], style: any[] }) => {
    const [pageDetail, setPageDetail] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<any>({});
    const [dataOrder, setDataOrder] = useState<any>({
        excel: [],
        update: [],
    });

    useEffect(() => {
        const excel = data.map(item => ({
            "STATUS": item.code,
            "NOMOR": item.code,
            "NAMA PELANGGAN": item.customer ? item.customer.name : '(kosong)',
            "NAMA SALES": item.user.name,
            "PEMBAYARAN": rupiah(item.total),
            "STATUS PEMBAYARAN": item.paymentStatus === 1 ? 'Lunas' : 'Belum lunas',
            "JENIS PEMBAYARAN": item.paymentMethod === 1 ? 'Cash' : item.paymentMethod === 2 ? 'Dp' : 'Piutang',
            "TANGGAL": item.updatedAt.toLocaleDateString(),
        }));

        setDataOrder({ ...dataOrder, excel: excel, update: data });

    }, [data]);

    const toPageDetail = () => setPageDetail(!pageDetail);

    const handleRowClick = (rowData: any) => {
        setPageDetail(true);
        setSelectedRowData(rowData);
    };

    return (
        <>
            <div className="flex justify-between items-center bg-gray-100 rounded-md p-3">
                <h3 className="font-bold capitalize">data penjualan</h3>
                {pageDetail ? (
                    <button className="btn capitalize" onClick={toPageDetail}>
                        kembali
                    </button>
                ) : (
                    <div className="flex flex-row gap-5 items-center">
                        <ExportToExcel fileName="order-export" apiData={dataOrder.excel} />
                        <Link
                            href="/order/create"
                            className="btn btn-success capitalize"
                        >
                            <FaPlus className="mr-2" />tambah data
                        </Link>
                    </div>
                )}
            </div>

            {pageDetail ? <DetailComponent data={selectedRowData} />
                : <Table
                    data={dataOrder.update}
                    onRowClick={handleRowClick}
                    style={style}
                />}
        </>
    );
};

export default Content;