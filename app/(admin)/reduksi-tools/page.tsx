import prisma from "../../lib/prisma";
import HeadingDetail from "@/components/HeadingDetail";
import ModalInventory from "@/components/ModalInventory";
import Table from "./table";
import ModalCreate from "./modal";

const getDatas = async () => {
    try {
        const res = await prisma.toolsReduction.findMany({
            select: {
                id: true,
                name: true,
                desc: true,
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

const getTools = async () => {
    try {
        const res = await prisma.tools.findMany({
            select: {
                id: true,
                name: true,
                amount: true,
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return res;

    } catch (error) {
        console.log('error get', error)
    }
};

const MainPage = async () => {
    const [listData, dataTools] = await Promise.all([getDatas(), getTools()]);

    const dataExist = listData ? listData.filter(item => item.deletedAt === null) : [];
    const dataDeleted = listData ? listData.filter(item => item.deletedAt !== null) : [];

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-10 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li className="text-[#4e73df]">Peralatan</li>
                </ul>
            </div>
            <div className="flex justify-between bg-gray-100 rounded-md p-3">
                <HeadingDetail
                    exist={dataExist.length}
                    deleted={dataDeleted.length}
                />
                {dataTools && <ModalCreate tools={dataTools}/>}
            </div>
            <Table data={dataExist}/>
        </div>
    )
}

export default MainPage;