import prisma from "../../lib/prisma";
import Content from "./content";

const getDatas = async () => {
    const result = await prisma.purchaseTools.findMany({
        include: { user: true },
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
            <p className="text-lg font-bold mb-5">Laporan Pembelian Alat</p>
            <Content data={datas} style={statuses} />
        </div>
    );
};

export default MainPage;