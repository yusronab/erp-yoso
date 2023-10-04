import prisma from "../../lib/prisma";
import Content from "./content";

const getDatas = async () => {
    const result = await prisma.barangSubcont.findMany({
        include: {
            user: true,
            detail: true,
            subcont: true,
        },
        orderBy: { updatedAt: 'desc' },
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
    const [datas, statuses] = await Promise.all([getDatas(), getStatus()]);
    
    return (
        <div className="p-5">
            <p className="text-lg font-bold mb-5">Laporan Pembelian Barang Subcont</p>
            <Content data={datas} style={statuses} />
        </div>
    );
};

export default MainPage;