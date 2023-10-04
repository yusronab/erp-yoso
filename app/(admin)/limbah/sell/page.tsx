import prisma from "../../../lib/prisma";
import type { LimbahJual } from "@prisma/client";
import HeadingDetail from "@/components/HeadingDetail";
import TableInventory from "@/components/TableInventory";
import Link from "next/link";

const getDatas = async () => {
    try {
        const res = await prisma.limbahJual.findMany({
            select: {
                id: true,
                desc: true,
                price: true,
                amount: true,
                updatedAt: true,
                deletedAt: true,
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return res;

    } catch (error) {
        console.log('error get', error)
    }
}

const MainPage = async () => {
    const listData = await getDatas() as LimbahJual[];

    const dataExist = listData.filter(item => item.deletedAt === null);
    const dataDeleted = listData.filter(item => item.deletedAt !== null);

    const headingData = [
        {
            id: 'updatedAt',
            tag: 'Tanggal',
        },
        {
            id: 'amount',
            tag: 'Jual Limbah',
        },
        {
            id: 'price',
            tag: 'Harga Jual',
        },
        {
            id: 'desc',
            tag: 'Keterangan',
        },
    ];

    const inputList = [
        {
            'id': 'amount',
            'label': 'Limbah yang dijual',
            'type': 'number'
        },
        {
            'id': 'price',
            'label': 'Harga jual',
            'type': 'number'
        },
        {
            'id': 'desc',
            'label': 'keterangan',
            'type': 'text'
        },
    ];

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-10 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li><Link href="/limbah">Limbah</Link></li>
                    <li className="text-[#4e73df]">List Penjualan</li>
                </ul>
            </div>
            <div className="flex justify-between bg-gray-100 rounded-md p-3">
                <HeadingDetail
                    exist={listData.length}
                    deleted={dataDeleted.length}
                />
            </div>
            <TableInventory
                data={dataExist}
                heading={headingData}
                table="limbah-jual"
                inputList={inputList}
            />
        </div>
    )
}

export default MainPage;