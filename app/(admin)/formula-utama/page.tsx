import HeadingDetail from "@/components/HeadingDetail";
import prisma from "../../lib/prisma";
import ModalCreate from "./create";
import Table from "./table";

const getFormulaMain = async () => {
    try {
        const res = await prisma.formulaUtama.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                deletedAt: true,
            },
            orderBy: { updatedAt: 'desc' },
        });

        return res;

    } catch (error) {
        console.log('error get formula')
    }
};

const getFormulaItem = async () => {
    try {
        const res = await prisma.formulaItem.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                subItem: true,
            },
            orderBy: { updatedAt: 'desc' },
        });

        return res;

    } catch (error) {
        console.log('error get formula')
    }
}

const MainPage = async () => {
    const [listData, formulaItem] = await Promise.all([getFormulaMain(), getFormulaItem()])

    const dataExist = listData ? listData.filter(item => item.deletedAt === null) : [];
    const dataDeleted = listData ? listData.filter(item => item.deletedAt !== null) : [];

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-10 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li className="text-[#4e73df]">Formula Item</li>
                </ul>
            </div>
            <div className="flex justify-between bg-gray-100 rounded-md p-3">
                <HeadingDetail
                    exist={dataExist.length}
                    deleted={dataDeleted.length}
                />
                <ModalCreate />
            </div>
            {formulaItem && <Table data={dataExist} formula={formulaItem} />}
        </div>
    );
}

export default MainPage