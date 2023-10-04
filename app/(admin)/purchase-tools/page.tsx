import prisma from "../../lib/prisma";
import Content from "./content";

const getItems = async () => {
    const result = await prisma.purchaseTools.findMany({
        orderBy: { updatedAt: 'desc' },
        include: { user: true },
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
                    <li className="text-[#4e73df]">Daftar Pembelian Peralatan</li>
                </ul>
            </div>

            <Content data={purchaseList} styleStatus={statuses} />
        </div>
    );
};

export default MainPage;