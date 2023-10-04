import prisma from "../../lib/prisma";
import Table from "./table";

const getItems = async () => {
    const result = await prisma.barangSubcont.findMany({
        orderBy: { updatedAt: 'desc' },
        include: {
            user: true,
            subcont: true,
            detail: true,
        },
    });

    return result;
};

const getStatus = async () => {
    const result = await prisma.status.findMany({
        select: {
            fkey: true,
            bgColor: true,
            fontColor: true,
            name: true,
            module: true,
        },
    });

    return result;
};

const MainPage = async () => {
    const [purchaseList, statuses] = await Promise.all([getItems(), getStatus()]);

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li className="text-[#4e73df]">Pelunasan Pembelian Subcont</li>
                </ul>
            </div>

            <p className="font-bold p-3 bg-gray-100 border rounded-t-md">Data Pembelian Subcont</p>

            <Table data={purchaseList} styleStatus={statuses} />
        </div>
    );
};

export default MainPage;