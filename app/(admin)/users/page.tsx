import type { User } from "@prisma/client";
import Table from "./table";
import prisma from "../../lib/prisma";

const getDatas = async () => {
    try {
        const res = await prisma.user.findMany({
            orderBy: { updatedAt: 'desc' },
            include: {
                role: true,
                status: true,
            }
        });

        return res;

    } catch (error) {
        console.log('error get', error)
    }
}

const MainPage = async () => {
    const listData = await getDatas() as User[];

    const dataExist = listData.filter(item => item.deletedAt === null);
    const dataDeleted = listData.filter(item => item.deletedAt !== null);

    return (
        <div className="p-5 w-full">
            <div className="text-sm breadcrumbs bg-gray-100 w-fit p-3 mb-5 rounded-md">
                <ul>
                    <li><a>Dashboard</a></li>
                    <li className="text-[#4e73df]">User</li>
                </ul>
            </div>

            {listData.length === 0 ? (
                <div className="flex justify-center items-center py-5">
                    <span className="loading loading-spinner loading-lg text-[#3b57ab]"></span>
                </div>
            ) : (
                <div className="flex justify-between items-center bg-gray-100 rounded-md p-3">
                    <div>
                        <p className="text-lg font-bold">Data User</p>
                        <div className="flex divide-x-2">
                            <span className="pr-4 text-info">
                                Jumlah<div className="ms-2 badge badge-info text-white">{listData.length}</div>
                            </span>
                            <span className="pl-4 text-error">
                                Sampah<div className="ms-2 badge badge-error text-white">{dataDeleted.length}</div>
                            </span>
                        </div>
                    </div>
                </div>
            )}
            <Table data={dataExist} />
        </div>
    )
}

export default MainPage;